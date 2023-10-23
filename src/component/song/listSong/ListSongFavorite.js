import React, {useContext, useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {findListSongFavorite} from "../../api/songService/SongService";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {AudioPlayerContext, useAudioPlayer} from "../../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {likeClickAPI} from "../../api/LikesService/LikesService";

const ListSongFavorite = () => {

    const [listSong, setListSong] = useState([]);
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const [isLike, setIsLike] = useState();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const findById = () => {
        findListSongFavorite()
            .then((list) => {
                const songs = list.data.map((song) => ({
                    ...song,
                    isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
                }));
                setListSong(songs);
            })
            .catch((error) => {
                toast.error('Lỗi không có dữ liệu');
            });
    }

    useEffect(() => {
        findById()
    }, [updateCurrentSongAndSongs, currentSong,isLike]);

    function likeClick(id) {
        likeClickAPI(id).then(res => {
            setIsLike(res.data);
            toast.success("Đã bỏ thích")
            findById();
        })

    }

    const handleToggleSongPlay = (songId) => {
        const updatedSongs = listSong.map((song) => {
            const newIsPlaying = song.id === songId ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying
            }
        })
        setListSong(updatedSongs);
        handlePlayToggle(updatedSongs.some((song) => song.isPlaying));
    };

    return (
        <div>
            <main id="page_content">
                <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                <div className="under-hero container">
                    <div className="section">
                        <div className="section__head"><h3 className="mb-0">Bài hát yêu thích của bạn</h3></div>
                        {listSong.length === 0 ? (
                            <p>Không còn bài hát yêu thích</p>
                        ) : (
                        <div className="list list--order">
                            <div className="row">
                                {listSong.map((song) => (
                                    <div className="list__item" key={song.id} style={{width: "60%"}}>
                                        <div className="list__cover">
                                            <img src={song.imgSong}
                                                                          alt="ảnh"/>
                                            <div
                                               className="btn btn-play btn-sm btn-default btn-icon rounded-pill"

                                               aria-label="Play pause">
                                                {song.isPlaying ? (
                                                    <BsPauseFill
                                                        onClick={() => {
                                                            handleToggleSongPlay(song.id);
                                                            updateCurrentSongAndSongs(song, listSong);
                                                        }}
                                                        style={{fontSize: "30px"}}
                                                    />
                                                ) : (
                                                    <BsFillPlayFill
                                                        onClick={() => {
                                                            handleToggleSongPlay(song.id);
                                                            updateCurrentSongAndSongs(song, listSong);
                                                        }}
                                                        style={{fontSize: "30px"}}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="list__content">
                                            <div className="list__title text-truncate">
                                                {song.nameSong}
                                            </div>
                                            <p className="list__subtitle text-truncate">
                                                    {song.nameSinger}
                                            </p>
                                        </div>
                                        <ul className="list__option">
                                            <li>
                                                <div role="button"
                                                   className="d-inline-flex active"
                                                   aria-label="Favorite" data-favorite-id="1">
                                                        <i className="fa-sharp fa-solid fa-heart"
                                                           style={{
                                                               color: "#ff0000",
                                                               fontSize: "24px"
                                                           }}
                                                           onClick={() => likeClick(song?.id)}
                                                        />

                                                </div>
                                            </li>
                                            <li className="dropstart d-inline-flex">
                                                <div className="dropdown-link"
                                                   role="button"
                                                   data-bs-toggle="dropdown"
                                                   aria-label="Cover options"
                                                   aria-expanded="false"><i
                                                    className="ri-more-fill">

                                                </i>
                                                </div>
                                                <ul className="dropdown-menu dropdown-menu-sm">
                                                    <li><div className="dropdown-item"
                                                           role="button">Thêm vào danh sách phát</div></li>
                                                    <li className="dropdown-divider"></li>
                                                    <li><div className="dropdown-item"
                                                           role="button">Phát</div></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                                {/*</div>*/}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ListSongFavorite;