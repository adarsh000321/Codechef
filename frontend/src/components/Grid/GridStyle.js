import styled from "styled-components";
import {MdExpandMore} from "react-icons/md"


export const GridField = styled.div`
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;

    .heading {
        padding: 30px 15px;
        background: #696969;
        color: #fff;
        text-align: left;
        font-weight: bold;
    }

    .toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

`

export const GridDiv = styled.div`
    padding: 15px 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    &:nth-of-type(8n+5), 
    &:nth-of-type(8n+6), 
    &:nth-of-type(8n+7), 
    &:nth-of-type(8n+8){
        background: #f3f3f3;
    }
`

export const Btn = styled.button`
    padding: 16px 22px;
    outline: none;
    border:${({selected})=>selected ? "1px solid #000":"none"};
    white-space: nowrap;

    &:hover {
        transition: 0.3s ease-in-out;
        background: #A9A9A9;
    }
`

export const PageNavigation = styled.div`
    display: flex;
    margin: 20px 0;
    justify-content: center;
`

export const GridContainer = styled.div`
    border-collapse: collapse;
    font-size: 0.9rem;
    min-width: 620px;
    width: 100%;
    word-break: break-all;
`

export const Expand = styled(MdExpandMore)`
    cursor: pointer;
    /* padding: 3px 5px; */
    text-align: top;
    font-size: 20px;
`

export const Toggler = styled.p`
    grid-column: 1 / span 4;
    padding:0 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-wrap:wrap;
    overflow:auto;
    
`

export const Tag = styled.div`
    display: flex;
    margin: 5px 2px;
    border: 1px solid darkgray;
    background:${({color})=>color};
    /* border-radius: 10px; */
    color: gray;
    white-space: nowrap;
    cursor: pointer;
    &:hover{
        background: #D3D3D3;
        transition: 0.2s ease-in-out;
    }
`

export const TagName = styled.div`
    padding: 2px;
    padding-right: 3px;
`

export const TagColor = styled.div`
    padding:2px 2px;
    padding-left: 3px;
    border-left: 1px solid darkgray;
`
