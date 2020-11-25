import React, {useState} from "react";
import {
    TableContainer, 
    Table, 
    Row, 
    Heading,
    Data,
    Head,
    Body,
    PageNavigation,
    Btn,
    Expand
} from "./TableStyle";

const TableComponent = ()=>{
    const [selectedId, setSelectedId] = useState(-1);

    return (
        <TableContainer>
            <Table>
                <Head>
                    <Row className="headings">
                        <Heading>S. No.</Heading>
                        <Heading>Problem Name</Heading>
                        <Heading>Problem Code</Heading>
                        <Heading>Submissions</Heading>
                        <Heading>Accuracy</Heading>
                    </Row>
                </Head>
                <Body>
                    <Row className="data">
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data style = {{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            Data
                            <Expand id = "1" onClick = {(e)=>e.target.id==selectedId?setSelectedId(-1):setSelectedId(e.target.id)} />
                        </Data>
                    </Row>
                    {selectedId == "1" && <Data style = {{width:"100%", transition:"0.3s ease-in"}} colSpan = "5">
                        Tags: fsdf, dfs, dfsd
                    </Data>}
                    <Row className = "data">
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data>Data</Data>
                        <Data style = {{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            Data
                            <Expand id = "2" onClick = {(e)=>e.target.id==selectedId?setSelectedId(-1):setSelectedId(e.target.id)} />
                        </Data>
                    </Row>
                    {<Data style = {{width:"100%", display:selectedId == "2"?"table-cell":"none"}} colSpan = "5">
                        Tags: fsdf, dfs, dfsd
                    </Data>}
                </Body>
            </Table>
            <PageNavigation>
                <Btn>Prev</Btn>
                <Btn selected>1</Btn>
                <Btn>2</Btn>
                <Btn>3</Btn>
                <Btn>Next</Btn>
            </PageNavigation>
        </TableContainer>
    )
}

export default TableComponent;