import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {findPlaylistById} from "../api/PlaylistService/PlaylistService";
import axios from "axios";
import {AudioPlayerContext, useAudioPlayer} from "../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {likeClickAPI} from "../api/LikesService/LikesService";


export default function DetailPlaylist() {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState({isPlaying: false})
    const [count, setCount] = useState(0);
    const [songs, setSongs] = useState([]);
    const [account, setAccount] = useState({});
    const {id} = useParams();
    const [isLike, setIsLike] = useState(false);
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {
        isPlaying,
        handlePlayToggle,
        currentPlaylist, updateCurrentPlaylist
    } = useContext(AudioPlayerContext);
    const [accountLogin, setAccountLogin] = useState(JSON.parse(localStorage.getItem("data")));
    const [isDuplicateSong, setIsDuplicateSong] = useState(false);

    useEffect(() => {
        findPlaylistById(id).then(res => {
            setPlaylist({...res.data, isPlaying});
            if(songs) {
                const updatedSongs = songs.map((song) => ({
                    ...song,
                    isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
                }));
                setSongs(updatedSongs);
            }
            fetchPlaylistCount(id);
            fetchAccount(id);
        })
    }, [ currentSong, updateCurrentSongAndSongs])

    useEffect(() => {
        fetchSongs(id);
    }, [isLike]);

    const handleToggleSongPlay = (song1) => {
        const updateSongs = songs.map((song) => {
            const newIsPlaying = song.id === song1.id ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying,
            }
        })
        setSongs(updateSongs);
        setPlaylist({...playlist, isPlaying: !isPlaying});
        handlePlayToggle(updateSongs.some((song) => song.isPlaying));
        handleCheckingDuplacateSongsInAPlaylist(song1);
    };

    const handleCheckingDuplacateSongsInAPlaylist = (song1) => {
        if (song1 == null) {
            return false;
        }
        let isDuplicate = songs.some((song) => song.id === song1.id);
        setIsDuplicateSong(isDuplicate);
    }


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
            const config = {
                headers: {},
            };

            // Kiểm tra xem người dùng đã đăng nhập hay chưa, và token có tồn tại không
            if (accountLogin && accountLogin.token) {
                config.headers.Authorization = `Bearer ${accountLogin.token}`;
            }

            const res = await axios.get(`http://localhost:8080/playlist/getSongByPlaylist/${id}`, config);
            const songs = res.data.map((song) => ({
                ...song,
                isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
            }));
            setSongs(songs);
            setPlaylist({...playlist, songs});
            updateCurrentPlaylist({playlist});
            handleCheckingDuplacateSongsInAPlaylist(res.data);
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

    function likeClick(id) {
        if (!accountLogin) {
            navigate("/login");
            return;
        }
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
        })
    }

    return (
        <main id="page_content">
            <div className="hero" style={{backgroundImage: "url(../../images/banner/event.jpg)"}}></div>
            <div className="under-hero container">
                <div className="section">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-md-4">
                            <div className="cover cover--round">
                                <div className="cover__image"><img src={playlist.playlistImg} alt={''}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 d-none d-xl-block"></div>
                        <div className="col-md-8 mt-5 mt-md-0">
                            <div className="d-flex flex-wrap mb-2"><span
                                className="text-dark fs-4 fw-semi-bold pe-2">{playlist.namePlaylist}</span>
                            </div>
                            <p className="info-list info-list--dotted mb-3" style={{fontWeight: "bolder"}}>
                                {count} bài hát có trong Playlist
                            </p>
                            <p className="mb-5">Tạo bởi:
                                <a href="artist-details.html" className="text-dark fw-medium">{account.name}
                                </a>
                            </p>
                            <ul className="info-list" style={{marginTop: "-30px", marginLeft: "-5px"}}>
                                <li>
                                    <div className="d-flex align-items-center">
                                        <button type="button" id="play_all"
                                                className="btn btn-icon btn-primary rounded-pill">
                                            {playlist.isPlaying && isDuplicateSong ? (
                                                <BsPauseFill role='button'
                                                             onClick={() => {
                                                                 handleToggleSongPlay(currentSong);
                                                                 setIsDuplicateSong(true);
                                                             }}
                                                             style={{fontSize: "30px"}}
                                                />
                                            ) : (
                                                <BsFillPlayFill role='button'
                                                                onClick={() => {
                                                                    if (currentSong === null) {
                                                                        updateCurrentSongAndSongs(songs[0], songs);
                                                                        handleToggleSongPlay(songs[0]);
                                                                    } else {
                                                                        updateCurrentSongAndSongs(songs[0], songs);
                                                                        handleToggleSongPlay(songs[0]);
                                                                    }
                                                                }}
                                                                style={{fontSize: "30px"}}
                                                />
                                            )}
                                        </button>
                                        <label htmlFor="play_all" className="ps-2 fw-semi-bold text-primary mb-0"
                                               style={{cursor: 'pointer'}}>Phát Playlist
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" role="button"
                                       className="text-dark d-flex align-items-center"
                                       aria-label="Favorite" data-favorite-id="1">
                                        <i className="ri-heart-line heart-empty"></i>
                                        <i className="ri-heart-fill heart-fill"></i>
                                        <span className="ps-2 fw-medium">121</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="section__head"><h3 className="mb-0" style={{marginTop: "30px"}}>Các bài hát có trong
                        Playlist</h3></div>
                    <div className="list list--order">
                        <div className="row">
                            {songs.map((song) => (
                                <div className="list__item list__playlist"
                                     style={{width: "50%"}} key={song.id}>
                                    <div className="list__cover">
                                        <img src={song.imgSong}
                                             alt="ảnh"/>
                                        <a
                                            className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                            data-play-id="1"
                                            aria-label="Play pause">
                                            {song.isPlaying ? (
                                                <BsPauseFill role='button'
                                                             onClick={() => {
                                                                 handleToggleSongPlay(song);
                                                                 updateCurrentSongAndSongs(song, songs);
                                                             }}
                                                             style={{fontSize: "30px"}}
                                                />
                                            ) : (
                                                <BsFillPlayFill role='button'
                                                                onClick={() => {
                                                                    handleToggleSongPlay(song);
                                                                    updateCurrentSongAndSongs(song, songs);
                                                                }}
                                                                style={{fontSize: "30px"}}
                                                />
                                            )}
                                        </a>
                                    </div>

                                    <div className="list__content">
                                        <Link to={`/song/detailSong/${song.id}`}>
                                            <div className="list__title text-truncate">{song.nameSong}</div>
                                        </Link>
                                        <p className="list__subtitle text-truncate">
                                            <a href="artist-details.html">
                                                {song.nameSinger}
                                            </a>
                                        </p>
                                    </div>
                                    <ul className="list__option">
                                        <li>
                                            <a role="button"
                                               className="d-inline-flex active"
                                               aria-label="Favorite" data-favorite-id="1">
                                                {song.isLiked === 1 ? (
                                                    <i className="fa-sharp fa-solid fa-heart"
                                                       style={{
                                                           color: "#ff0000",
                                                           fontSize: "24px"
                                                       }}
                                                       onClick={() => likeClick(song.id)}>
                                                    </i>
                                                ) : (
                                                    <i className="fa-sharp fa-regular fa-heart"
                                                       onClick={() => likeClick(song.id)}
                                                       style={{color: "#000000", fontSize: "24px"}}></i>
                                                )}
                                            </a>
                                        </li>
                                        <li>
                                            <div className="me-4 d-none d-xl-block"><span
                                                className="amplitude-current-minutes"></span>:<span
                                                className="amplitude-current-seconds"></span> / <span
                                                className="amplitude-duration-minutes"></span>:
                                                <span className="amplitude-duration-seconds"></span>
                                            </div>
                                        </li>
                                        <li className="dropstart d-inline-flex">
                                            <a className="dropdown-link"
                                               href="#"
                                               role="button"
                                               data-bs-toggle="dropdown"
                                               aria-label="Cover options"
                                               aria-expanded="false"><i
                                                className="ri-more-fill"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-playlist-id="1">Add to playlist</a></li>
                                                <li><a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-queue-id="1">Add to queue</a></li>
                                                <li><a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-next-id="1">Next to play</a></li>
                                                <li><a className="dropdown-item" href="#"
                                                       role="button">Share</a></li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="#"
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