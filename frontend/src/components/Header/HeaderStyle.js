import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {AiOutlineLogout} from "react-icons/ai";


export const HeaderContainer = styled.nav`
    display: flex;
    height: 100px;
    justify-content: center;
    min-width: 925px;
    /* background: linear-gradient(to right, #1E50F5 0%, #1E50F5 100%); */
`

export const HeaderLogo = styled.div`
    flex: 1;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items:center;
    /* border: 1px solid red; */
`

export const HeaderBar = styled.form`
    flex: 2;
    /* border: 1px solid red; */
    align-items: center;
    display: flex;
    justify-content: center;
`

export const HeaderBtn = styled.div`
    flex: 1;
    /* border: 1px solid red; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &:hover{
        cursor: pointer;
    }
`

export const Button = styled.button`
    padding: 16px 22px;
    margin-right: 10px;
    border-radius: 30px;
    outline: none;
    border:none;
    white-space: nowrap;
    display: flex;
    align-items: center;

    &:hover {
        transition: 0.3s ease-in-out;
        background: #A9A9A9;
        cursor: pointer;
    }
`

export const Input = styled.input`
    height: 40px;
    border-radius: 50px;
    width: 90%;
    border: 1px solid #DCDCDC;
    padding: 0px 20px;
    ::placeholder{
        color: gray;
    }
    outline: none;

    :focus {
        box-shadow: 0px 0px 5px 1px lightblue;
        
    }
    
`

export const Image = styled.img`
    height: 100%;
`

export const Icon = styled(FaSearch)`
    font-size: 20px;
    color: #606060;
`

export const IconWrap = styled.button`
    border: none;
    outline: none;    
    cursor: pointer;
    background: #FFF;
    padding: 8px;

`
export const HeaderSearch = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
`

export const PopUp = styled.ul`
    position: absolute;
    width: 90%;
    top: 43px;
    font-size: 1.2rem;
    padding: 10px 0;
    border-radius: 20px;
    border:1px solid #DCDCDC; 
    border-top: none;
    background: white;
    list-style: none;

`

export const Match = styled.li`
    border-bottom:1px solid #DCDCDC;
    padding: 10px 15px;
    margin:0 5px;
    overflow: hidden;
    color: gray;
    &:hover{
        background: #E8E8E8;
        transition: 0.3s ease-in-out;
        cursor: pointer;
    } 
     
`

export const Logout = styled(AiOutlineLogout)`
    margin-left: 3px;
`

export const Href = styled.a`
    padding: 16px 22px;
    margin-right: 10px;
    border-radius: 30px;
    outline: none;
    border:none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    background: #F0F0F0;
    text-decoration: none;
    color: black;
    font-size: 13.3333px;
    &:hover {
        transition: 0.3s ease-in-out;
        background: #A9A9A9;
        cursor: pointer;
    }
`


