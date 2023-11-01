import React, {useEffect, useRef} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {useAudioPlayer} from "./AudioPlayerProvider";
import './ActionPlay.css';
import _ from "lodash";

const ActionPlay = () => {
        const {currentSong, songs, updateCurrentSongAndSongs, isPlaying, handlePlayToggle} = useAudioPlayer();
        const player = useRef();
        const handleNextSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
            if (currentIndex < songs.length - 1) {
                const nextSong = songs[currentIndex + 1];
                updateCurrentSongAndSongs(nextSong, songs);
            } else if (currentIndex === songs.length - 1) {
                const nextSong = songs[0];
                updateCurrentSongAndSongs(nextSong, songs);
            } else {
                const defaultNextSong = songs[0];
                updateCurrentSongAndSongs(defaultNextSong, songs);
            }
            player.current.audio.current.play();
        };



        const handlePreviousSongClick = () => {
            const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
            if (currentIndex > 0) {
                const previousSong = songs[currentIndex - 1];
                updateCurrentSongAndSongs(previousSong, songs);
            } else if (currentIndex === 0) {
                const previousSong = songs[songs.length - 1];
                updateCurrentSongAndSongs(previousSong, songs);
            }
            player.current.audio.current.play();
        }

        useEffect(() => {
            if (currentSong) {
                isPlaying ? player.current.audio.current.play() : player.current.audio.current.pause();
            }
        }, [isPlaying]);

        const nextSong = () => {
            let currentSongIndex = songs.findIndex((song) => song.id === currentSong.id);
            let currentListSong = songs.slice(currentSongIndex);
            currentListSong.shift();
            updateCurrentSongAndSongs(currentListSong[0], songs);
        }
        return (
            <>
                {!_.isEmpty(currentSong) ? (
                    <div id="player">
                        <div className="container" style={{maxWidth: "1200px"}}>
                            <div className="player-container">
                                <div className="cover d-flex align-items-center">
                                    <div className="cover__image">
                                        <img src={currentSong.imgSong}
                                             alt="" style={{height: "100%"}}/>
                                    </div>
                                    <div className="cover__content ps-3 d-none d-sm-block">
                                        <div className="cover__title text-truncate">
                                            {currentSong.nameSong}
                                        </div>
                                        <div className="cover__subtitle text-truncate">
                                            {currentSong.nameSinger}
                                        </div>
                                    </div>
                                </div>
                                <div className={"body-player player-control"}>
                                    <H5AudioPlayer ref={player}
                                                   src={currentSong && currentSong.pathSong}
                                                   onPlay={() => handlePlayToggle(true)}
                                                   onPause={() => handlePlayToggle(false)}
                                                   preload={"metadata"}
                                                   className={"player-container"}
                                                   style={{height: "100%", boxShadow: "none",}}
                                                   onEnded={nextSong}
                                    />
                                    <div className="prev_next">
                                        <BiSkipPrevious onClick={handlePreviousSongClick} className={"prev"}/>
                                        <BiSkipNext onClick={handleNextSongClick} className={"next"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                    </div>
                )
                }

            </>
        );
    }
;

export default ActionPlay;
