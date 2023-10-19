import React, {useContext, useEffect, useState} from 'react';

import {AiOutlinePauseCircle, AiOutlinePlayCircle} from 'react-icons/ai';
import {
    AudioPlayerContext,
    useAudioPlayer
} from '../../redux/playern/ActionsUseContext/AudioPlayerProvider';
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import AxiosCustomize from "../api/utils/AxiosCustomize";
import {likeClickAPI} from "../api/LikesService/LikesService";

function Top5Songs() {
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [songs, setSongs] = useState([]);
    const [isLike, setIsLike] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await AxiosCustomize.get('/songs/top5ByPlays');
                const songs = response.data.map((song) => ({
                    ...song,
                    isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
                }));
                setSongs(songs);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát:', error);
            }
        }

        fetchData();
    }, [updateCurrentSongAndSongs, currentSong,isLike]);


    const handleToggleSongPlay = (songId) => {
        const updatedSongs = songs.map((song) => {
            const newIsPlaying = song.id === songId ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying
            }
        })
            setSongs(updatedSongs);
            handlePlayToggle(updatedSongs.some((song) => song.isPlaying));
        };

    function likeClick(id) {
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
        })
    }

    return (
        <div>
            <ul>
                {songs.map((song) => (
                    <div className="list" key={song.id}>
                        <div className="list__item">
                            <div className="list__cover">
                                <img src={song.imgSong} alt={song.nameSong}/>
                                <div className="btn btn-play btn-sm btn-default btn-icon rounded-pill">
                                    {song.isPlaying ? (
                                        <BsPauseFill role='button'
                                                     onClick={() => {
                                                         handleToggleSongPlay(song.id);
                                                         updateCurrentSongAndSongs(song, songs);
                                                     }}
                                                     style={{fontSize: "30px"}}
                                        />
                                    ) : (
                                        <BsFillPlayFill role='button'
                                                        onClick={() => {
                                                            handleToggleSongPlay(song.id);
                                                            updateCurrentSongAndSongs(song, songs);
                                                        }}
                                                        style={{fontSize: "30px"}}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="list__content">
                                <Link to={"/song/detailSong/" + song.id}>
                                    <p className="list__title text-truncate">
                                        {song.nameSong}
                                    </p>
                                </Link>
                                <Link to={"/song/detailSong/" + song.id}>
                                    <p className="list__subtitle text-truncate">
                                        <p>{song.description}</p>
                                    </p>
                                </Link>
                            </div>
                            <ul className="list__option">
                                <li>
                                    <span className="badge rounded-pill bg-info">
                                        <i className="ri-vip-crown-fill"></i>
                                    </span>
                                </li>
                                <li>
                                    <div
                                        role="button"
                                        className="d-inline-flex"
                                        aria-label="Favorite"
                                        data-favorite-id={song.id}>
                                        {song.isLiked === 1 ? (
                                            <i className="fa-sharp fa-solid fa-heart"
                                               style={{
                                                   color: "#ff0000",
                                                   fontSize: "24px"
                                               }}
                                               onClick={() => likeClick(song.id)}>
                                            </i>
                                        ) : (
                                            <i className="ri-heart-line heart-empty"
                                               onClick={() => likeClick(song.id)}
                                            />
                                        )}
                                    </div>
                                </li>
                                <li className="dropstart d-inline-flex">
                                    <div
                                        className="dropdown-link"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-label="Cover options"
                                        aria-expanded="false">
                                        <i className="ri-more-fill"></i>
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-sm">
                                        <li>
                                            <div
                                                className="dropdown-item"
                                                role="button"
                                                >
                                                Add to playlist
                                            </div>
                                        </li>
                                        <li><div
                                            className="dropdown-item"
                                            role="button"
                                            >
                                            Add to queue
                                        </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown-item"
                                                role="button"
                                                >
                                                Next to play
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown-item"
                                                role="button"
                                            >
                                                Share
                                            </div>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li>
                                            <div
                                                className="dropdown-item"
                                                role="button"
                                                >
                                                Play
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Top5Songs;
