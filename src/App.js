import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import Loader from "./component/Loader";
import UpdateAccount from "./component/account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/account/updatePassword";

import CreateSong from "./component/song/createSong/createSong";
import DetailSong from "./component/song/detailSong/DetailSong";
import RegisterComponent from "./component/RegisterComponent";
import NavbarComponent from "./component/navbarComponent";
import LoginComponent from "./component/LoginComponent";
import ListSong from "./component/song/listSong/ListSong";

import 'react-toastify/dist/ReactToastify.css';
import Page from "./component/page";
import Component404 from "./component/Component404";
import SearchComponent from "./component/SearchComponent";
import DetailPlaylist from "./component/playlist/DetailPlaylist";


function App() {

    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <SearchComponent/>
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route path={"/"} element={<HomeComponent/>}/>
                    <Route path={"/updateProfile"} element={<UpdateAccount/>}/>
                    <Route path={"/updatePassword"} element={<UpdatePassword/>}/>
                    <Route path="/song/create" element={<CreateSong/>}/>
                    <Route path={"/song/detailSong/:id"} element={<DetailSong/>}/>
                    <Route path={"/detailPlaylist/:id"} element={<DetailPlaylist/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path='/song/all' element={<ListSong/>}></Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
