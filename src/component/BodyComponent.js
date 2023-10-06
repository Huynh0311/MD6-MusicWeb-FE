import React from 'react';
import SongList from "./player/SongList";
import TopSong from "./player/TopSong";


const BodyComponent = () => {
    return (
        <div>
            <div id="wrapper">
                <header id="header">
                    <div className="container">
                        <div className="header-container">
                            <div className="d-flex align-items-center"><a href="javascript:void(0);" role="button"
                                                                          className="header-text sidebar-toggler d-lg-none me-3"
                                                                          aria-label="Sidebar toggler"><i
                                className="ri-menu-3-line"></i></a>
                                <form action="#" id="search_form" className="me-3"><label for="search_input"><i
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
                                                        src="images/cover/large/8.jpg" alt="Karen Jennings"/></a>
                                                        <div className="list__content"><a href="artist-details.html"
                                                                                          className="list__title text-truncate">Karen
                                                            Jennings</a></div>
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
                                                                href="artist-details.html">Karen
                                                                Jennings</a></p></div>
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
                                                        for="lang_1">Hindi</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_2"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_2">Punjabi</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_3"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_3">Tamil</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_4"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_4">Bengali</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_5"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_5">Kannada</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_6"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_6">Gujarati</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_7"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_7">Urdu</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_8"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_8">English</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_9"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_9">Telugu</label></div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_10"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_10">Bhojpuri</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_11"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_11">Malayalam</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_12"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_12">Marathi</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_13"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_13">Haryanvi</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_14"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_14">Rajasthani</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_15"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_15">Assamese</label>
                                                    </div>
                                                </div>
                                                <div className="py-2 px-4 w-50">
                                                    <div className="form-check mb-0"><input className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id="lang_16"/> <label
                                                        className="form-check-label fw-semi-bold"
                                                        for="lang_16">Odia</label></div>
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
                                {/*<div className="swiper-button-prev btn-default rounded-pill"></div>*/}
                                {/*<div className="swiper-button-next btn-default rounded-pill"></div>*/}
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
                                                               alt=""/></div>
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
                            <div className="me-4 d-none d-xl-block"><span className="amplitude-current-minutes"></span>:<span
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
            <div id="backdrop"></div>
        </div>
    );
};

export default BodyComponent;