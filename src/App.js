import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
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




function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
            {showNavbar && <NavbarComponent/>}
            <Loader/>
            <Routes>
                <Route path="/" element={<BodyComponent/>}/>
                <Route path={"/updateProfile/:id"} element={<UpdateAccount/>}/>
                <Route path={"/updatePassword/:id"} element={<UpdatePassword/>}/>
                <Route path="/song/create" element={<CreateSong/>}/>
                <Route path={"/song/detailSong/:id"} element={<DetailSong/>}/>
                <Route path="/register" element={<RegisterComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/login" element={<LoginComponent setShowNavbar={setShowNavbar}/>}/>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
