import React, {useState, useEffect} from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import {HeroContainer, HeroPage} from "./HeroStyle";
import Grid from "../Grid";
import {get, post} from "../../apis/fetch";

const LIMIT = 100;

const Hero = ()=>{

    const [difficulty, setDifficulty] = useState("easy");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState('');
    const [lastSearch, setLastSearch] = useState('');

    const switchSearch = (s)=>{
        setSearch(s);
    }
    const switchLastSearch=(s)=>{
        setLastSearch(s);
    }
    const switchDifficulty = (newDifficulty)=>setDifficulty(newDifficulty);
    const switchData = (data)=>{
        setData(data);
    }
    const switchPage = (page)=>{
        setPage(page);
        setHasMore(false);
    }


    // useEffect(()=>{
    //     post(`api/tags`,undefined,Array.from(new Set(search.split(",")))).
    //     then((res)=>{
    //         if(res && res.length){
    //             switchData(res);
    //         }
    //     }).catch((e)=>console.log(e));
    //     setPage(1);
    // }, [search]);

    useEffect(()=>{

        if(search && search.trim().length) return;

        // always less than 100
        if(search && search.trim().length)return;
        get(`/api/problems/${difficulty}`, {limit:LIMIT+1, offset:(page-1)*LIMIT})
        .then((res)=>{

            if(res && res.length>100) {
                setHasMore(true);
            }else setHasMore(false);
            res.pop();
            setData(res);

        }).catch((e)=>{
            console.log(e.message);
        })
    },[difficulty, page, search]);

    useEffect(()=>setPage(1),[difficulty]);
    

    return (
        
        <>
        <HeroContainer>
            <Header 
                switchSearch = {switchSearch}
                search = {search}
                switchData = {switchData}
                difficulty = {difficulty}
                switchPage = {switchPage}
                switchLastSearch = {switchLastSearch}
            />
            <HeroPage>
                {/* <Table /> */}
                <Grid 
                    data = {data} 
                    switchPage = {switchPage} 
                    page = {page} 
                    hasMore={hasMore}
                    difficulty={difficulty}
                    lastSearch = {lastSearch}
                />
                <Sidebar 
                    switchDifficulty = {switchDifficulty}
                    switchSearch = {switchSearch}
                    search = {search}
                    found = {data.length}

                />
            </HeroPage>
        </HeroContainer>
        </>
    )
}

export default Hero;