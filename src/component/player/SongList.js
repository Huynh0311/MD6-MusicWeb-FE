import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveSong} from "../../redux/actions";
import {
    AudioPlayerContext,
    useAudioPlayer
} from "../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import AxiosCustomize from "../api/utils/AxiosCustomize";

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
                const response = await AxiosCustomize.get('/songs/getall');
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
        const updateSongs = songs.map((song) => {
            const newIsPlaying = song.id === songId ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying,
            }
        })
        setSongs(updateSongs);
        handlePlayToggle(updateSongs.some((song) => song.isPlaying));
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
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto">
                                            <div className="dropdown-link"
                                                 role="button"
                                                 data-bs-toggle="dropdown" aria-label="Cover options"
                                                 aria-expanded="false">
                                                <i className="ri-more-2-fill"></i>
                                            </div>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         data-favorite-id="1">Favorite
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         data-playlist-id="1">Add to playlist
                                                    </div>
                                                </li>
                                                <li>
                                                    <p className="dropdown-item"
                                                       role="button"
                                                        // data-queue-id="1"
                                                       onClick={() => addToQueue(song)}
                                                    >Add to queue</p>
                                                </li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         data-next-id="1">Next to play
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button">Share
                                                    </div>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         data-play-id="1">Play
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="cover__image">
                                        <img src={song.imgSong} alt={song.nameSong}/>
                                        <button type="button"
                                                className="btn btn-play btn-default btn-icon rounded-pill">
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
                                        </button>
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

