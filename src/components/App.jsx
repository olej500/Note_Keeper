import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){

    return(
    <Fragment>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home/>}
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    </Fragment>
    );
}

export default App;