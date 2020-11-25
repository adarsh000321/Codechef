import React from "react";
import {GlobalStyle} from "./globalStyles";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const App = ()=>{
    return (
        <>
            <GlobalStyle />
            <Hero />
            <Footer />
        </>
    )
}

export default App;