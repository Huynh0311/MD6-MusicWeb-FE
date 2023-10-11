import React from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
const NavbarComponent = () => {
    const navigate = useNavigate();
    return (
        <div>
            <aside id="sidebar">
                <div className="sidebar-head d-flex align-items-center justify-content-between"><a className="brand external" onClick={()=>navigate("/home")}><img
                    src="/images/logos/logo.svg" alt="Listen app"/> </a><a href="javascript:void(0);" role="button"
                                                                          className="sidebar-toggler"
                                                                          aria-label="Sidebar toggler">
                    <div className="d-none d-lg-block"><i className="ri-menu-3-line sidebar-menu-1"></i> <i
                        className="ri-menu-line sidebar-menu-2"></i></div>
                    <i className="ri-menu-fold-line d-lg-none"></i></a></div>
                <div className="sidebar-body" data-scroll="true">
                    <nav className="navbar d-block p-0">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/"}>
                                    <p className="nav-link d-flex align-items-center active">
                                        <i className="ri-home-4-line fs-5"></i>
                                        <span className="ps-3">Home</span>
                                    </p>
                                </Link>
                            </li>
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
                <div className="sidebar-foot"><a href={"/song/create"} className="btn btn-primary d-flex">
                    <div className="btn__wrap"><i className="ri-music-fill"></i> <span onClick={()=>navigate("/song/create")}>Add Music</span></div>
                </a></div>
            </aside>
        </div>
    );
};

export default NavbarComponent;