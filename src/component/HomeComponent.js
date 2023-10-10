import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import SongList from "./player/SongList";
import TopSong from "./player/TopSong";
import MusicPlayer from "./player/MusicPlayer";


const HomeComponent = () => {
    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(images/banner/home.jpg"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle"></span>
                                    <h3 className="mb-0">Song <span className="text-primary">List</span></h3></div>
                                <a href="songs.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button"
                                 style={{display: 'flex', flexWrap: 'nowrap'}}>
                                <SongList/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="section col-xl-6">
                                <div className="section__head">
                                    <div className="flex-grow-1"><h3 className="mb-0">Upcoming <span
                                        className="text-primary">Events</span></h3>
                                    </div>
                                    <a href="events.html" className="btn btn-link">Explore More</a></div>
                                <div className="swiper-carousel">
                                    <div className="swiper" data-swiper-slides="2" data-swiper-autoplay="true">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="images/background/horizontal/2.jpg" alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">258 Goff Avenue, MI - USA</span>
                                                    </p><a href="event-details.html" className="cover__title fs-6 mb-3">New
                                                        year 1st
                                                        night with BendiQ Band</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-4.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-5.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">24+</div>
                                                            </div>
                                                            <a href="event-details.html"
                                                               className="btn btn-sm btn-light-primary">Join
                                                                Event</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="images/background/horizontal/3.jpg" alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">2105 Badger Pond Lane, FL - USA</span>
                                                    </p><a href="event-details.html" className="cover__title fs-6 mb-3">Varida
                                                        Meronny
                                                        music band</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">40+</div>
                                                            </div>
                                                            <a href="event-details.html"
                                                               className="btn btn-sm btn-light-primary">Join
                                                                Event</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="images/background/horizontal/1.jpg" alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">2801 Pine Lake Rd, TX - USA</span>
                                                    </p><a href="event-details.html" className="cover__title fs-6 mb-3">Music
                                                        night
                                                        virtual event to welcome new year</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">40+</div>
                                                            </div>
                                                            <a href="event-details.html"
                                                               className="btn btn-sm btn-light-primary">Join
                                                                Event</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-1"></div>
                            <div className="section col-xl-5">
                                <div className="mat-tabs">
                                    <ul className="nav nav-tabs" id="songs_list" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="trending" data-bs-toggle="tab"
                                                    data-bs-target="#trending_pane" type="button" role="tab"
                                                    aria-controls="trending_pane" aria-selected="true">Trending
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content mt-4" id="songs_list_content">
                                    <div className="tab-pane fade show active" id="trending_pane" role="tabpanel"
                                         aria-labelledby="trending" tabIndex="0">
                                        <TopSong/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span className="section__subtitle">New to listen</span>
                                    <h3 className="mb-0">New <span className="text-primary">Releases</span></h3></div>
                                <a href="songs.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="1"
                                                 data-song-name="I love you mummy"
                                                 data-song-artist="Arebica Luna" data-song-album="Mummy"
                                                 data-song-url="audio/ringtone-1.mp3"
                                                 data-song-cover="images/cover/small/1.jpg">
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
                                                <div className="cover__image"><img src="images/cover/large/1.jpg"
                                                                                   alt="I love you Luna"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="1"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="song-details.html"
                                                                                className="cover__title text-truncate">I
                                                    love you mummy</a>
                                                    <p className="cover__subtitle text-truncate"><a
                                                        href="artist-details.html">Arebica
                                                        Luna</a></p></div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="swiper-button-prev btn-default rounded-pill"></div>
                                <div className="swiper-button-next btn-default rounded-pill"></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span className="section__subtitle">Best to listen</span>
                                    <h3 className="mb-0">Featured <span className="text-primary">Artists</span></h3>
                                </div>
                                <a href="artists.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="6" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/1.jpg" alt="Arebica Luna"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Arebica
                                                    Luna</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/2.jpg" alt="Gerrina Linda"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Gerrina
                                                    Linda</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/3.jpg" alt="Zunira Willy"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Zunira
                                                    Willy</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/4.jpg" alt="Johnny Marro"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Johnny
                                                    Marro</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/5.jpg" alt="Jina Moore"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Jina
                                                    Moore</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/6.jpg" alt="Rasomi Pelina"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Rasomi
                                                    Pelina</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/7.jpg" alt="Pimila Holliwy"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Pimila
                                                    Holliwy</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/8.jpg" alt="Karen Jennings"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Karen
                                                    Jennings</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/9.jpg" alt="Lenisa Gory"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Lenisa
                                                    Gory</a></div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="avatar avatar--xxl d-block text-center">
                                                <div className="avatar__image"><a href="artist-details.html"><img
                                                    src="images/cover/large/10.jpg" alt="Nutty Nina"/></a></div>
                                                <a href="artist-details.html" className="avatar__title mt-3">Nutty
                                                    Nina</a></div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle">Trending to listen</span>
                                    <h3 className="mb-0">Top <span className="text-primary">Albums</span></h3></div>
                                <a href="albums.html" className="btn btn-link">View All</a></div>
                            <div className="list list--lg list--order">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/1.jpg" alt="Luna"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Mummy</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Arebica
                                                    Luna</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="100"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="100">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-1.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/2.jpg" alt="Hot shot"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Hot
                                                shot</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Gerrina
                                                    Linda</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="101"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="101">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-2.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/3.jpg" alt="Own way"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Own
                                                way</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Zunira Willy &
                                                    Nutty Nina</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="102"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="102">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-3.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/4.jpg" alt="Say yes"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Say
                                                yes</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Johnny
                                                    Marro</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="103"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="103">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-4.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/5.jpg" alt="Letter"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Letter</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Jina Moore &
                                                    Lenisa Gory</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="104"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="104">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-5.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/6.jpg" alt="Find soul"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Find
                                                soul</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Rasomi
                                                    Pelina</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="105"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="105">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-6.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/7.jpg" alt="Deep inside"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Deep
                                                inside</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Pimila
                                                    Holliwy</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="106"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="106">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-7.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/8.jpg" alt="Sadness"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Sadness</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Karen
                                                    Jennings</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="107"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="107">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-8.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/9.jpg" alt="Electric wave"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Electric
                                                wave</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Lenisa
                                                    Gory</a></p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="108"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="108">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-1.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="list__item"><a href="album-details.html"
                                                                       className="list__cover"><img
                                            src="images/cover/small/10.jpg" alt="Lover soul"/></a>
                                            <div className="list__content"><a href="album-details.html"
                                                                              className="list__title text-truncate">Lover
                                                soul</a>
                                                <p className="list__subtitle text-truncate"><a
                                                    href="artist-details.html">Nutty Nina</a>
                                                </p></div>
                                            <ul className="list__option">
                                                <li><span className="badge rounded-pill bg-info"><i
                                                    className="ri-vip-crown-fill"></i></span></li>
                                                <li><a href="javascript:void(0);" role="button"
                                                       className="d-inline-flex"
                                                       aria-label="Favorite" data-favorite-id="109"><i
                                                    className="ri-heart-line heart-empty"></i> <i
                                                    className="ri-heart-fill heart-fill"></i></a></li>
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
                                                               data-favorite-id="109">Favorite</a></li>
                                                        <li><a className="dropdown-item" href="audio/ringtone-2.mp3"
                                                               download>Download</a></li>
                                                        <li><a className="dropdown-item" href="javascript:void(0);"
                                                               role="button">Share</a></li>
                                                        <li className="dropdown-divider"></li>
                                                        <li><a className="dropdown-item" href="album-details.html">View
                                                            details</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle">Collection to listen</span>
                                    <h3 className="mb-0">Best <span className="text-primary">Playlist</span></h3></div>
                                <a href="albums.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel">
                                <div className="swiper" data-swiper-slides="4" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/1.jpg" alt="DJ Remix"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">DJ
                                                        Remix</a> <span className="cover__subtitle">10 Songs | 10 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/2.jpg" alt="Rock Band"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">Rock
                                                        Band</a> <span className="cover__subtitle">14 Songs | 12 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/3.jpg" alt="Solo Special"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">Solo
                                                        Special</a> <span className="cover__subtitle">21 Songs | 45 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/4.jpg" alt="Romantic"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">Romantic</a>
                                                        <span className="cover__subtitle">12 Songs | 75 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/5.jpg" alt="GYM"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">GYM</a>
                                                        <span className="cover__subtitle">16 Songs | 32 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round">
                                                <div className="cover__image"><a href="album-details.html"><img
                                                    src="images/background/horizontal/6.jpg" alt="Retro Special"/></a>
                                                    <div className="cover__image__content"><a href="album-details.html"
                                                                                              className="cover__title mb-1 fs-6 text-truncate">Retro
                                                        Special</a> <span className="cover__subtitle">34 Songs | 69 Favorites</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-button-prev btn-default rounded-pill"></div>
                                <div className="swiper-button-next btn-default rounded-pill"></div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span className="section__subtitle">Listen live now</span>
                                    <h3 className="mb-0">Live <span className="text-primary">Radios</span></h3></div>
                                <a href="stations.html" className="btn btn-link">View All</a></div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="5" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="1"
                                                 data-song-name="I love you mummy"
                                                 data-song-artist="Arebica Luna" data-song-album="Mummy"
                                                 data-song-url="audio/ringtone-1.mp3"
                                                 data-song-cover="images/cover/small/1.jpg">
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
                                                <div className="cover__image"><img src="images/cover/large/1.jpg"
                                                                                   alt="International"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="1"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">International</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="2"
                                                 data-song-name="Shack your butty"
                                                 data-song-artist="Gerrina Linda" data-song-album="Hot shot"
                                                 data-song-url="audio/ringtone-2.mp3"
                                                 data-song-cover="images/cover/small/2.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="javascript:void(0);"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-favorite-id="2">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-queue-id="2">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-next-id="2">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-play-id="2">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/2.jpg"
                                                                                   alt="Network"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="2"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">Network</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="3"
                                                 data-song-name="Do it your way(Female)"
                                                 data-song-artist="Zunira Willy & Nutty Nina" data-song-album="Own way"
                                                 data-song-url="audio/ringtone-3.mp3"
                                                 data-song-cover="images/cover/small/3.jpg">
                                                <div className="cover__head">
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="javascript:void(0);"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-favorite-id="3">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-queue-id="3">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-next-id="3">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-play-id="3">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/3.jpg"
                                                                                   alt="Alpha Gamma"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="3"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">Alpha
                                                    Gamma</a></div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="4"
                                                 data-song-name="Say yes"
                                                 data-song-artist="Johnny Marro" data-song-album="Say yes"
                                                 data-song-url="audio/ringtone-4.mp3"
                                                 data-song-cover="images/cover/small/4.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-danger"><i
                                                            className="ri-heart-fill"></i></span>
                                                        </li>
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="javascript:void(0);"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-favorite-id="4">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-queue-id="4">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-next-id="4">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-play-id="4">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/4.jpg"
                                                                                   alt="Leanne Hutton"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="4"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">Leanne
                                                    Hutton</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="5"
                                                 data-song-name="Where is your letter"
                                                 data-song-artist="Jina Moore & Lenisa Gory" data-song-album="Letter"
                                                 data-song-url="audio/ringtone-5.mp3"
                                                 data-song-cover="images/cover/small/5.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="javascript:void(0);"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-favorite-id="5">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-queue-id="5">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-next-id="5">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-play-id="5">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/5.jpg"
                                                                                   alt="K S N F"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="5"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">K
                                                    S N F</a></div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="cover cover--round" data-song-id="6"
                                                 data-song-name="Hey not me"
                                                 data-song-artist="Rasomi Pelina" data-song-album="Find soul"
                                                 data-song-url="audio/ringtone-6.mp3"
                                                 data-song-cover="images/cover/small/6.jpg">
                                                <div className="cover__head">
                                                    <ul className="cover__label d-flex">
                                                        <li><span className="badge rounded-pill bg-info"><i
                                                            className="ri-vip-crown-fill"></i></span></li>
                                                    </ul>
                                                    <div className="cover__options dropstart d-inline-flex ms-auto"><a
                                                        className="dropdown-link" href="javascript:void(0);"
                                                        role="button"
                                                        data-bs-toggle="dropdown" aria-label="Cover options"
                                                        aria-expanded="false"><i className="ri-more-2-fill"></i></a>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-favorite-id="6">Favorite</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-queue-id="6">Add to queue</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-next-id="6">Next to play</a></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button">Share</a>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                                   role="button"
                                                                   data-play-id="6">Play</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="cover__image"><img src="images/cover/large/6.jpg"
                                                                                   alt="Clay Gandy"/>
                                                    <button type="button"
                                                            className="btn btn-play btn-default btn-icon rounded-pill"
                                                            data-play-id="6"><i className="ri-play-fill icon-play"></i>
                                                        <i
                                                            className="ri-pause-fill icon-pause"></i></button>
                                                </div>
                                                <div className="cover__foot"><a href="javascript:void(0);" role="button"
                                                                                className="cover__title text-truncate">Clay
                                                    Gandy</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination"></div>
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
                                <div className="btn__wrap"><i className="ri-google-play-fill"></i> <span
                                    className="ms-2">Google Play</span>
                                </div>
                            </a><a href="#" className="btn btn-lg btn-primary">
                                <div className="btn__wrap"><i className="ri-app-store-fill"></i> <span className="ms-2">App Store</span>
                                </div>
                            </a></div>
                        </div>
                    </footer>
                </main>
            </div>
            <div id="backdrop"></div>
        </div>
    );
};

export default HomeComponent;