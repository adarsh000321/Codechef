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
    Match
} from "./HeaderStyle";
import logoIcon from "../../images/logo.svg";
import {post} from "../../apis/fetch";
import axios from "axios";
import config from "../../config";

const Header = ({ switchSearch, search, switchData, switchPage, switchLastSearch}) => {

    const [logo, setLogo] = useState(true);
    const [match, setMatch] = useState([]);
    const [open, setOpen] = useState(false);


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
        let res = await post(`/api/tags`,undefined, {tags});
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
                <Button>
                    ABOUT
                </Button>
                <Button>
                    SIGN IN
                </Button>
            </HeaderBtn>
        </HeaderContainer>


    )

}

export default Header;