import React, {useState, useEffect, useContext} from 'react';
import axiosInstance from '../api/service/axios-instance';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveSong} from "../../redux/actions";
import {
    AudioPlayerContext,
    useAudioPlayer
} from "../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";

function SongList() {

    const [songs, setSongs] = useState([]);
    const [songsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/songs/getall');
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
    }, [updateCurrentSongAndSongs, currentSong]); // The empty dependency array ensures the effect runs only once (like componentDidMount)

    const addToQueue = (song) => {
        dispatch(saveSong(song));
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const calculatePageCount = () => {
        return Math.ceil(songs.length / songsPerPage);
    };

    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const pageCount = calculatePageCount();
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
        <>
            <div className="container">
                <div className="row">
                    {currentSongs.map((song) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={song.id}>
                            <div className="song-card">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li>
                                                <span className="badge rounded-pill bg-danger">
                                                    <i className="ri-heart-fill"></i>
                                                </span>
                                            </li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto">
                                            <a className="dropdown-link" href="#"
                                               role="button"
                                               data-bs-toggle="dropdown" aria-label="Cover options"
                                               aria-expanded="false">
                                                <i className="ri-more-2-fill"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-favorite-id="1">Favorite</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-playlist-id="1">Add to playlist</a>
                                                </li>
                                                <li>
                                                    <p className="dropdown-item"
                                                       role="button"
                                                        // data-queue-id="1"
                                                       onClick={() => addToQueue(song)}
                                                    >Add to queue</p>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-next-id="1">Next to play</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       role="button"
                                                       data-play-id="1">Play</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="cover__image">
                                        <img src={song.imgSong} alt={song.nameSong}/>
                                        <div className="btn btn-play btn-default btn-icon rounded-pill">
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

                                    <Link to={"/song/detailSong/" + song.id}>
                                        <div className="cover__foot">
                                            <p className="cover__title text-truncate">
                                                {song.nameSong}
                                            </p>
                                            <p className="cover__subtitle text-truncate">
                                                {song.description}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({length: pageCount}, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >

                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SongList;

