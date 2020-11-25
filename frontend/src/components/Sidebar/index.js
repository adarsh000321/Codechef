import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    SidebarContainer,
    Heading,
    Hr,
    Difficulty,
    Select,
    Textarea,
    Input,
    SearchBar,
    P,
    ColorDiv,
    Notations,
    Tag,
    TagCount,
    TagName
} from "./SidebarStyle";
import { get } from "../../apis/fetch";
import axios from "axios";
import config from "../../config";

const LIMIT = 50;
const LIMIT_MATCH = 10; 

const Sidebar = ({ switchDifficulty, found, switchSearch, search }) => {

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tagType, setTagType] = useState("tag");
    const [hasMore, setHasMore] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagSearch, setTagSearch]=useState('');

    const tagOnClick = (e) => {
        if(search.includes(e.currentTarget.textContent))return;
        switchSearch(`${search}${e.currentTarget.textContent},`)
    }

    const tagTypeOnChange = (e) => {
        setTagType(e.currentTarget.value);  
        setTags([]);
    }

    useEffect(()=>{

        if(!tagSearch || !tagSearch.trim().length)return
        let cancel;
        axios({
            method:'GET',
            baseURL:config.API_URL,
            url:`/api/match-tags/${tagType}/${tagSearch}`,
            params:{
                limit: LIMIT_MATCH
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then((res)=>{
            if(res.data && res.data.length){
                setTags(res.data);
            } else setTags([]);
        }).catch(e=>!axios.isCancel(e) && console.log(e));

        return ()=>cancel();
        
    }, [tagSearch]);


    // Fetch Tags
    useEffect(() => {
        if(tagSearch && tagSearch.trim().length)return
        setLoading(true);
        get(`api/tags/${tagType}`, { limit: LIMIT + 1, offset: offset * (LIMIT) }
        ).then((res) => {

            setHasMore(res && res.length > LIMIT);
            if (res && res.length > LIMIT) res.pop();
            res && res.length && setTags([...tags, ...res])
            setLoading(false);
        })
    }, [offset, tagType, tagSearch])

    const observer = useRef();
    const lastTagRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prevOffset => prevOffset + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <SidebarContainer>
            <Heading>
                Filter Problems
            </Heading>
            <Hr />
            <Difficulty>
                Choose Difficulty:
                <Select onChange={(e) => switchDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Select>
            </Difficulty>


            <SearchBar onSubmit={() => { }}>
                <Input 
                    placeholder="Type and Enter" 
                    required
                    onChange = {e=>setTagSearch(e.currentTarget.value)}
                    value = {tagSearch} />
                <Select onChange={tagTypeOnChange}>
                    <option value="tag">Tags</option>
                    <option value="author">Authors</option>
                    {/* <option value="mytags">My Tags</option> */}
                </Select>
            </SearchBar>
            <Textarea>

                {tags.map((tag, index) => {

                    if (index + 1 === tags.length && (!tagSearch || !tagSearch.trim().length)){
                        return (
                            <Tag
                                key={tag.id}
                                ref={lastTagRef}>
                                <TagName onClick={tagOnClick}>
                                    {tag.tag}
                                </TagName>
                                <TagCount>
                                    x{tag.count}
                                </TagCount>
                            </Tag>
                        )
                    } else {
                        return (
                            <Tag
                                key={tag.id}>
                                <TagName onClick={tagOnClick}>
                                    {tag.tag}
                                </TagName>
                                <TagCount>
                                    x{tag.count}
                                </TagCount>
                            </Tag>
                        )
                    }

                })}

            </Textarea>
            <Heading>Selected Tags/Authors</Heading>
            <Textarea>
                {Array.from(new Set(search.split(","))).map((tag,index) => {
                    if (!tag.trim() || !tag.trim().length) return;
                    return (
                        <Tag key={index}>
                            <TagName>
                                {tag}
                            </TagName>
                        </Tag>
                    );
                })}
            </Textarea>
            <P>
                {`"${found >= 100 ? "100 >" : found} problems found"`}
            </P>
            <Notations>
                <P>
                    <ColorDiv color="green" />
                    User Defined Matched Tags
                </P>
                <P>
                    <ColorDiv color="Yellow" />
                    CodeChef Matched Tags
                </P>
                <P>
                    <ColorDiv color="gray" />
                    Other Related Tags
                </P>
            </Notations>

        </SidebarContainer>
    )
}

export default Sidebar;