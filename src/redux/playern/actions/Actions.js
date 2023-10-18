import React, {useEffect, useRef, useState} from 'react';

import {AiOutlinePauseCircle, AiOutlinePlayCircle, AiOutlineReload} from "react-icons/ai";
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import SongList from "../../../component/player/SongList";

const ActionPlay = (props) => {
    // let listSong = JSON.parse(localStorage.getItem("listSong"));
    // let currentSong = JSON.parse(localStorage.getItem("song")) ;
    // const [currentListSong, setCurrentListSong] = listSong;

    // const [isPlaying, setIsPlaying] = useState(false);
    // const playMusic = () => {
    //     setIsPlaying(true);
    //     if (!isPlaying) {
    //         player.current.audio.current.play();
    //     }else{
    //         player.current.audio.current.pause();
    //     }
    // };
    const player = useRef();
    return (
        <div>
            <div>
                <H5AudioPlayer ref={player} onPlay={e => console.log('onplay')} src={props.song && props.song.pathSong}
                               preload={"metadata"} style={{marginLeft: "500px", marginTop: "900px", width: "300px"}}/>
                {/*<AiOutlinePlayCircle*/}
                {/*    style={{marginLeft: '400px', cursor: 'pointer'}}*/}
                {/*    onClick={playMusic} // Gán hàm pauseMusic vào biểu tượng pause*/}
                {/*>RUN</AiOutlinePlayCircle>*/}
            </div>
        </div>
    );
};

export default ActionPlay;