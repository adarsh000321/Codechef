import styled from "styled-components";

export const SidebarContainer = styled.div`
    background: #f3f3f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #000;
    border: 1px solid silver;
    min-width: 250px;
    /* margin-right: 50px; */
`

export const Heading = styled.div`
    margin: 25px 12px 10px 12px;
    font-size: 20px;
    /* color: #fff; */
`

export const Hr = styled.hr`
    width: 80%;
    background: #282828;
    margin-bottom: 15px;
`

export const Difficulty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    margin-bottom: 15px;
`

export const Select = styled.select`
    margin: 10px;
`

export const Textarea = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap:wrap;
    overflow:auto;
    align-content:flex-start;
    resize: none;
    width: 80%;
    height: 200px;
    background: #fff;
    border: 1px solid silver;
    margin: 0px 10px;

`

export const Input = styled.input`
    height: 40px;
    border-radius: 50px;
    width: 100%;
    border: 1px solid #DCDCDC;
    padding: 0 20px;
    margin: 0 10px;
    ::placeholder{
        /* padding-left: 10px; */
        color: gray;
    }
    outline: none;

    :focus {
        box-shadow: 0px 0px 5px 1px lightblue;
        
    }

    white-space: nowrap;
    
`

export const SearchBar = styled.form`
    white-space: nowrap;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    align-items: center;
`
export const P = styled.div`
    margin-top: 15px;
    white-space: nowrap;
    font-size: 10px;
    display: flex;
    align-items: center;
`  

export const ColorDiv = styled.div`
    background: ${({color})=>color};
    width: 20px;
    height: 15px;
    margin: 3px;
`

export const Notations = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 20px;
`

export const Tag = styled.div`
    display: flex;
    margin: 2px;
    border: 1px solid darkgray;
    background:#E0E0E0;
    /* border-radius: 10px; */
    color: gray;
    white-space: nowrap;
    cursor: pointer;
    &:hover{
        background: #D3D3D3;
        transition: 0.2s ease-in-out;
    }
`

export const TagCount = styled.div`
    padding:2px 2px;
    padding-left: 3px;
    border-left: 1px solid darkgray;
`

export const TagName = styled.div`
    padding: 2px;
    padding-right: 3px;
`