import React, {useEffect, useRef} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {BiSkipNextCircle, BiSkipPreviousCircle} from "react-icons/bi";
import {useAudioPlayer} from "./AudioPlayerProvider";

const ActionPlay = () => {
        const {currentSong, songs, updateCurrentSongAndSongs, isPlaying, handlePlayToggle} = useAudioPlayer();
        const player = useRef();
        const handleNextSongClick = () => {
            console.log(songs);
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            if (currentIndex < songs.length - 1) {
                const nextSong = songs[currentIndex + 1];
                updateCurrentSongAndSongs(nextSong, songs);
                console.log(nextSong);
            } else if (currentIndex == songs.length - 1) {
                const nextSong = songs[0];
                updateCurrentSongAndSongs(nextSong, songs);
                console.log(nextSong);
            } else {
                const defaultNextSong = songs[0];
                updateCurrentSongAndSongs(defaultNextSong, songs);
                console.log(defaultNextSong);
            }
        };

        const handlePreviousSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
            if (currentIndex > 0) {
                const previousSong = songs[currentIndex - 1];
                updateCurrentSongAndSongs(previousSong, songs);
                console.log(previousSong);
            } else if (currentIndex == 0) {
                const previousSong = songs[songs.length - 1];
                updateCurrentSongAndSongs(previousSong, songs);
                console.log(previousSong);
            }
        }

        const playNext = () =>{
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            const nextSongIndex = (currentIndex + 1) % songs.length;
            const nextSong = songs[nextSongIndex];
            updateCurrentSongAndSongs(nextSong, songs);
    }

        const audiofunction = () => {
            if (!isPlaying) {
                player.current.audio.current.play();
                handlePlayToggle(true);
            } else {
                player.current.audio.current.pause();
                handlePlayToggle(false);
            }
        };

        useEffect(() => {
            audiofunction();
        }, [currentSong]);

    useEffect(() => {
    }, [isPlaying]);

        return (
            <div>
                <div>
                    <H5AudioPlayer ref={player}
                                   src={currentSong && currentSong.pathSong} onPlay={() => handlePlayToggle(true)}
                                   onPause={() => handlePlayToggle(false)} onEnded={playNext}
                                   preload={"metadata"} style={{marginLeft: "500px", marginTop: "900px", width: "600px"}}/>
                    <BiSkipPreviousCircle onClick={handlePreviousSongClick}
                                          style={{marginLeft: "500px", marginTop: "100px", fontSize: "30px"}}/>
                    <BiSkipNextCircle onClick={handleNextSongClick}
                                      style={{marginLeft: "500px", marginTop: "100px", fontSize: "30px"}}/>
                </div>
            </div>
        );
    }
;

export default ActionPlay;