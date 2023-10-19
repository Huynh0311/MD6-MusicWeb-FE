import React, {useContext, useEffect, useState} from 'react';
import axiosInstance from '../api/service/axios-instance';
import {AiOutlinePauseCircle, AiOutlinePlayCircle} from 'react-icons/ai';
import {
    AudioPlayerContext,
    useAudioPlayer
} from '../../redux/playern/ActionsUseContext/AudioPlayerProvider';
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {Link} from "react-router-dom";

function Top5Songs() {
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/songs/top5ByPlays');
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
        console.log(songs)
    }, [updateCurrentSongAndSongs, currentSong]);
    const handleToggleSongPlay = (songId) => {
        const updatedSongs = songs.map((song) => {
            if (song.id === songId) {
                const newIsPlaying = !song.isPlaying;
                song.isPlaying = newIsPlaying;
                if (newIsPlaying) {
                    handlePlayToggle(true);
                } else {
                    handlePlayToggle(false);
                }
            } else {
                song.isPlaying = false;
            }
            return song;
        });
        setSongs(updatedSongs);
    };

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
                                    <a
                                        href="#"
                                        role="button"
                                        className="d-inline-flex"
                                        aria-label="Favorite"
                                        data-favorite-id={song.id}
                                    >
                                        <i className="ri-heart-line heart-empty"></i>{' '}
                                        <i className="ri-heart-fill heart-fill"></i>
                                    </a>
                                </li>
                                <li className="dropstart d-inline-flex">
                                    <a
                                        className="dropdown-link"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-label="Cover options"
                                        aria-expanded="false"
                                    >
                                        <i className="ri-more-fill"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-sm">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                role="button"
                                                data-play-id={song.id}
                                            >
                                                Add to playlist
                                            </a>
                                        </li>
                                        <li><a
                                            className="dropdown-item"
                                            href="#"
                                            role="button"
                                            data-play-id={song.id}
                                        >
                                            Add to queue
                                        </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                role="button"
                                                data-play-id={song.id}
                                            >
                                                Next to play
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                role="button"
                                            >
                                                Share
                                            </a>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                                role="button"
                                                data-play-id={song.id}
                                            >
                                                Play
                                            </a>
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
