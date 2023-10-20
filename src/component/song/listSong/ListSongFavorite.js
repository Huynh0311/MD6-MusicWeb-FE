import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {findListSongFavorite} from "../../api/songService/SongService";

const ListSongFavorite = () => {

    const [listSong, setListSong] = useState([]);

    const findById = () => {
        findListSongFavorite()
            .then((list) => {
                setListSong(list.data);
            })
            .catch((error) => {
                toast.error('Lỗi không có dữ liệu');
            });
    }

    useEffect(() => {
        findById()
    }, []);

    return (
        <div>
            <main id="page_content">
                <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                <div className="under-hero container">
                    <div className="section">
                        <div className="section__head"><h3 className="mb-0">Favorite Songs</h3></div>
                        <div className="list list--order">
                            <div className="row">
                                {listSong.map((song) => (
                                    <div className="list__item" data-song-id="" data-song-name={song.nameSong}
                                         data-song-artist={song.nameSinger} data-song-album="Mummy"
                                         data-song-url={song.pathSong}
                                         data-song-cover={song.imgSong}>
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
                                            <li>
                                                <a href="javascript:void(0);" role="button"
                                                   className="d-inline-flex active"
                                                   aria-label="Favorite" data-favorite-id="1"><i
                                                    className="ri-heart-line heart-empty"></i>
                                                    <i className="ri-heart-fill heart-fill"></i>
                                                </a>
                                            </li>
                                            <li className="dropstart d-inline-flex">
                                                <a className="dropdown-link"
                                                   href="javascript:void(0);"
                                                   role="button"
                                                   data-bs-toggle="dropdown"
                                                   aria-label="Cover options"
                                                   aria-expanded="false"><i
                                                    className="ri-more-fill">

                                                </i>
                                                </a>
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
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section__head"><h3 className="mb-0">Albums</h3></div>
                        <div className="row g-4">
                            <div className="col-6 col-xl-2 col-md-3 col-sm-4">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li><span className="badge rounded-pill bg-danger"><i
                                                className="ri-heart-fill"></i></span>
                                            </li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                            className="dropdown-link"
                                            href="javascript:void(0);"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-label="Cover options"
                                            aria-expanded="false"><i
                                            className="ri-more-2-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-favorite-id="100">Favorite</a></li>
                                                <li><a className="dropdown-item" href="audio/ringtone-1.mp3"
                                                       download>Download</a>
                                                </li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="album-details.html">View
                                                    details</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="album-details.html" className="cover__image"><img
                                        src="images/cover/large/1.jpg"
                                        alt="Mummy"/></a>
                                    <div className="cover__foot"><a href="album-details.html"
                                                                    className="cover__title text-truncate">Mummy</a>
                                        <p className="cover__subtitle text-truncate"><a href="artist-details.html">Arebica
                                            Luna</a>
                                        </p></div>
                                </div>
                            </div>
                            <div className="col-6 col-xl-2 col-md-3 col-sm-4">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li><span className="badge rounded-pill bg-danger"><i
                                                className="ri-heart-fill"></i></span>
                                            </li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                            className="dropdown-link"
                                            href="javascript:void(0);"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-label="Cover options"
                                            aria-expanded="false"><i
                                            className="ri-more-2-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-favorite-id="102">Favorite</a></li>
                                                <li><a className="dropdown-item" href="audio/ringtone-3.mp3"
                                                       download>Download</a>
                                                </li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="album-details.html">View
                                                    details</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="album-details.html" className="cover__image"><img
                                        src="images/cover/large/3.jpg"
                                        alt="Own way"/></a>
                                    <div className="cover__foot"><a href="album-details.html"
                                                                    className="cover__title text-truncate">Own
                                        way</a>
                                        <p className="cover__subtitle text-truncate"><a href="artist-details.html">Zunira
                                            Willy</a>,
                                            <a href="artist-details.html">Nutty Nina</a></p></div>
                                </div>
                            </div>
                            <div className="col-6 col-xl-2 col-md-3 col-sm-4">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li><span className="badge rounded-pill bg-danger"><i
                                                className="ri-heart-fill"></i></span>
                                            </li>
                                            <li><span className="badge rounded-pill bg-info"><i
                                                className="ri-vip-crown-fill"></i></span></li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                            className="dropdown-link"
                                            href="javascript:void(0);"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-label="Cover options"
                                            aria-expanded="false"><i
                                            className="ri-more-2-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-favorite-id="103">Favorite</a></li>
                                                <li><a className="dropdown-item" href="audio/ringtone-4.mp3"
                                                       download>Download</a>
                                                </li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="album-details.html">View
                                                    details</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="album-details.html" className="cover__image"><img
                                        src="images/cover/large/4.jpg"
                                        alt="Say yes"/></a>
                                    <div className="cover__foot"><a href="album-details.html"
                                                                    className="cover__title text-truncate">Say
                                        yes</a>
                                        <p className="cover__subtitle text-truncate"><a href="artist-details.html">Johnny
                                            Marro</a>
                                        </p></div>
                                </div>
                            </div>
                            <div className="col-6 col-xl-2 col-md-3 col-sm-4">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li><span className="badge rounded-pill bg-danger"><i
                                                className="ri-heart-fill"></i></span>
                                            </li>
                                            <li><span className="badge rounded-pill bg-info"><i
                                                className="ri-vip-crown-fill"></i></span></li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                            className="dropdown-link"
                                            href="javascript:void(0);"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-label="Cover options"
                                            aria-expanded="false"><i
                                            className="ri-more-2-fill"></i></a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-favorite-id="105">Favorite</a></li>
                                                <li><a className="dropdown-item" href="audio/ringtone-6.mp3"
                                                       download>Download</a>
                                                </li>
                                                <li><a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li><a className="dropdown-item" href="album-details.html">View
                                                    details</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <a href="album-details.html" className="cover__image"><img
                                        src="images/cover/large/6.jpg"
                                        alt="Find soul"/></a>
                                    <div className="cover__foot"><a href="album-details.html"
                                                                    className="cover__title text-truncate">Find
                                        soul</a>
                                        <p className="cover__subtitle text-truncate"><a href="artist-details.html">Rasomi
                                            Pelina</a>
                                        </p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer id="footer">
                    <div className="container">
                        <div className="text-center mb-4"><a href="mailto:info@listenapp.com"
                                                             className="display-5 email">info@listenapp.com</a>
                        </div>
                        <div className="app-btn-group pt-2"><a href="#" className="btn btn-lg btn-primary">
                            <div className="btn__wrap"><i className="ri-google-play-fill"></i> <span className="ms-2">Google Play</span>
                            </div>
                        </a><a href="#" className="btn btn-lg btn-primary">
                            <div className="btn__wrap"><i className="ri-app-store-fill"></i> <span className="ms-2">App Store</span>
                            </div>
                        </a></div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default ListSongFavorite;