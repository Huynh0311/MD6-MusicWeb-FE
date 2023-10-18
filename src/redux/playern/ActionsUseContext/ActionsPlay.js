import React, {useEffect, useRef} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {BiSkipNextCircle, BiSkipPreviousCircle} from "react-icons/bi";
import {useAudioPlayer} from "./AudioPlayerProvider";

const ActionPlay = () => {
        const {currentSong, songs, updateCurrentSongAndSongs, isPlaying, handlePlayToggle} = useAudioPlayer();
        const player = useRef();
        const handleNextSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            if (currentIndex < songs.length - 1) {
                const nextSong = songs[currentIndex + 1];
                updateCurrentSongAndSongs(nextSong, songs);
            } else if (currentIndex == songs.length - 1) {
                const nextSong = songs[0];
                updateCurrentSongAndSongs(nextSong, songs);
            } else {
                const defaultNextSong = songs[0];
                updateCurrentSongAndSongs(defaultNextSong, songs);
            }
            player.current.audio.current.play();
        };

        const handlePreviousSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id == currentSong.id)
            if (currentIndex > 0) {
                const previousSong = songs[currentIndex - 1];
                updateCurrentSongAndSongs(previousSong, songs);
            } else if (currentIndex == 0) {
                const previousSong = songs[songs.length - 1];
                updateCurrentSongAndSongs(previousSong, songs);
            }
            player.current.audio.current.play();
        }

        useEffect(() => {
            isPlaying ? player.current.audio.current.play() : player.current.audio.current.pause();
        }, [isPlaying]);

        const nextSong = () => {
            let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
            let currentListSong = songs.slice(currentSongIndex);
            currentListSong.shift();
            updateCurrentSongAndSongs(currentListSong[0],songs);
        }
        return (
            <div>
                <div>
                    <H5AudioPlayer ref={player}
                                   src={currentSong && currentSong.pathSong} onPlay={() => handlePlayToggle(true)}
                                   onPause={() => handlePlayToggle(false)} onEnded={nextSong}
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