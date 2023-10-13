import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const NavbarComponent = () => {
    const [account, setAccount] = useState(localStorage.getItem("data"));
    const loggedIn = isLoggedIn();
    const navigate = useNavigate();

    function isLoggedIn() {
        return account ? true : false;
    }

    return (
        <div>
            <aside id="sidebar">
                <div className="sidebar-head d-flex align-items-center justify-content-between">
                    <Link to={"/"}>
                        <p className="brand external">
                            <img src="../../images/logos/logo.svg" alt="Listen app"/>
                        </p>
                    </Link>
                    <p role="button" className="sidebar-toggler" aria-label="Sidebar toggler">
                        <div className="d-none d-lg-block"><i className="ri-menu-3-line sidebar-menu-1"></i>
                            <i className="ri-menu-line sidebar-menu-2"></i>
                        </div>
                        <i className="ri-menu-fold-line d-lg-none"></i>
                    </p>
                </div>
                <div className="sidebar-body" data-scroll="true">
                    <nav className="navbar d-block p-0">
                        <ul className="navbar-nav">
                            <li className="nav-item nav-item-color">
                                <Link to={"/"}>
                                    <p className="nav-link d-flex align-items-center active">
                                        <i className="ri-home-4-line fs-5"></i>
                                        <span className="ps-3">Trang chủ</span>
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item nav-item-color"><a href="genres.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-disc-line fs-5"></i> <span className="ps-3">Thể loại</span></a></li>
                            <li className="nav-item nav-item-color"><a href="albums.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-album-line fs-5"></i> <span className="ps-3">Albums</span></a></li>
                            <li className="nav-item nav-item-color"><a href="artists.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-mic-line fs-5"></i> <span className="ps-3">Ca sĩ</span></a></li>
                            <li className="nav-item nav-item-color nav-item nav-item-color--head"><span
                                className="nav-item nav-item-color--head__text">Music</span> <span
                                className="nav-item nav-item-color--head__dots">...</span></li>
                            <li className="nav-item nav-item-color"><a href="analytics.html"
                                                                       className="nav-link d-flex align-items-center"><i
                                className="ri-pie-chart-line fs-5"></i> <span className="ps-3">Thịnh hành</span></a>
                            </li>
                            <li className="nav-item nav-item-color"><a href="analytics.html"
                                                                       className="nav-link d-flex align-items-center">
                                <i className="ri-music-2-line"></i>
                                <span className="ps-3">Bài hát mới</span></a>
                            </li>
                            {loggedIn ? (
                                <>
                                    <li className="nav-item nav-item-color">
                                        <Link to={"/favorite"}>
                                            <p className="nav-link d-flex align-items-center">
                                                <i className="ri-heart-line fs-5"></i>
                                                <span className="ps-3">Yêu thích</span>
                                            </p>
                                        </Link>
                                    </li>
                                    <Link to={"/song"}>
                                        <li className="nav-item nav-item-color">
                                            <p  className="nav-link d-flex align-items-center">
                                                <i className="fa-solid fa-list-music" style={{fontSize: "20px"}}></i>
                                                <span className="ps-3">Danh sách bài hát</span></p>
                                        </li>
                                    </Link>
                                </>
                            ) : (
                                <li className="nav-item nav-item-color">
                                    <div className="login-nav-container login mar-t-15">
                                        <div className="text">Đăng nhập để khám phá playlist dành riêng cho bạn</div>
                                        <Link to={"/login"}>
                                            <button className="zm-btn is-medium is-outlined is-upper button"
                                                    tabIndex="0">
                                                <span>Đăng Nhập</span>
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            )}

                            {/*<li className="nav-item nav-item-color"><a href="history.html"*/}
                            {/*                            className="nav-link d-flex align-items-center"><i*/}
                            {/*    className="ri-history-line fs-5"></i> <span className="ps-3">Lịch sử</span></a></li>*/}
                            {/*<li className="nav-item nav-item-color nav-item nav-item-color--head"><span*/}
                            {/*    className="nav-item nav-item-color--head__text">Events</span> <span*/}
                            {/*    className="nav-item nav-item-color--head__dots">...</span></li>*/}
                            {/*<li className="nav-item nav-item-color">*/}
                            {/*    <a href="events.html" className="nav-link d-flex align-items-center">*/}
                            {/*        <i className="ri-calendar-event-line fs-5"></i>*/}
                            {/*        <span className="ps-3">Bài hát mới</span>*/}
                            {/*</a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item nav-item-color"><a href="event-details.html"*/}
                            {/*                            className="nav-link d-flex align-items-center"><i*/}
                            {/*    className="ri-newspaper-line fs-5"></i> <span className="ps-3">Event Details</span></a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item nav-item-color"><a href="add-event.html"*/}
                            {/*                            className="nav-link d-flex align-items-center"><i*/}
                            {/*    className="ri-add-circle-line fs-5"></i> <span className="ps-3">Add Event</span></a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item nav-item-color nav-item nav-item-color--head"><span*/}
                            {/*    className="nav-item nav-item-color--head__text">Extra</span> <span*/}
                            {/*    className="nav-item nav-item-color--head__dots">...</span></li>*/}
                            {/*<li className="nav-item nav-item-color"><a href="404.html"*/}
                            {/*                            className="nav-link d-flex align-items-center external"><i*/}
                            {/*    className="ri-error-warning-line fs-5"></i> <span*/}
                            {/*    className="ps-3">404 Page</span></a></li>*/}
                            {/*<li className="nav-item nav-item-color"><a href="blank.html"*/}
                            {/*                            className="nav-link d-flex align-items-center"><i*/}
                            {/*    className="ri-file-line fs-5"></i> <span className="ps-3">Blank Template</span></a>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                </div>
                {loggedIn ? (
                    <div className="sidebar-foot">
                        <Link to={"/song/create"}>
                            <p className="btn btn-primary d-flex">
                                <div className="btn__wrap"><i className="ri-music-fill"></i> <span>Add Music</span>
                                </div>
                            </p>
                        </Link>
                    </div>

                ) : (
                    <></>
                )}
            </aside>
        </div>
    );
};

export default NavbarComponent;
