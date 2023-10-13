import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findPlaylistById} from "../api/PlaylistService/PlaylistService";
import axios from "axios";

export default function DetailPlaylist() {
    const [playlist, setPlaylist] = useState({})
    const [count, setCount] = useState(0);
    const [songs, setSongs] = useState([]);
    const [account, setAccount] = useState({});


    const {id} = useParams();

    useEffect(() => {
        findPlaylistById(id).then(res => {
            setPlaylist(res.data)
            console.log(res.data)
            fetchPlaylistCount(id);
            fetchSongs(id);
            fetchAccount(id);
        })
    }, [])
    const fetchPlaylistCount = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/playlist/countSong/${id}`);
            setCount(res.data);
        } catch (error) {
            setCount(0);
        }
    };

    const fetchSongs = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/playlist/getSongByPlaylist/${id}`);
            setSongs(res.data);
        } catch (error) {
            setSongs([]);
        }
    };
    const fetchAccount = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/playlist/getUserByPlaylist/${id}`);
            setAccount(res.data);
        } catch (error) {
            setAccount({});
        }
    };
    return (
        <main id="page_content">
            <div className="hero"></div>
            <div className="under-hero container">
                <div className="section">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-md-4">
                            <div className="cover cover--round">
                                <div className="cover__image"><img src={playlist.imgPlaylist} alt={''}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 d-none d-xl-block"></div>
                        <div className="col-md-8 mt-5 mt-md-0">
                            <div className="d-flex flex-wrap mb-2"><span
                                className="text-dark fs-4 fw-semi-bold pe-2">{playlist.namePlaylist}</span>
                            </div>
                            <ul className="info-list info-list--dotted mb-3">
                                <li>{count} Songs</li>
                            </ul>
                            <p className="mb-5">By: <a href="artist-details.html"
                                                       className="text-dark fw-medium">{account.name}
                            </a></p>
                            <ul className="info-list">
                                <li>
                                    <div className="d-flex align-items-center">
                                        <button type="button" id="play_all"
                                                className="btn btn-icon btn-primary rounded-pill"
                                                data-collection-play-id="1"><i className="ri-play-fill icon-play"></i>
                                            <i
                                                className="ri-pause-fill icon-pause"></i></button>
                                        <label htmlFor="play_all" className="ps-2 fw-semi-bold text-primary mb-0"
                                               style={{cursor: 'pointer'}}>Play all</label></div>
                                </li>
                                <li><a href="javascript:void(0);" role="button"
                                       className="text-dark d-flex align-items-center"
                                       aria-label="Favorite" data-favorite-id="1"><i
                                    className="ri-heart-line heart-empty"></i>
                                    <i className="ri-heart-fill heart-fill"></i> <span
                                        className="ps-2 fw-medium">121</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="section__head"><h3 className="mb-0">Favorite Songs</h3></div>
                    <div className="list list--order">
                        <div className="row">
                            {songs.map((song) => (
                                <div className="list__item list__playlist" data-song-id="" data-song-name={song.nameSong}
                                     data-song-artist={song.nameSinger} data-song-album="Mummy"
                                     data-song-url={song.pathSong}
                                     data-song-cover={song.imgSong}
                                style={{width: "50%"}}>
                                    <div className="list__cover"><img src={song.imgSong}
                                                                      alt="ảnh"/>
                                        <a href="javascript:void(0);"
                                           className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                           data-play-id="1"
                                           aria-label="Play pause"><i className="ri-play-fill icon-play"></i>
                                            <i className="ri-pause-fill icon-pause"></i>
                                        </a>
                                    </div>
                                    <div className="list__content">
                                        <a href="song-details.html" className="list__title text-truncate">
                                            {song.nameSong}
                                        </a>
                                        <p className="list__subtitle text-truncate">
                                            <a href="artist-details.html">
                                                {song.nameSinger}
                                            </a>
                                        </p>
                                    </div>
                                    <ul className="list__option">
                                        <li><a href="javascript:void(0);" role="button"
                                               className="d-inline-flex active"
                                               aria-label="Favorite" data-favorite-id="1"><i
                                            className="ri-heart-line heart-empty"></i>
                                            <i className="ri-heart-fill heart-fill"></i></a></li>
                                        <li>
                                            <div className="me-4 d-none d-xl-block"><span
                                                className="amplitude-current-minutes"></span>:<span
                                                className="amplitude-current-seconds"></span> / <span
                                                className="amplitude-duration-minutes"></span>:
                                                <span className="amplitude-duration-seconds"></span>
                                            </div>
                                        </li>
                                        <li className="dropstart d-inline-flex"><a className="dropdown-link"
                                                                                   href="javascript:void(0);"
                                                                                   role="button"
                                                                                   data-bs-toggle="dropdown"
                                                                                   aria-label="Cover options"
                                                                                   aria-expanded="false"><i
                                            className="ri-more-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-playlist-id="1">Add to playlist</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-queue-id="1">Add to queue</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-next-id="1">Next to play</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a></li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-play-id="1">Play</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}