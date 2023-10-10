import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import Loader from "./component/Loader";
import UpdateAccount from "./component/Account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/Account/updatePassword";

import CreateSong from "./component/song/createSong/createSong";
import RegisterComponent from "./component/RegisterComponent";
import NavbarComponent from "./component/navbarComponent";
import LoginComponent from "./component/LoginComponent";
import 'react-toastify/dist/ReactToastify.css';
import Page from "./component/page";
import Component404 from "./component/Component404";
import SearchComponent from "./component/SearchComponent";


function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
            {showNavbar && <NavbarComponent/>}
            <Loader/>
            <SearchComponent/>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route path={"/"} element={<HomeComponent/>}/>
                    <Route path={"/updateProfile/:id"} element={<UpdateAccount/>}/>
                    <Route path={"/updatePassword/:id"} element={<UpdatePassword/>}/>
                    <Route path="/song/create" element={<CreateSong/>}/>
                </Route>
                <Route path="/register" element={<RegisterComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/login" element={<LoginComponent setShowNavbar={setShowNavbar}/>}/>

            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;