import React, {useContext, useEffect, useState} from 'react';
import {AudioPlayerContext, useAudioPlayer} from "../../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {getAllSongByIdDesc} from "../../api/songService/SongService";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import {likeClickAPI} from "../../api/LikesService/LikesService";


const NewSongList = () => {
    const [songs, setSongs] = useState([]);
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [isLike, setIsLike] = useState(false);

    const [songsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllSongByIdDesc();
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
    }, [updateCurrentSongAndSongs, currentSong, isLike]);

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

    function likeClick(id) {
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
        })
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

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="under-hero container">
                        <div className="section" style={{marginTop: "150px"}}>
                            <div className="list">
                                <div className="row">
                                    <div className="col-xl-12">
                                        {songs && currentSongs.map((song) => (
                                            <div className="list__item" key={song.id}>
                                                <div className="list__cover" style={{
                                                    width: "4rem",
                                                    height: "4rem",
                                                }}>
                                                    <img src={song.imgSong} alt="Error"/>
                                                    <div
                                                        className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                                        aria-label="Play pause">
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
                                                <Link to={"/song/detailSong/" + song.id} className="list__content"
                                                      style={{
                                                          paddingLeft: "2rem"
                                                      }}>
                                                    <div>
                                                        <div href="song-details.html"
                                                             className="list__title text-truncate">{song.nameSong}</div>
                                                        <p className="list__subtitle text-truncate">
                                                            {song.nameSinger}
                                                        </p>
                                                    </div>
                                                </Link>
                                                <ul className="list__option">
                                                    <li>
                                                        <div href="#" role="button" className="d-inline-flex"
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
                                                                <i className="ri-heart-line heart-empty"
                                                                   onClick={() => likeClick(song.id)}
                                                                />
                                                            )}
                                                        </div>
                                                    </li>
                                                    <li className="dropstart d-inline-flex">
                                                        <div className="dropdown-link"
                                                             href="#" role="button"
                                                             data-bs-toggle="dropdown"
                                                             aria-label="Cover options"
                                                             aria-expanded="false"><i
                                                            className="ri-more-fill"></i>
                                                        </div>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li>
                                                                <div className="dropdown-item" href="#" role="button"
                                                                     data-playlist-id="1">Add to playlist
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="dropdown-item" href="#" role="button"
                                                                     data-queue-id="1">Add to queue
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="dropdown-item" href="#" role="button"
                                                                     data-next-id="1">Next to play
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="dropdown-item" href="#"
                                                                     role="button">Share
                                                                </div>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li>
                                                                <div className="dropdown-item" href="#" role="button"
                                                                     data-play-id="1">Play
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pagination">
                                {Array.from({length: pageCount}, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            {/*<div className="mt-5 text-center">*/}
                            {/*    <div href="#" className="btn btn-primary">*/}
                            {/*        <div className="btn__wrap"><i className="ri-loader-3-fill"></i>*/}
                            {/*            <span>Load more</span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
};

export default NewSongList;