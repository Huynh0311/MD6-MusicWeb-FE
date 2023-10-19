import React from 'react';
import {Outlet} from "react-router-dom";
import NavbarComponent from "./navbarComponent";
import Loader from "./Loader";
import SearchComponent from "./song/seach/SearchComponent";
import ActionPlay from "../redux/playern/ActionsUseContext/ActionsPlay";

const Page = () => {
    return (
        <div>
            <NavbarComponent/>
            <Loader/>
            <SearchComponent/>
            <Outlet></Outlet>
            <ActionPlay/>
        </div>
    );
};

export default Page;
