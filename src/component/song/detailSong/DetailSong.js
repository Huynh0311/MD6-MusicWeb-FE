import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {getAllSongByGenresIDAPI, getSongByID, playSong} from "../../api/songService/SongService";
import {getSongLikeQuantityAPI, isLikedAPI, likeClickAPI} from "../../api/LikesService/LikesService";
import {getAllCommentBySongID, getAllCommentBySongIdAPI, sendCommentAPI} from "../../api/commentService/CommentService";

const DetailSong = () => {
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
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
        if (like.account && like.song) {
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
        if (like.account != null && like.song != null) {
            likeClickAPI(like).then(res => {
                setIsLiked(res.data)
                getLikeQuantity();
            })
        } else {
            console.log("Không có dữ liệu hợp lệ để gửi yêu cầu.");
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
        setSongCreateDate(songDateCreateObj)
    }

    const played = async () => {
        const res = await playSong(id)
        setPlay(res.data)
    }

    if (currentSong.nameSong == null || currentSong.singerName == null) {
    } else {
        document.querySelector('[data-amplitude-song-info="name"]').textContent = currentSong.nameSong;
        document.querySelector('[data-amplitude-song-info="artist"]').textContent = currentSong.singerName;
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
        sendCommentAPI(commentData).then(res => {
            getAllCommentBySongID(id)
        })
    }


    const getAllCommentBySongID = (id) => {
        getAllCommentBySongIdAPI(id).then(res => {
            setAllComments(res.data);
        })
    }


    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="row" data-song-id={currentSong.id} data-song-name={currentSong.nameSong}
                                 data-song-artist="Karen Jennings"
                                 data-song-album="Sadness" data-song-url={currentSong.pathSong}
                                 data-song-cover="images/cover/small/8.jpg">
                                <div className="col-xl-3 col-md-4">

                                    <div className="cover cover--round">
                                        <div className="cover__image"><img src={currentSong.imgSong}
                                                                           alt="Treasure face"/></div>
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
                                        <li>{currentSong.genres.name}</li>
                                        <li>{
                                            songCreateDate.day + '-' + songCreateDate.month + '-' + songCreateDate.year}
                                        </li>
                                    </ul>
                                    <div className="mb-4"><p className="mb-2">Upload by: <span
                                        className="text-dark fw-medium">{currentSong.accountName}</span></p>
                                        <p className="mb-2">Singer: <span className="text-dark fw-medium">
                                           {currentSong && currentSong.singerName && currentSong.singerName.join(', ')}
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

                                                <i className="ri-heart-line heart-empty text-danger"
                                                   onClick={likeClick}></i>
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
                                                                                               alt="I love you mummy" style={{width:"100%",height:"200px"}}/>
                                                                <button type="button"
                                                                        className="btn btn-play btn-default btn-icon rounded-pill"
                                                                        data-play-id={rs.id}><i className="ri-play-fill icon-play"/> <i
                                                                    className="ri-pause-fill icon-pause"/></button>
                                                            </div>
                                                            <div className="cover__foot"><a href="song-details.html"
                                                                                            className="cover__title text-truncate">{rs.nameSong}</a>
                                                                <p className="cover__subtitle text-truncate"><a
                                                                    href="artist-details.html">{rs.singerName.join(', ')}</a></p></div>
                                                        </div>


                                                </div>
                                            )
                                        })}


                                        {/*<div className="swiper-slide">*/}
                                        {/*    <div className="cover cover--round" data-song-id="2"*/}
                                        {/*         data-song-name="Shack your butty"*/}
                                        {/*         data-song-artist="Gerrina Linda" data-song-album="Hot shot"*/}
                                        {/*         data-song-url="audio/ringtone-2.mp3"*/}
                                        {/*         data-song-cover="images/cover/small/2.jpg">*/}
                                        {/*        <div className="cover__head">*/}
                                        {/*            <ul className="cover__label d-flex">*/}
                                        {/*                <li><span className="badge rounded-pill bg-info"><i*/}
                                        {/*                    className="ri-vip-crown-fill"></i></span></li>*/}
                                        {/*            </ul>*/}
                                        {/*            <div className="cover__options dropstart d-inline-flex ms-auto"><a*/}
                                        {/*                className="dropdown-link" href="javascript:void(0);"*/}
                                        {/*                role="button"*/}
                                        {/*                data-bs-toggle="dropdown" aria-label="Cover options"*/}
                                        {/*                aria-expanded="false"><i className="ri-more-2-fill"></i></a>*/}
                                        {/*                <ul className="dropdown-menu dropdown-menu-sm">*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-favorite-id="2">Favorite</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-playlist-id="2">Add to playlist</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-queue-id="2">Add to queue</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-next-id="2">Next to play</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button">Share</a>*/}
                                        {/*                    </li>*/}
                                        {/*                    <li className="dropdown-divider"></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-play-id="2">Play</a></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__image"><img src="images/cover/large/2.jpg"*/}
                                        {/*                                           alt="Shack your butty"/>*/}
                                        {/*            <button type="button"*/}
                                        {/*                    className="btn btn-play btn-default btn-icon rounded-pill"*/}
                                        {/*                    data-play-id="2"><i className="ri-play-fill icon-play"></i>*/}
                                        {/*                <i*/}
                                        {/*                    className="ri-pause-fill icon-pause"></i></button>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__foot"><a href="song-details.html"*/}
                                        {/*                                        className="cover__title text-truncate">Shack*/}
                                        {/*            your butty</a>*/}
                                        {/*            <p className="cover__subtitle text-truncate"><a*/}
                                        {/*                href="artist-details.html">Gerrina*/}
                                        {/*                Linda</a></p></div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="swiper-slide">*/}
                                        {/*    <div className="cover cover--round" data-song-id="3"*/}
                                        {/*         data-song-name="Do it your way(Female)"*/}
                                        {/*         data-song-artist="Zunira Willy & Nutty Nina" data-song-album="Own way"*/}
                                        {/*         data-song-url="audio/ringtone-3.mp3"*/}
                                        {/*         data-song-cover="images/cover/small/3.jpg">*/}
                                        {/*        <div className="cover__head">*/}
                                        {/*            <div className="cover__options dropstart d-inline-flex ms-auto"><a*/}
                                        {/*                className="dropdown-link" href="javascript:void(0);"*/}
                                        {/*                role="button"*/}
                                        {/*                data-bs-toggle="dropdown" aria-label="Cover options"*/}
                                        {/*                aria-expanded="false"><i className="ri-more-2-fill"></i></a>*/}
                                        {/*                <ul className="dropdown-menu dropdown-menu-sm">*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-favorite-id="3">Favorite</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-playlist-id="3">Add to playlist</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-queue-id="3">Add to queue</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-next-id="3">Next to play</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button">Share</a>*/}
                                        {/*                    </li>*/}
                                        {/*                    <li className="dropdown-divider"></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-play-id="3">Play</a></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__image"><img src="images/cover/large/3.jpg"*/}
                                        {/*                                           alt="Do it your way(Female)"/>*/}
                                        {/*            <button type="button"*/}
                                        {/*                    className="btn btn-play btn-default btn-icon rounded-pill"*/}
                                        {/*                    data-play-id="3"><i className="ri-play-fill icon-play"></i>*/}
                                        {/*                <i*/}
                                        {/*                    className="ri-pause-fill icon-pause"/></button>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__foot"><a href="song-details.html"*/}
                                        {/*                                        className="cover__title text-truncate">Do*/}
                                        {/*            it your*/}
                                        {/*            way(Female)</a>*/}
                                        {/*            <p className="cover__subtitle text-truncate"><a*/}
                                        {/*                href="artist-details.html">Zunira*/}
                                        {/*                Willy</a>, <a href="artist-details.html">Nutty Nina</a></p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="swiper-slide">*/}
                                        {/*    <div className="cover cover--round" data-song-id="4"*/}
                                        {/*         data-song-name="Say yes"*/}
                                        {/*         data-song-artist="Johnny Marro" data-song-album="Say yes"*/}
                                        {/*         data-song-url="audio/ringtone-4.mp3"*/}
                                        {/*         data-song-cover="images/cover/small/4.jpg">*/}
                                        {/*        <div className="cover__head">*/}
                                        {/*            <ul className="cover__label d-flex">*/}
                                        {/*                <li><span className="badge rounded-pill bg-danger"><i*/}
                                        {/*                    className="ri-heart-fill"></i></span>*/}
                                        {/*                </li>*/}
                                        {/*                <li><span className="badge rounded-pill bg-info"><i*/}
                                        {/*                    className="ri-vip-crown-fill"></i></span></li>*/}
                                        {/*            </ul>*/}
                                        {/*            <div className="cover__options dropstart d-inline-flex ms-auto"><a*/}
                                        {/*                className="dropdown-link" href="javascript:void(0);"*/}
                                        {/*                role="button"*/}
                                        {/*                data-bs-toggle="dropdown" aria-label="Cover options"*/}
                                        {/*                aria-expanded="false"><i className="ri-more-2-fill"></i></a>*/}
                                        {/*                <ul className="dropdown-menu dropdown-menu-sm">*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-favorite-id="4">Favorite</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-playlist-id="4">Add to playlist</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-queue-id="4">Add to queue</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-next-id="4">Next to play</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button">Share</a>*/}
                                        {/*                    </li>*/}
                                        {/*                    <li className="dropdown-divider"></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-play-id="4">Play</a></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__image"><img src="images/cover/large/4.jpg"*/}
                                        {/*                                           alt="Say yes"/>*/}
                                        {/*            <button type="button"*/}
                                        {/*                    className="btn btn-play btn-default btn-icon rounded-pill"*/}
                                        {/*                    data-play-id="4"><i className="ri-play-fill icon-play"/> <i*/}
                                        {/*                className="ri-pause-fill icon-pause"/></button>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__foot"><a href="song-details.html"*/}
                                        {/*                                        className="cover__title text-truncate">Say*/}
                                        {/*            yes</a>*/}
                                        {/*            <p className="cover__subtitle text-truncate"><a*/}
                                        {/*                href="artist-details.html">Johnny*/}
                                        {/*                Marro</a></p></div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="swiper-slide">*/}
                                        {/*    <div className="cover cover--round" data-song-id="5"*/}
                                        {/*         data-song-name="Where is your letter"*/}
                                        {/*         data-song-artist="Jina Moore & Lenisa Gory" data-song-album="Letter"*/}
                                        {/*         data-song-url="audio/ringtone-5.mp3"*/}
                                        {/*         data-song-cover="images/cover/small/5.jpg">*/}
                                        {/*        <div className="cover__head">*/}
                                        {/*            <ul className="cover__label d-flex">*/}
                                        {/*                <li><span className="badge rounded-pill bg-info"><i*/}
                                        {/*                    className="ri-vip-crown-fill"></i></span></li>*/}
                                        {/*            </ul>*/}
                                        {/*            <div className="cover__options dropstart d-inline-flex ms-auto"><a*/}
                                        {/*                className="dropdown-link" href="javascript:void(0);"*/}
                                        {/*                role="button"*/}
                                        {/*                data-bs-toggle="dropdown" aria-label="Cover options"*/}
                                        {/*                aria-expanded="false"><i className="ri-more-2-fill"></i></a>*/}
                                        {/*                <ul className="dropdown-menu dropdown-menu-sm">*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-favorite-id="5">Favorite</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-playlist-id="5">Add to playlist</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-queue-id="5">Add to queue</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-next-id="5">Next to play</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button">Share</a>*/}
                                        {/*                    </li>*/}
                                        {/*                    <li className="dropdown-divider"></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-play-id="5">Play</a></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__image"><img src="images/cover/large/5.jpg"*/}
                                        {/*                                           alt="Where is your letter"/>*/}
                                        {/*            <button type="button"*/}
                                        {/*                    className="btn btn-play btn-default btn-icon rounded-pill"*/}
                                        {/*                    data-play-id="5"><i className="ri-play-fill icon-play"/> <i*/}
                                        {/*                className="ri-pause-fill icon-pause"/></button>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__foot"><a href="song-details.html"*/}
                                        {/*                                        className="cover__title text-truncate">Where*/}
                                        {/*            is your*/}
                                        {/*            letter</a>*/}
                                        {/*            <p className="cover__subtitle text-truncate"><a*/}
                                        {/*                href="artist-details.html">Jina*/}
                                        {/*                Moore</a>, <a href="artist-details.html">Lenisa Gory</a></p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="swiper-slide">*/}
                                        {/*    <div className="cover cover--round" data-song-id="6"*/}
                                        {/*         data-song-name="Hey not me"*/}
                                        {/*         data-song-artist="Rasomi Pelina" data-song-album="Find soul"*/}
                                        {/*         data-song-url="audio/ringtone-6.mp3"*/}
                                        {/*         data-song-cover="images/cover/small/6.jpg">*/}
                                        {/*        <div className="cover__head">*/}
                                        {/*            <ul className="cover__label d-flex">*/}
                                        {/*                <li><span className="badge rounded-pill bg-info"><i*/}
                                        {/*                    className="ri-vip-crown-fill"></i></span></li>*/}
                                        {/*            </ul>*/}
                                        {/*            <div className="cover__options dropstart d-inline-flex ms-auto"><a*/}
                                        {/*                className="dropdown-link" href="javascript:void(0);"*/}
                                        {/*                role="button"*/}
                                        {/*                data-bs-toggle="dropdown" aria-label="Cover options"*/}
                                        {/*                aria-expanded="false"><i className="ri-more-2-fill"></i></a>*/}
                                        {/*                <ul className="dropdown-menu dropdown-menu-sm">*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-favorite-id="6">Favorite</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-playlist-id="6">Add to playlist</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-queue-id="6">Add to queue</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-next-id="6">Next to play</a></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button">Share</a>*/}
                                        {/*                    </li>*/}
                                        {/*                    <li className="dropdown-divider"></li>*/}
                                        {/*                    <li><a className="dropdown-item" href="javascript:void(0);"*/}
                                        {/*                           role="button"*/}
                                        {/*                           data-play-id="6">Play</a></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__image"><img src="images/cover/large/6.jpg"*/}
                                        {/*                                           alt="Hey not me"/>*/}
                                        {/*            <button type="button"*/}
                                        {/*                    className="btn btn-play btn-default btn-icon rounded-pill"*/}
                                        {/*                    data-play-id="6"><i className="ri-play-fill icon-play"></i>*/}
                                        {/*                <i*/}
                                        {/*                    className="ri-pause-fill icon-pause"></i></button>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="cover__foot"><a href="song-details.html"*/}
                                        {/*                                        className="cover__title text-truncate">Hey*/}
                                        {/*            not me</a>*/}
                                        {/*            <p className="cover__subtitle text-truncate"><a*/}
                                        {/*                href="artist-details.html">Rasomi*/}
                                        {/*                Pelina</a></p></div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="swiper-button-prev btn-default rounded-pill"></div>
                                <div className="swiper-button-next btn-default rounded-pill"></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Comments</h3></div>
                            <div className="row">
                                <div className="col-xl-8">
                                    <form action="#" className="row mb-5" >
                                        {/*<div className="col-12 mb-3 d-flex align-items-center"><span*/}
                                        {/*    className="form-label mb-0">Ratings:</span>*/}
                                        {/*    <div className="ps-2"><select className="form-select" style={{*/}
                                        {/*        minWidth: "100px",*/}
                                        {/*        ariaLabel: "Select ratings"*/}
                                        {/*    }}>*/}
                                        {/*        <option value="1">1</option>*/}
                                        {/*        <option value="2">2</option>*/}
                                        {/*        <option value="3">3</option>*/}
                                        {/*        <option value="4">4</option>*/}
                                        {/*        <option value="5">5</option>*/}
                                        {/*    </select></div>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-6 mb-3"><input type="text" className="form-control"*/}
                                        {/*                                   placeholder="Full name"/>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-6 mb-3"><input type="text" className="form-control"*/}
                                        {/*                                   placeholder="Email ID"/>*/}
                                        {/*</div>*/}
                                        <div className="col-12 mb-4"><textarea name="comment" id="comment" cols="30"
                                                                               rows="4"
                                                                               className="form-control"
                                                                               value={comment}
                                                                               placeholder="Write your comment"
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
                    {/*<footer id="footer">*/}
                    {/*    <div className="container">*/}
                    {/*        <div className="text-center mb-4"><a href="mailto:info@listenapp.com"*/}
                    {/*                                             className="display-5 email">info@listenapp.com</a>*/}
                    {/*        </div>*/}
                    {/*        <div className="app-btn-group pt-2"><a href="#" className="btn btn-lg btn-primary">*/}
                    {/*            <div className="btn__wrap"><i className="ri-google-play-fill"></i> <span*/}
                    {/*                className="ms-2">Google Play</span>*/}
                    {/*            </div>*/}
                    {/*        </a><a href="#" className="btn btn-lg btn-primary">*/}
                    {/*            <div className="btn__wrap"><i className="ri-app-store-fill"></i> <span className="ms-2">App Store</span>*/}
                    {/*            </div>*/}
                    {/*        </a></div>*/}
                    {/*    </div>*/}
                    {/*</footer>*/}
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
                                <a
                                    href="artist-details.html" className="cover__subtitle text-truncate"
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