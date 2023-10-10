import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import Loader from "./component/Loader";
import UpdateAccount from "./component/Account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/Account/updatePassword";

import CreateSong from "./component/Song/createSong/createSong";
import DetailSong from "./component/Song/DetailSong/DetailSong";
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
                <Route path="/home" element={<BodyComponent/>}/>
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
