import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosConfig from "../api/AccountService/AccountService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

const validateSchema = Yup.object().shape({
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Mật khẩu tối thiểu 8 kí tự. có cả chữ và số')
        .required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu')
        .required('Xác nhận mật khẩu không được để trống'),
});


const UpdatePassword = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState({});

    const ChangeInputAccountEdit = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});
    }

    useEffect(() => {
        findById();
    }, []);

    const findById = () => {
        axiosConfig.findById(id)
            .then((acc) => {
                setAccount(acc);
            })
            .catch((error) => {
                alert("error");
            });
    };

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
                                <form action="#" id="search_form" className="me-3"><label htmlFor="search_input"><i
                                    className="ri-search-2-line"></i></label> <input type="text"
                                                                                     placeholder="Type anything to get result..."
                                                                                     id="search_input"
                                                                                     className="form-control form-control-sm"/>
                                </form>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown ms-3 ms-sm-4">
                                        <a href="javascript:void(0);" className="avatar header-text"
                                           role="button" id="user_menu"
                                           data-bs-toggle="dropdown"
                                           aria-expanded="false">
                                            <div className="avatar__image">
                                                <img src="images/users/thumb.jpg" alt="user"/>
                                            </div>
                                            <span className="ps-2 d-none d-sm-block">Androws</span>
                                        </a>
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
                        <Formik
                            initialValues={{
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={validateSchema}
                            onSubmit={(values) => {
                                axiosConfig.updatePassword(account).then((response) => {
                                    toast.success('Sửa mật khẩu thành công', {
                                        position: "top-center",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }).catch((error) => {
                                    alert("error");
                                })
                            }}>
                            <Form>
                                <div className="hero" style={{backgroundImage: "url(images/banner/event.jpg)"}}></div>
                                <div className="under-hero container">
                                    <div className="section">
                                        <div className="plan bg-light">
                                            <div className="plan__data">
                                                <div className="px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100">
                                                    <div className="d-flex align-items-center mb-4">
                                                        <div className="avatar avatar--xl">
                                                            <div className="avatar__image">
                                                                <img src={account.img} id="previewImage"
                                                                     style={{width: "250px", height: "250px"}}/>
                                                            </div>
                                                        </div>
                                                        <div className="ps-3 cursor">
                                                            <input type="file" className="btn btn-outline-primary"
                                                                   disabled
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row g-4">
                                                        <div className="col-sm-12 inputEditPassword">
                                                            <label htmlFor="name"
                                                                   className="form-label fw-medium">New Password</label>
                                                            <Field type="password" id="password" name={"password"}
                                                                   className="form-control"
                                                                   onInput={ChangeInputAccountEdit}
                                                                   />
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'password'}></ErrorMessage></span>
                                                        </div>
                                                        <div className="col-sm-12 inputEditPassword">
                                                            <label htmlFor="l_name"
                                                                   className="form-label fw-medium">Confirm Password</label>
                                                            <Field type="password" id="confirmPassword" name={"confirmPassword"}
                                                                   className="form-control"
                                                                   />
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'confirmPassword'}></ErrorMessage></span>
                                                        </div>
                                                        <div className="col-12" style={{display: 'flex', justifyContent: 'center'}}>
                                                            <button type=" " className="btn btn-primary" style={{marginRight: "140px"}}>
                                                                Update
                                                            </button>
                                                            <Link to={"/updateProfile/" + id}>
                                                                <p className="btn btn-secondary">
                                                                    Cancel
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
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
                                <div className="dropdown-menu prevent-click">
                                    <input type="range"
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

export default UpdatePassword;
