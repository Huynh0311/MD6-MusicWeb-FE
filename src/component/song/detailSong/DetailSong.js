import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getAllSongByGenresIDAPI, getSongByID, playSong} from "../../api/songService/SongService";
import {getSongLikeQuantityAPI, isLikedAPI, likeClickAPI} from "../../api/LikesService/LikesService";
import {getAllCommentBySongID, getAllCommentBySongIdAPI, sendCommentAPI} from "../../api/commentService/CommentService";

const DetailSong = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    console.log(account)
    const [currentSong, setCurrentSong] = useState({
        genres: {}
    });
    const [songCreateDate, setSongCreateDate] = useState({
        day: '',
        month: '',
        year: '',
    })
    const [like, setLike] = useState({
        account: {},
        song: {}
    });
    const [isLiked, setIsLiked] = useState();
    const [play, setPlay] = useState();
    const [likedQuantity, setLikedQuantity] = useState();
    const [comment, setComment] = useState('');
    const [timeComment, setTimeComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const {id} = useParams();
    const [relatedSongs,setrelatedSongs] = useState([]);

    useEffect(() => {
        getSongByID(id)
            .then(res => {
                setCurrentSong(res.data);
                getSongCreatedDate(res.data.timeCreate)
                setPlay(res.data.plays)
                setLike({
                    account: account,
                    song: res.data
                });
            })
            .catch(error => {
                console.log(error);
            })
        getLikeQuantity();
        getAllCommentBySongID(id)
        getAllSongByGenres();
    }, [])

    const checkLike = () => {
        if (like.account.name!=null && like.song.nameSong!=null) {
            isLikedAPI(like).then(res => {
                setIsLiked(res.data)
            })
        } else {
            console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.");
        }
    }

    useEffect(() => {
        if (like.account && like.song) {
            checkLike();
        }
    }, [like.account, like.song]);

    const getLikeQuantity = () => {
        getSongLikeQuantityAPI(id).then(res => {
            if (res.data != null) {
                setLikedQuantity(res.data);
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    const getAllSongByGenres = () => {
        getAllSongByGenresIDAPI(id).then(res=>{
            if(res.data !=null){
                setrelatedSongs(res.data);
            }
        })
    }

    const likeClick = () => {
        if(account!==null) {
            if (like.account != null && like.song != null) {
                likeClickAPI(like).then(res => {
                    setIsLiked(res.data)
                    getLikeQuantity();
                })
            } else {
                console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.");
            }
        }else {
            navigate("/login")
        }
    }
    const getSongCreatedDate = (songCreateDate) => {
        let date = new Date(songCreateDate);
        const songDateCreateObj = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
        if ((songDateCreateObj.day) < 10) songDateCreateObj.day = '0' + songDateCreateObj.day;
        setSongCreateDate(songDateCreateObj);
    }

    const played = async () => {
        const res = await playSong(id)
        setPlay(res.data)
    }

    if (currentSong.nameSong == null || currentSong.nameSinger == null) {
    } else {
        document.querySelector('[data-amplitude-song-info="name"]').textContent = currentSong.nameSong;
        document.querySelector('[data-amplitude-song-info="artist"]').textContent = currentSong.nameSinger;
        document.querySelector('[data-amplitude-song-info="cover_art_url"]').setAttribute("src", currentSong.imgSong)
    }


    const handleInputComment = (e) => {
        setComment(e.target.value);
    }


    const handleSubmitComment = (e) => {
        e.preventDefault();
        const commentData = {
            account: like.account,
            song: like.song,
            content: comment
        }
        if(account==null){
            // toast.error('Bạn cần đăng nhập trước khi bình luận!');
           navigate("/login")
        }else{
            sendCommentAPI(commentData).then(res => {
                getAllCommentBySongID(id)
            })
            setComment('');
        }

    }


    const getAllCommentBySongID = (id) => {
        getAllCommentBySongIdAPI(id).then(res => {
            setAllComments(res.data);
        })
    }

    return (
        <div>
            <div id="wrapper">
                {console.log(currentSong)}

                <aside id="sidebar">
                    <div className="sidebar-head d-flex align-items-center justify-content-between"><a href="index.html"
                                                                                                       className="brand external"><img
                        src="images/logos/logo.svg" alt="Listen app"/> </a><a href="javascript:void(0);" role="button"
                                                                              className="sidebar-toggler"
                                                                              aria-label="Sidebar toggler">
                        <div className="d-none d-lg-block"><i className="ri-menu-3-line sidebar-menu-1"></i> <i
                            className="ri-menu-line sidebar-menu-2"></i></div>
                        <i className="ri-menu-fold-line d-lg-none"></i></a></div>
                    <div className="sidebar-body" data-scroll="true">
                        <nav className="navbar d-block p-0">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a href="home.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-home-4-line fs-5"></i> <span className="ps-3">Home</span></a></li>
                                <li className="nav-item"><a href="genres.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-disc-line fs-5"></i> <span className="ps-3">Genres</span></a></li>
                                <li className="nav-item"><a href="music.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-music-2-line fs-5"></i> <span className="ps-3">Free Music</span></a>
                                </li>
                                <li className="nav-item"><a href="albums.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-album-line fs-5"></i> <span className="ps-3">Albums</span></a></li>
                                <li className="nav-item"><a href="artists.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-mic-line fs-5"></i> <span className="ps-3">Artists</span></a></li>
                                <li className="nav-item"><a href="stations.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-radio-2-line fs-5"></i> <span className="ps-3">Stations</span></a>
                                </li>
                                <li className="nav-item nav-item--head"><span
                                    className="nav-item--head__text">Music</span> <span
                                    className="nav-item--head__dots">...</span></li>
                                <li className="nav-item"><a href="analytics.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-pie-chart-line fs-5"></i> <span className="ps-3">Analytics</span></a>
                                </li>
                                <li className="nav-item"><a href="favorites.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-heart-line fs-5"></i> <span className="ps-3">Favorites</span></a></li>
                                <li className="nav-item"><a href="history.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-history-line fs-5"></i> <span className="ps-3">History</span></a></li>
                                <li className="nav-item nav-item--head"><span
                                    className="nav-item--head__text">Events</span> <span
                                    className="nav-item--head__dots">...</span></li>
                                <li className="nav-item"><a href="events.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-calendar-event-line fs-5"></i> <span
                                    className="ps-3">Events</span></a></li>
                                <li className="nav-item"><a href="event-details.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-newspaper-line fs-5"></i> <span className="ps-3">Event Details</span></a>
                                </li>
                                <li className="nav-item"><a href="add-event.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-add-circle-line fs-5"></i> <span className="ps-3">Add Event</span></a>
                                </li>
                                <li className="nav-item nav-item--head"><span
                                    className="nav-item--head__text">Extra</span> <span
                                    className="nav-item--head__dots">...</span></li>
                                <li className="nav-item"><a href="404.html"
                                                            className="nav-link d-flex align-items-center external"><i
                                    className="ri-error-warning-line fs-5"></i> <span
                                    className="ps-3">404 Page</span></a></li>
                                <li className="nav-item"><a href="blank.html"
                                                            className="nav-link d-flex align-items-center"><i
                                    className="ri-file-line fs-5"></i> <span className="ps-3">Blank Template</span></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="sidebar-foot"><a href="add-music.html" className="btn btn-primary d-flex">
                        <div className="btn__wrap"><i className="ri-music-fill"></i> <span>Add Music</span></div>
                    </a></div>
                </aside>
                <header id="header">
                    <div className="container">
                        <div className="header-container">
                            <div className="d-flex align-items-center"><a href="javascript:void(0);" role="button"
                                                                          className="header-text sidebar-toggler d-lg-none me-3"
                                                                          aria-label="Sidebar toggler"><i
                                className="ri-menu-3-line"></i></a>
                                <form action="#" id="search_form" className="me-3"><label htmlFor="search_input"><i
                                    className="ri-search-2-line"></i></label> <input type="text"
                                                                                     placeholder="Type anything to get result..."
                                                                                     id="search_input"
                                                                                     className="form-control form-control-sm"/>
                                </form>
                                <div id="search_results" className="search pb-3">
                                    <div className="search__head">
                                        <div className="search__head__filter">
                                            <button type="button"
                                                    className="btn btn-sm btn-light-primary active">Trending
                                            </button>
                                            <button type="button" className="btn btn-sm btn-light-primary">Artists
                                            </button>
                                            <button type="button" className="btn btn-sm btn-light-primary">Songs
                                            </button>
                                            <button type="button" className="btn btn-sm btn-light-primary">Albums
                                            </button>
                                        </div>
                                    </div>
                                    <div className="search__body" data-scroll="true">
                                        <div className="mb-4">
                                            <div
                                                className="d-flex align-items-center justify-content-between mb-3"><span
                                                className="search__title">Artists</span> <a href="artists.html"
                                                                                            className="btn btn-link">View
                                                All</a></div>
                                            <div className="row g-4 list">
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="artist-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/large/5.jpg" alt="Jina Moore"/></a>
                                                        <div className="list__content"><a href="artist-details.html"
                                                                                          className="list__title text-truncate">Jina
                                                            Moore</a></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="artist-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/large/6.jpg" alt="Rasomi Pelina"/></a>
                                                        <div className="list__content"><a href="artist-details.html"
                                                                                          className="list__title text-truncate">Rasomi
                                                            Pelina</a></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="artist-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/large/7.jpg" alt="Pimila Holliwy"/></a>
                                                        <div className="list__content"><a href="artist-details.html"
                                                                                          className="list__title text-truncate">Pimila
                                                            Holliwy</a></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="artist-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/large/8.jpg" alt="Jennings"/></a>
                                                        <div className="list__content"><a href="artist-details.html"
                                                                                          className="list__title text-truncate">
                                                            {currentSong.nameSinger}
                                                        </a></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div
                                                className="d-flex align-items-center justify-content-between mb-3"><span
                                                className="search__title">Songs</span> <a href="songs.html"
                                                                                          className="btn btn-link">View
                                                All</a></div>
                                            <div className="row g-4 list">
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="song-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/6.jpg" alt="Hey not me"/></a>
                                                        <div className="list__content"><a href="song-details.html"
                                                                                          className="list__title text-truncate">Hey
                                                            not
                                                            me</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Rasomi
                                                                Pelina</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="song-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/7.jpg" alt="Deep inside"/></a>
                                                        <div className="list__content"><a href="song-details.html"
                                                                                          className="list__title text-truncate">Deep
                                                            inside</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Pimila
                                                                Holliwy</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="song-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/8.jpg" alt="Sadness"/></a>
                                                        <div className="list__content"><a href="song-details.html"
                                                                                          className="list__title text-truncate">Sadness</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">{currentSong.nameSinger}</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="song-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/9.jpg" alt="Electric wave"/></a>
                                                        <div className="list__content"><a href="song-details.html"
                                                                                          className="list__title text-truncate">Electric
                                                            wave</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Lenisa
                                                                Gory</a></p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className="d-flex align-items-center justify-content-between mb-3"><span
                                                className="search__title">Albums</span> <a href="albums.html"
                                                                                           className="btn btn-link">View
                                                All</a></div>
                                            <div className="row g-4 list">
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="album-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/1.jpg" alt="Mummy"/></a>
                                                        <div className="list__content"><a href="album-details.html"
                                                                                          className="list__title text-truncate">Mummy</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Arebica
                                                                Luna</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="album-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/2.jpg" alt="Hot shot"/></a>
                                                        <div className="list__content"><a href="album-details.html"
                                                                                          className="list__title text-truncate">Hot
                                                            shot</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Gerrina
                                                                Linda</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="album-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/3.jpg" alt="Own way"/></a>
                                                        <div className="list__content"><a href="album-details.html"
                                                                                          className="list__title text-truncate">Own
                                                            way</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Zunira
                                                                Willy & Nutty Nina</a></p></div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-md-4 col-sm-6">
                                                    <div className="list__item"><a href="album-details.html"
                                                                                   className="list__cover"><img
                                                        src="images/cover/small/4.jpg" alt="Say yes"/></a>
                                                        <div className="list__content"><a href="album-details.html"
                                                                                          className="list__title text-truncate">Say
                                                            yes</a>
                                                            <p className="list__subtitle text-truncate"><a
                                                                href="artist-details.html">Johnny
                                                                Marro</a></p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown"><a href="javascript:void(0);"
                                                                 className="header-text d-flex align-items-center"
                                                                 role="button"
                                                                 id="language_menu" data-bs-toggle="dropdown"
                                                                 data-bs-auto-close="outside" aria-expanded="false"><i
                                        className="ri-earth-line fs-5"></i> <span
                                        className="d-none d-md-block ms-1">Language</span></a>
                                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                                             aria-labelledby="language_menu">
                                            <div className="py-2 px-4"><span className="d-block fw-bold">What music do you like?</span>
                                                <p>Select languages you want to listen.</p></div>
                                            <div className="dropdown-divider"></div>
                                            <div className="d-flex flex-wrap py-2">
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_1"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_1">Hindi</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_2"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_2">Punjabi</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_3"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_3">Tamil</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_4"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_4">Bengali</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_5"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_5">Kannada</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_6"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_6">Gujarati</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_7"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_7">Urdu</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_8"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_8">English</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_9"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_9">Telugu</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_10"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_10">Bhojpuri</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_11"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_11">Malayalam</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_12"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_12">Marathi</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_13"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_13">Haryanvi</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_14"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_14">Rajasthani</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_15"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_15">Assamese</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_16"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        htmlFor="lang_16">Odia</label></div>
                                                </div>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <div className="py-2 px-4">
                                                <button type="button"
                                                        className="btn btn-primary w-100 justify-content-center">Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown ms-3 ms-sm-4"><a href="javascript:void(0);"
                                                                              className="avatar header-text"
                                                                              role="button" id="user_menu"
                                                                              data-bs-toggle="dropdown"
                                                                              aria-expanded="false">
                                        <div className="avatar__image"><img src="images/users/thumb.jpg" alt="user"/>
                                        </div>
                                        <span className="ps-2 d-none d-sm-block">Androws</span></a>
                                        <ul className="dropdown-menu dropdown-menu-md dropdown-menu-end"
                                            aria-labelledby="user_menu">
                                            <li>
                                                <div className="py-2 px-3 avatar avatar--lg">
                                                    <div className="avatar__image"><img src="images/users/thumb.jpg"
                                                                                        alt="user"/></div>
                                                    <div className="avatar__content"><span className="avatar__title">Androws Kinny</span>
                                                        <span className="avatar__subtitle">Artist</span></div>
                                                </div>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li><a className="dropdown-item d-flex align-items-center"
                                                   href="profile.html"><i
                                                className="ri-user-3-line fs-5"></i> <span
                                                className="ps-2">Profile</span></a></li>
                                            <li><a className="dropdown-item d-flex align-items-center"
                                                   href="favorites.html"><i
                                                className="ri-heart-line fs-5"></i> <span
                                                className="ps-2">Favorites</span></a></li>
                                            <li><a className="dropdown-item d-flex align-items-center"
                                                   href="settings.html"><i
                                                className="ri-settings-line fs-5"></i> <span
                                                className="ps-2">Settings</span></a></li>
                                            <li><a className="dropdown-item d-flex align-items-center" href="plan.html"><i
                                                className="ri-money-dollar-circle-line fs-5"></i> <span
                                                className="ps-2">Plan</span></a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li><a
                                                className="dropdown-item d-flex align-items-center external text-danger"
                                                href="index.html"><i className="ri-logout-circle-line fs-5"></i> <span
                                                className="ps-2">Logout</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="row" data-song-id={currentSong.id} data-song-name={currentSong.nameSong}
                                 data-song-artist={currentSong.nameSinger}
                                 data-song-album="Sadness" data-song-url={currentSong.pathSong}
                                 data-song-cover="images/cover/small/8.jpg">
                                <div className="col-xl-3 col-md-4">

                                    <div className="cover cover--round">
                                        <div className="cover__image"><img src={currentSong.imgSong}
                                                                           alt="Treasure face" style={{marginLeft:"30px",marginTop:"10px"}}/></div>
                                    </div>

                                </div>
                                <div className="col-1 d-none d-xl-block"></div>
                                <div className="col-md-8 mt-5 mt-md-0">
                                    <div className="d-flex flex-wrap mb-2"><span
                                        className="text-dark fs-4 fw-semi-bold pe-2">{currentSong && currentSong.nameSong}</span>
                                        <div className="dropstart d-inline-flex ms-auto"><a className="dropdown-link"
                                                                                            href="javascript:void(0);"
                                                                                            role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-label="Cover options"
                                                                                            aria-expanded="false"><i
                                            className="ri-more-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-playlist-id="8">Add to playlist</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-queue-id="8">Add to queue</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-next-id="8">Next to play</a></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a></li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-play-id="8">Play</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className="info-list info-list--dotted mb-3">
                                        <li>Thể loại: {currentSong.genres.name}</li>
                                        <li>Đăng ngày: {
                                            songCreateDate.day + '-' + songCreateDate.month + '-' + songCreateDate.year}
                                        </li>
                                    </ul>
                                    <div className="mb-4"><p className="mb-2">Người đăng: <span
                                        className="text-dark fw-medium">{currentSong.accountName}</span></p>
                                        <p className="mb-2">Ca sỹ: <span className="text-dark fw-medium">
                                           {currentSong && currentSong.nameSinger}
                                            {currentSong.auth==true &&
                                            <i className="fa-sharp fa-solid fa-circle-check" style={{color: "#005eff",marginLeft:"5px"}}></i>
                                            }
                                        </span>
                                        </p>
                                    </div>
                                    <ul className="info-list mb-5">
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <button type="button" id="play_all"
                                                        className="btn btn-icon btn-primary rounded-pill"
                                                        data-play-id={currentSong.id} onClick={() => played()}><i
                                                    className="ri-play-fill icon-play"></i> <i
                                                    className="ri-pause-fill icon-pause"></i></button>
                                                <span className="ps-2 fw-semi-bold">{play}</span></div>
                                        </li>
                                        <li>
                                            {isLiked == 1 ? (<a href="javascript:void(0);" role="button"
                                                                className="text-dark d-flex align-items-center"
                                                                aria-label="Favorite" data-favorite-id="1">

                                                {/*<i className="ri-heart-line heart-empty text-danger"*/}
                                                {/*   onClick={likeClick}></i>*/}
                                                <i className="fa-sharp fa-solid fa-heart" style={{color: "#ff0000", fontSize: "24px"}} onClick={likeClick}></i>
                                                <i className="ri-heart-fill heart-fill"></i> <span
                                                className="ps-2 fw-medium">{
                                                likedQuantity != null ? likedQuantity : ''
                                            }</span></a>) : (<a href="javascript:void(0);" role="button"
                                                                className="text-dark d-flex align-items-center"
                                                                aria-label="Favorite" data-favorite-id="1"
                                                                onClick={likeClick}>

                                                <i className="ri-heart-line heart-empty"></i>
                                                <i className="ri-heart-fill heart-fill"></i> <span
                                                className="ps-2 fw-medium">{
                                                likedQuantity != null ? likedQuantity : ''
                                            }</span></a>)}

                                        </li>
                                        <li><a href="javascript:void(0);" role="button"
                                               className="text-dark d-flex align-items-center"
                                               aria-label="Download"><i className="ri-download-2-line"></i> <span
                                            className="ps-2 fw-medium">24</span></a></li>
                                        <li><span className="text-dark d-flex align-items-center"><i
                                            className="ri-star-fill text-warning"></i> <span
                                            className="ps-2 fw-medium">4.5</span></span></li>
                                    </ul>
                                    <div className="mt-2"><span
                                        className="d-block text-dark fs-6 fw-semi-bold mb-3">Mô tả</span>
                                       <p dangerouslySetInnerHTML={{__html:currentSong.description}}></p> </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Related <span
                                className="text-primary">Songs</span></h3></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        {relatedSongs.map((rs)=>{
                                            return(
                                                <div className="swiper-slide" key={rs.id}>

                                                        <div className="cover cover--round" data-song-id={rs.id}
                                                             data-song-name={rs.nameSong}
                                                             data-song-artist="Arebica Luna" data-song-album="Mummy"
                                                             data-song-url={rs.pathSong}
                                                             data-song-cover={rs.pathSong}>
                                                            <div className="cover__head">
                                                                <ul className="cover__label d-flex">
                                                                    <li><span className="badge rounded-pill bg-danger"><i
                                                                        className="ri-heart-fill"></i></span>
                                                                    </li>
                                                                </ul>
                                                                <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                                    className="dropdown-link" href="javascript:void(0);"
                                                                    role="button"
                                                                    data-bs-toggle="dropdown" aria-label="Cover options"
                                                                    aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                                    <ul className="dropdown-menu dropdown-menu-sm">
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                                               role="button"
                                                                               data-favorite-id="1">Favorite</a></li>
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
                                                                               role="button">Share</a>
                                                                        </li>
                                                                        <li className="dropdown-divider"></li>
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                                               role="button"
                                                                               data-play-id="1">Play</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="cover__image"><img src={rs.imgSong}
                                                                                               alt="I love you mummy" style={{width:"180px",height:"180px"}}/>
                                                                <button type="button"
                                                                        className="btn btn-play btn-default btn-icon rounded-pill"
                                                                        data-play-id={rs.id}><i className="ri-play-fill icon-play"/> <i
                                                                    className="ri-pause-fill icon-pause"/></button>
                                                            </div>
                                                            <div className="cover__foot"><a href="song-details.html"
                                                                                            className="cover__title text-truncate">{rs.nameSong}</a>
                                                                <p className="cover__subtitle text-truncate"><a
                                                                    href="artist-details.html">{rs.nameSinger}</a></p></div>
                                                        </div>


                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="swiper-button-prev btn-default rounded-pill"></div>
                                <div className="swiper-button-next btn-default rounded-pill"></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Bình luận:</h3></div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <form action="#" className="row mb-5" >
                                        <div className="col-12 mb-4"><textarea name="comment" id="comment" cols="30"
                                                                               rows="4"
                                                                               className="form-control"
                                                                               value={comment}
                                                                               placeholder="Hãy để lại bình luận cho bài hát"
                                                                               onChange={handleInputComment}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button type="button" className="btn btn-primary"
                                                    style={{minWidth: "160px"}} onClick={handleSubmitComment}>Submit
                                            </button>
                                        </div>
                                    </form>
                                    {allComments.map((cm) => {
                                        return (
                                            <div className="avatar avatar--lg align-items-start" key={cm.id}>
                                                <div className="avatar__image"><img src={cm.account.img} alt="user"/>
                                                </div>
                                                <div className="avatar__content"><span
                                                    className="avatar__title mb-1">{cm.account.name}</span>
                                                    <span
                                                        className="avatar__subtitle mb-2">{cm.timeComment}</span>
                                                    <div className="text-warning d-flex mb-1"><i
                                                        className="ri-star-s-fill"></i>
                                                        <i
                                                            className="ri-star-s-fill"></i> <i
                                                            className="ri-star-s-fill"></i>
                                                        <i
                                                            className="ri-star-s-fill"></i></div>
                                                    <p>{cm.content}</p><a href="javascript:void(0);"
                                                                          className="btn btn-link">
                                                        <div className="btn__wrap"><i
                                                            className="ri-reply-line fs-6"></i>
                                                            <span>Reply</span></div>
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="col-xl-4"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="player">
                <div className="container">
                    <div className="player-container">
                        <div className="player-progress">
                            <progress className="amplitude-buffered-progress player-progress__bar" value="0"></progress>
                            <progress className="amplitude-song-played-progress player-progress__bar"></progress>
                            <input type="range" className="amplitude-song-slider player-progress__slider"
                                   aria-label="Progress slider"/>
                        </div>
                        <div className="cover d-flex align-items-center">
                            <div className="cover__image"><img data-amplitude-song-info="cover_art_url"
                                                               src="images/cover/small/1.jpg"
                                                               alt="" style={{height:"100%"}}/></div>
                            <div className="cover__content ps-3 d-none d-sm-block"><a href="song-details.html"
                                                                                      className="cover__title text-truncate"
                                                                                      data-amplitude-song-info="name"></a>
                                <a href="artist-details.html" className="cover__subtitle text-truncate"
                                    data-amplitude-song-info="artist"></a></div>
                        </div>
                        <div className="player-control">
                            <button type="button" className="amplitude-repeat btn btn-icon me-4 d-none d-md-block"
                                    aria-label="Repeat">
                                <i className="ri-repeat-2-fill fs-5"></i></button>
                            <button type="button" className="amplitude-prev btn btn-icon" aria-label="Backward"><i
                                className="ri-skip-back-mini-fill"></i></button>
                            <button type="button" className="amplitude-play-pause btn btn-icon btn-default rounded-pill"
                                    aria-label="Play pause"><i className="ri-play-fill icon-play"></i> <i
                                className="ri-pause-fill icon-pause"></i></button>
                            <button type="button" className="amplitude-next btn btn-icon" aria-label="Forward"><i
                                className="ri-skip-forward-mini-fill"></i></button>
                            <button type="button"
                                    className="amplitude-shuffle amplitude-shuffle-off btn btn-icon ms-4 d-none d-md-block"
                                    aria-label="Shuffle"><i className="ri-shuffle-fill fs-5"></i></button>
                        </div>
                        <div className="player-info">
                            <div className="me-4 d-none d-xl-block"><span
                                className="amplitude-current-minutes"></span>:<span
                                className="amplitude-current-seconds"></span> / <span
                                className="amplitude-duration-minutes"></span>:<span
                                className="amplitude-duration-seconds"></span>
                            </div>
                            <div className="player-volume dropdown d-none d-md-block">
                                <button className="btn btn-icon" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                        aria-label="Volume" aria-expanded="false"><i
                                    className="ri-volume-mute-fill fs-5 d-none"></i> <i
                                    className="ri-volume-down-fill fs-5"></i> <i
                                    className="ri-volume-up-fill fs-5 d-none"></i></button>
                                <div className="dropdown-menu prevent-click"><input type="range"
                                                                                    className="amplitude-volume-slider"
                                                                                    value="50" min="0" max="100"
                                                                                    aria-label="Volume slider"/></div>
                            </div>
                            <div className="dropstart d-none d-md-block">
                                <button className="btn btn-icon" data-bs-toggle="dropdown" aria-label="Song options"
                                        aria-expanded="false"><i className="ri-more-2-fill fs-5"></i></button>
                                <ul className="dropdown-menu dropdown-menu-sm" id="player_options">
                                    <li><a className="dropdown-item" href="javascript:void(0);" role="button"
                                           data-favorite-id="1">Favorite</a>
                                    </li>
                                    <li><a className="dropdown-item" href="javascript:void(0);" role="button"
                                           data-playlist-id="1">Add
                                        to playlist</a></li>
                                    <li><a className="dropdown-item" href="audio/ringtone-1.mp3" download>Download</a>
                                    </li>
                                    <li><a className="dropdown-item" href="javascript:void(0);" role="button">Share</a>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li><a className="dropdown-item" href="song-details.html">View details</a></li>
                                </ul>
                            </div>
                            <div className="playlist dropstart me-3">
                                <button className="btn btn-icon" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                        aria-label="Playlist" aria-expanded="false"><i
                                    className="ri-play-list-fill fs-5"></i></button>
                                <div className="dropdown-menu playlist__dropdown">
                                    <div className="playlist__head d-flex align-items-center justify-content-between">
                                        <h6 className="mb-0">
                                            Next Lineup</h6><a href="javascript:void(0);" role="button"
                                                               id="clear_playlist"
                                                               className="btn btn-link">Clear</a></div>
                                    <div id="playlist" className="list playlist__body" data-scroll="true">
                                        <div className="col-sm-8 col-10 mx-auto mt-5 text-center"><i
                                            className="ri-music-2-line mb-3"></i>
                                            <p>No songs, album or playlist are added on lineup.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailSong;