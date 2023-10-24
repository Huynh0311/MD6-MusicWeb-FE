import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./BodySearch.css"
import {
    searchListSongByName,
    searchListSongByNamePlaylist,
    searchListSongByNameSinger
} from "../api/songService/SongService";
import {likeClickAPI} from "../api/LikesService/LikesService";
import {AudioPlayerContext, useAudioPlayer} from "../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";

const BodySearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchInput = queryParams.get('q');
    const [selection, setSelection] = useState('song');
    const [numberOfElement, setNumberOfElement] = useState(4);
    const [searchList, setSearchList] = useState([]);
    const slice = searchList.slice(0, numberOfElement);
    const [isLike, setIsLike] = useState(false);
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);


    const loadMore = () => {
        setNumberOfElement(numberOfElement + numberOfElement);
    }

    const handleSelectFindSelection = (e) => {
        setSelection(e.target.value);
        setSearchList([]);
    }

    useEffect(() => {
        searchSong();
    }, [selection, searchInput, isLike, updateCurrentSongAndSongs, currentSong])

    useEffect(() => {
        setNumberOfElement(4);
    }, [selection, searchInput])
    const searchSong = async () => {
        if (searchInput !== '' && selection === 'song') {
            const res = await searchListSongByName(searchInput);
            const songs = res.data.map((song) => ({
                ...song,
                isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
            }));
            setSearchList(songs);
        } else if (searchInput !== '' && selection === 'singer') {
            const res = await searchListSongByNameSinger(searchInput);
            const songs = res.data.map((song) => ({
                ...song,
                isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
            }));
            setSearchList(songs);
        } else {
            const res = await searchListSongByNamePlaylist(searchInput);
            handleSetASongFromList(res.data);
        }
    }

    function likeClick(id) {
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
        })
    }

    const handleSetASongFromList = (songList) => {
        const songs = songList.map((aSongList) => {
            return aSongList.map((song) => ({
                ...song,
                isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
            }));
        });
        setSearchList(songs);
    }
    const handleToggleSongPlay = (songId) => {
        const updatedSongs = searchList.map((song) => {
            if (song instanceof Array) {
                for (let s of song) {
                    if (s.id === songId) {
                        const newIsPlaying = !s.isPlaying;
                        s.isPlaying = newIsPlaying;
                        if (newIsPlaying) {
                            handlePlayToggle(true);
                        } else {
                            handlePlayToggle(false);
                        }
                    }
                }
            } else {
                if (song.id === songId) {
                    const newIsPlaying = !song.isPlaying;
                    song.isPlaying = newIsPlaying;
                    if (newIsPlaying) {
                        handlePlayToggle(true);
                    } else {
                        handlePlayToggle(false);
                    }
                }
            }
            return song;
        });
        setSearchList(updatedSongs);
    };

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head align-items-center"><span
                                className="d-block pe-3 fs-6 fw-semi-bold">
                                {(selection === 'song' || selection === 'singer') ? (
                                    <p>{searchList.length} bài hát trong danh sách tim kiếm</p>
                                ) : (
                                    <p>{searchList.length} album trong danh sách tim kiếm</p>
                                )}

                            </span>
                                <div>
                                    <select id="select-option" className="form-select" aria-label="Filter song"
                                             onChange={(e) => handleSelectFindSelection(e)}>
                                    <option key={1} value="song">Tìm theo tên bài hát</option>
                                    <option key={2} value="singer">Tìm theo tên ca sỹ</option>
                                    <option key={3} value="playlist">Tìm theo tên playlist</option>
                                </select></div>
                            </div>
                            <div className="list">
                                <div className="row">
                                    {searchInput !== '' && (selection === 'song' || selection === 'singer') ? (
                                        slice.length > 0 ? (
                                            slice.map((song) =>
                                                (
                                                    <div className="col-xl-6" key={song.id}>
                                                        <div className="list__item" data-song-id={song.id}
                                                             data-song-name={song.nameSong}
                                                             data-song-artist={song.nameSinger} data-song-album="Mummy"
                                                             data-song-url={song.pathSong}
                                                             data-song-cover={song.imgSong}>
                                                            <div className="list__cover"><img src={song.imgSong}
                                                                                              alt="ErrorLoading"/>
                                                                <div
                                                                    className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                                                    aria-label="Play pause">
                                                                    {song.isPlaying ? (
                                                                        <BsPauseFill
                                                                            onClick={() => {
                                                                                handleToggleSongPlay(song.id);
                                                                                updateCurrentSongAndSongs(song, searchList);
                                                                            }}
                                                                            style={{fontSize: "30px"}}
                                                                        />
                                                                    ) : (
                                                                        <BsFillPlayFill
                                                                            onClick={() => {
                                                                                handleToggleSongPlay(song.id);
                                                                                updateCurrentSongAndSongs(song, searchList);
                                                                            }}
                                                                            style={{fontSize: "30px"}}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="list__content">
                                                                <Link to={`/song/detailSong/${song.id}`}
                                                                      className="list__title text-truncate">
                                                                    {song.nameSong}
                                                                </Link>
                                                                <p className="list__subtitle text-truncate">
                                                                    {song.nameSinger}
                                                                </p>
                                                            </div>
                                                            <ul className="list__option">
                                                                <li>
                                                                    <div role="button"
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
                                                                        aria-expanded="false"><i
                                                                        className="ri-more-fill"></i>
                                                                    </div>
                                                                    <ul className="dropdown-menu dropdown-menu-sm">
                                                                        <li>
                                                                            <div className="dropdown-item" role="button"
                                                                                 data-playlist-id="1">Add to playlist
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="dropdown-item"
                                                                                 role="button"
                                                                                 data-queue-id="1">Add to queue
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="dropdown-item" role="button"
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
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                ))) : (
                                            <p>Không tìm thấy kết quả</p>
                                        )) : (
                                        slice.length > 0 ? (
                                            slice.map((songList) => (
                                                <div key={songList[0]?.id} className="playlist col-xl-6"
                                                     style={{marginBottom: "32px"}}>
                                                    <div className="playlist-mainpacket">
                                                        <h1>{songList[0]?.playlistName}</h1>
                                                        <img src={songList[0]?.playlistImg}/>
                                                    </div>
                                                    <div className="song-component">
                                                        {songList.map((song) => (
                                                            <div className="col-xl-6" key={song.id}>
                                                                <div className="list__item" data-song-id={song.id}
                                                                     data-song-name={song?.nameSong}
                                                                     data-song-artist={song?.nameSinger}
                                                                     data-song-album="Mummy"
                                                                     data-song-url={song?.pathSong}
                                                                     data-song-cover={song?.imgSong}
                                                                     style={{width: "200%"}}>
                                                                    <div className="list__cover"><img
                                                                        src={song?.imgSong}
                                                                        alt="ErrorLoading"/>
                                                                        <div
                                                                            className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                                                            // data-play-id={song?.id}
                                                                            aria-label="Play pause">
                                                                            {/*<i className="ri-play-fill icon-play"></i>*/}
                                                                            {/*<i className="ri-pause-fill icon-pause"></i>*/}
                                                                            {song.isPlaying ? (
                                                                                <BsPauseFill
                                                                                    onClick={() => {
                                                                                        handleToggleSongPlay(song.id);
                                                                                        updateCurrentSongAndSongs(song, songList);
                                                                                    }}
                                                                                    style={{fontSize: "30px"}}
                                                                                />
                                                                            ) : (
                                                                                <BsFillPlayFill
                                                                                    onClick={() => {
                                                                                        handleToggleSongPlay(song.id);
                                                                                        updateCurrentSongAndSongs(song, songList);
                                                                                    }}
                                                                                    style={{fontSize: "30px"}}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="list__content">
                                                                        <Link to={`/song/detailSong/${song?.id}`}
                                                                              className="list__title text-truncate" title={`isPlaying: ${JSON.stringify(songList[0].isPlaying)}`}>
                                                                            {song?.nameSong} - {song.isPlaying}
                                                                        </Link>
                                                                        <p className="list__subtitle text-truncate">
                                                                            {song.nameSinger}
                                                                        </p>
                                                                    </div>
                                                                    <ul className="list__option">
                                                                        <li>
                                                                            <div role="button"
                                                                                 className="d-inline-flex"
                                                                                 aria-label="Favorite"
                                                                                 data-favorite-id={song?.id}>
                                                                                {song?.isLiked === 1 ? (
                                                                                    <i className="fa-sharp fa-solid fa-heart"
                                                                                       style={{
                                                                                           color: "#ff0000",
                                                                                           fontSize: "24px"
                                                                                       }}
                                                                                       onClick={() => likeClick(song?.id)}>
                                                                                    </i>
                                                                                ) : (
                                                                                    <i className="ri-heart-line heart-empty"
                                                                                       onClick={() => likeClick(song?.id)}/>
                                                                                )}
                                                                            </div>
                                                                        </li>
                                                                        <li className="dropstart d-inline-flex">
                                                                            <div
                                                                                className="dropdown-link"
                                                                                role="button"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-label="Cover options"
                                                                                aria-expanded="false"><i
                                                                                className="ri-more-fill"></i></div>
                                                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                                                <li>
                                                                                    <div className="dropdown-item"
                                                                                         role="button"
                                                                                         data-playlist-id="1">Add to
                                                                                        playlist
                                                                                    </div>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="dropdown-item"
                                                                                         role="button"
                                                                                         data-queue-id="1">Add to
                                                                                        queue
                                                                                    </div>
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
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Không tìm thấy kết quả</p>
                                        )
                                    )
                                    }
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <div className="btn btn-primary"
                                     style={{marginBottom: "30px"}}>
                                    <div className="btn__wrap"><i className="ri-loader-3-fill"></i> <span
                                        onClick={loadMore}>Load more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BodySearch;
