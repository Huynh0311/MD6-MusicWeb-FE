import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import Loader from "./component/Loader";

import CreateSong from "./component/song/createSong/createSong";
import DetailSong from "./component/song/DetailSong/DetailSong";
import RegisterComponent from "./component/RegisterComponent";
import NavbarComponent from "./component/navbarComponent";
import LoginComponent from "./component/LoginComponent";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

import ListSong from "./component/song/listSong/ListSong";
import EditSong from "./component/song/editSong/EditSong";

function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>


                <Route path="/song/create" element={<CreateSong/>}/>

                <Route path="/home" element={<BodyComponent/>}/>
                <Route path="/register" element={<RegisterComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/login" element={<LoginComponent setShowNavbar={setShowNavbar}/>}/>

                <Route path='/song/all' element={<ListSong />}></Route>
                <Route path='/song/edit' element={<EditSong />}></Route>
            </Routes>
        </div>
    );
}

export default App;
