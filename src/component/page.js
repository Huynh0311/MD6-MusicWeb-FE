import React from 'react';
import {Outlet} from "react-router-dom";
import MusicPlayer from "./player/MusicPlayer";
import NavbarComponent from "./navbarComponent";
import Loader from "./Loader";
import SearchComponent from "./SearchComponent";

const Page = () => {
    return (
        <div>
            <NavbarComponent/>
            <Loader/>
            <SearchComponent/>
            <MusicPlayer/>
            <Outlet></Outlet>
        </div>
    );
};

export default Page;
