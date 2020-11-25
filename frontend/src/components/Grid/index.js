import React, {useState} from "react";
import {
    GridContainer,
    GridDiv,
    PageNavigation,
    Btn,
    GridField,
    Expand,
    Toggler,
    Tag,
    TagName,
    TagColor
} from "./GridStyle";
import {get} from "../../apis/fetch";

//toggle = true => expand
const Grid = ({data, switchPage, page, hasMore, difficulty, lastSearch}) =>{
    const [selected, setSelected] = useState(-1);
    const [toggle, setToggle] = useState(false);
    const [selectedProblemTags, setSelectedProblemTags] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const toggler = (id)=>{
        if(id==selected){
            if(toggle)setSelected(-1);
            setToggle(!toggle);
        }else{

            setLoading(true);
            get(`api/problems/tags/${id}`).
            then((res)=>{
                setLoading(false);
                res && res.length && setSelectedProblemTags(res);
            }).catch((e)=>{
                console.log(e);
            })

            setSelected(id);
            setToggle(true);
        }


    }

    const onClickExpand = (e)=>{
        toggler(e.currentTarget.id);
    }
    return (
        <GridContainer>
            <GridField>
                <GridDiv className = "heading">Problem Name</GridDiv>
                <GridDiv className = "heading">Problem Code</GridDiv>
                <GridDiv className = "heading">Submissions</GridDiv>
                <GridDiv className = "heading">Accuracy</GridDiv>

                {data.map((problem,index)=>{
                    if(problem.difficulty!==difficulty)return <></>;
                    return(
                        <>
                        <GridDiv>{problem.name}</GridDiv>
                        <GridDiv>{problem.code}</GridDiv>
                        <GridDiv>{problem.submissions}</GridDiv>
                        <GridDiv className = "toggle">
                            {problem.accuracy}
                            <Expand id = {problem.code} onClick = {(e)=>onClickExpand(e, problem)}/>
                        </GridDiv>
                        {problem.code===selected && toggle && 
                            <Toggler toggle>
                                {loading && 
                                    <Tag style = {{border:"none"}}>
                                        <TagName>
                                            Loading...
                                        </TagName>
                                    </Tag>
                                }
                                {!loading && !selectedProblemTags.length && "No Tags Found"}
                                {!loading && 
                                    selectedProblemTags.map((tag, index)=>{
                                        return (
                                            <Tag key={index} color={lastSearch && lastSearch.includes(tag.tag)?"yellow":"#E0E0E0"}>
                                                <TagName>
                                                    {tag.tag}
                                                </TagName>
                                                <TagColor>
                                                    x{tag.count}
                                                </TagColor>
                                            </Tag>
                                        );
                                    })
                                }                                
                            </Toggler>
                        }
                        </>
                    );
                })}
                    
            </GridField>
        
            <PageNavigation>
            <Btn onClick = {()=>switchPage(Math.max(1,page-1))}>Prev</Btn>
            <Btn selected>{page}</Btn>
            {/* <Btn>2</Btn>
            <Btn>3</Btn> */}
            <Btn onClick = {()=>hasMore && switchPage(page+1)}>Next</Btn>
            </PageNavigation>
        </GridContainer>
    )
}

export default Grid;