import qs from "qs";
import axios from 'axios';
import CryptoJS from "crypto-js";


//Before redirect
const responseType = 'code';
const clientId=process.env.REACT_APP_CLIENT_ID;
const redirectTo=`${window.location.protocol}//${window.location.host}`;
const state='xyz';
const authEndpoint=process.env.REACT_APP_AUTHORIZATION_CODE_ENDPOINT;

//After redirect
const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
const grantType='authorization_code';
const tokenEndpoint = process.env.REACT_APP_ACCESS_TOKEN_ENDPOINT;
const codechefAPI = process.env.REACT_APP_CODECHEF_ENDPOINT;
const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;


const getAuthCookie = ()=>{
    let auth;
    document.cookie.split(";").forEach(pair=>{
        pair = pair.split("=");
        if(pair[0].trim()==="auth")auth=pair[1];
    })
    return auth;
}

//returns username
export const isSignedIn = ()=>{
    try{
        const bytes  = CryptoJS.AES.decrypt(getAuthCookie(), cryptoKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }catch(e){
        return false;
    }
}

export const signOut = ()=>{
    document.cookie="auth=";
}



export const signIn = async (switchSignedIn, refresh)=>{
    try{
        const code = qs.parse(window.location.search, { ignoreQueryPrefix: true }).code;
        if(code){
            const data = {
                grant_type:grantType,
                code:code,
                client_id: clientId,
                client_secret:clientSecret,
                redirect_uri:redirectTo
            }

            let res = await axios({
                method:'post',
                url:tokenEndpoint,
                data
            })

            const accessToken = res.data.result.data.access_token;

            res = await axios({
                url: `https://cors-anywhere.herokuapp.com/${codechefAPI}/users/me`,
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${accessToken}`,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })

            const username = res.data.result.data.content.username;

            console.log(username);

            //encrypt
            const  ciphertext = CryptoJS.AES.encrypt(username, cryptoKey ).toString();
            document.cookie = `auth=${ciphertext}`;
            window.history.replaceState({}, document.title, "/?");
            switchSignedIn();
            
        }else if(refresh){
            const url=`${authEndpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectTo}&state=${state}`;
            window.location = url;
           
        }
    }catch(e){
        console.log(e)
        console.log("Please try again");
    }

}

