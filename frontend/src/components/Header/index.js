import React, { useState, useEffect } from "react";
import {
    HeaderContainer,
    HeaderBar,
    HeaderBtn,
    HeaderLogo,
    Input,
    Button,
    Image,
    Icon,
    IconWrap,
    PopUp,
    HeaderSearch,
    Match,
    Logout,
    Href
} from "./HeaderStyle";
import logoIcon from "../../images/logo.svg";
import {get} from "../../apis/fetch";
import axios from "axios";
import config from "../../config";
import {signIn, isSignedIn, signOut} from "./login";

const pptUrl = 'https://docs.google.com/presentation/d/1sUvQ2HfjWzGMl69UYyem9L27HlpvLl9-UYlLxOIctCU/edit?usp=sharing';


const Header = ({ switchSearch, search, switchData, switchPage, switchLastSearch}) => {


    const [logo, setLogo] = useState(true);
    const [match, setMatch] = useState([]);
    const [open, setOpen] = useState(false);
    const [signedIn, setSignedIn] = useState(isSignedIn());


    const logoState = (size) => {
        if (size <= 720) setLogo(false);
        else setLogo(true);
    }
    window.addEventListener("resize", () => logoState(window.innerWidth));
    const matchOnClick = (e)=>{
        let new_search = search.split(",");
        new_search.pop();
        new_search.push(e.currentTarget.textContent);
        new_search = new_search.join();
        switchSearch(`${new_search},`);
    }

    const switchSignedIn = ()=>{
        setSignedIn(isSignedIn());
    }

    const signInOnClick = async ()=>{
        if(signedIn){
            setSignedIn(false);
            signOut();
        }else{
            await signIn(switchSignedIn, true);
            setSignedIn(isSignedIn());
        }
    }

    useEffect(()=>signIn(switchSignedIn, false),[]);


    useEffect(() => {
        logoState(window.innerWidth);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        let tags = new Set();
        search.split(",").forEach((tag)=>{
            if(tag && tag.trim().length){
                tags.add(tag);
            }
        })
        tags = Array.from(tags);
        switchLastSearch(search);
        let res = await get(`/api/tagsearch/${tags.join()}`);
        switchPage(1);
        setMatch([]);
        res && res.length>=0 && switchData(res);
    }

    useEffect(()=>{
        const tagsArray = search.split(",");
        if(!tagsArray[tagsArray.length-1] || !tagsArray[tagsArray.length-1].trim().length){
            setMatch([]);
            return;
        }
        let lastSearch = tagsArray[tagsArray.length-1].trim();

        let cancel;
        axios({
            method:'GET',
            baseURL:config.API_URL,
            url:`/api/match-tags/all/${lastSearch}`,
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then((res)=>{
            if(res.data && res.data.length){
                setMatch(res.data);
            } else setMatch([]);
        }).catch(e=>!axios.isCancel(e) && console.log(e));

        return ()=>cancel();
        
    }, [search]);
    

    return (
        <HeaderContainer>
            {logo &&
                <HeaderLogo>
                    <Image src={logoIcon} alt="logo" />
                </HeaderLogo>
            }

            <HeaderBar onSubmit={(e) => onSubmit(e)}>
                <HeaderSearch>
                    <Input
                        placeholder="Enter comma separated tags/authors"
                        required
                        value={search}
                        onChange={(e) => switchSearch(e.target.value)} 
                        onBlur = {e=>setOpen(false)}
                        onFocus = {e=>setOpen(true)}
                        />

                    
                    {match.length!==0 && open &&
                        <PopUp>
                            {match.map((tag, ind)=>{
                                return (
                                    <Match 
                                        key = {ind}
                                        onMouseDown = {matchOnClick}>
                                            {tag.tag}
                                    </Match>
                                )
                            })}
                        </PopUp>
                    }
                    
                </HeaderSearch>
                <IconWrap>
                    <Icon />
                </IconWrap>
            </HeaderBar>

            <HeaderBtn>
                <Href href={pptUrl} target={'_blank'}>
                    ABOUT
                </Href>
                <Button onClick={()=>signInOnClick()}>
                    {signedIn?`Hi, ${signedIn}`:"CODECHEF SIGN IN"}
                    {signedIn && <Logout />}
                </Button>
            </HeaderBtn>
        </HeaderContainer>


    )

}

export default Header;