import React from 'react';
import {Outlet} from "react-router-dom";
import MusicPlayer from "./player/MusicPlayer";
import NavbarComponent from "./navbarComponent";
import Loader from "./Loader";
import SearchComponent from "./song/seach/SearchComponent";

const Page = () => {
    return (
        <div>
            <NavbarComponent/>
            <Loader/>
            <SearchComponent/>
            <Outlet></Outlet>
            <MusicPlayer/>
        </div>
    );
};

export default Page;