import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import UpdateAccount from "./component/account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/account/updatePassword";

import CreateSong from "./component/song/createSong/createSong";
import DetailSong from "./component/song/detailSong/DetailSong";
import RegisterComponent from "./component/RegisterComponent";
import LoginComponent from "./component/LoginComponent";
import ListSong from "./component/song/listSong/ListSong";
import EditSong from "./component/song/editSong/EditSong";

import 'react-toastify/dist/ReactToastify.css';
import Page from "./component/page";
import Component404 from "./component/Component404";
import BodySearch from "./component/song/seach/BodySearch";
import ListSongFavorite from "./component/song/listSong/ListSongFavorite";
import {useSelector} from "react-redux";


function App() {
    const listSong = useSelector(state => state.songs);
    useEffect(() => {
        localStorage.setItem("songs", JSON.stringify(listSong))
    }, [listSong]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Page/>}>
                    <Route path={"/"} element={<HomeComponent/>}/>
                    <Route path={"/updateProfile"} element={<UpdateAccount/>}/>
                    <Route path={"/updatePassword"} element={<UpdatePassword/>}/>
                    <Route path="/song/create" element={<CreateSong/>}/>
                    <Route path={"/song/detailSong/:id"} element={<DetailSong/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path="/login" element={<LoginComponent/>}/>
                    <Route path={'/favorite'} element={<ListSongFavorite/>}></Route>
                    <Route path='/song' element={<ListSong/>}></Route>
                    <Route path={"/song/edit/:songid"} element={<EditSong />}></Route>
                    <Route path='/song/search' element={<BodySearch/>}></Route>
                </Route>
                <Route path={'*'} element={<Component404/>}></Route>
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
