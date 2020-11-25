import styled from "styled-components";
import {MdExpandMore} from "react-icons/md"

export const TableContainer = styled.div`
    
`

export const Table = styled.table`
    border-collapse: collapse;
    font-size: 0.9rem;
    min-width: 400px;
    width: 100%;
`

export const Row = styled.tr`
    &:nth-of-type(even) {
        background: #f3f3f3;
    }
`

export const Heading = styled.th`
    padding: 30px 15px;
`

export const Data = styled.td`
    padding: 12px 15px;
`

export const Head = styled.thead`
    background: #696969;
    color: #fff;
    text-align: left;
    font-weight: bold;
`
export const Body = styled.tbody`
    .data {
        border-bottom: 1px solid #ddd;
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

export const Expand = styled(MdExpandMore)`
    cursor: pointer;
    /* padding: 5px 5px; */
    text-align: center;
    font-size: 30px;
`

