import React from 'react';
import {Outlet} from "react-router-dom";
import MusicPlayer from "./player/MusicPlayer";

const Page = () => {
    return (
        <div>
            <Outlet></Outlet>
            <MusicPlayer/>
        </div>
    );
};

export default Page;