import axios from "axios";
import config from "../config";
export const get = async (url, params)=>{
    try{
        const fetch = axios.default.create({
            baseURL:config.API_URL,
        })

        const res = await fetch({
            url:url,
            params
        });
        return res.data;
    }catch(e){
        console.log(e);
    }
}

export const post = async (url, params,data)=>{
    try{
        const fetch = axios.default.create({
            baseURL:config.API_URL,
        })

        const res = await fetch({
            method:"post",
            url:url,
            params,
            data
        });
        return res.data;
    }catch(e){
        console.log(e);
    }
}
// baseURL:config.API_URL,
//         method:"get",
//         params:params,
//         url:url