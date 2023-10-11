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
import ListSong from "./component/song/listSong/ListSong";



function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
           <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path="/" element={<BodyComponent/>}/>
                <Route path={"/updateProfile/:id"} element={<UpdateAccount/>}/>
                <Route path={"/updatePassword/:id"} element={<UpdatePassword/>}/>
                <Route path="/song/create" element={<CreateSong/>}/>
                <Route path={"/song/detailSong/:id"} element={<DetailSong/>}/>
                <Route path="/register" element={<RegisterComponent/>}/>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path='/song/all' element={<ListSong />}></Route>
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
