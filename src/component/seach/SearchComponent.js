import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import _ from "lodash";

const SearchComponent = () => {
    const accountLogin = useSelector(state => state.account);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState();

    const logOut = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload()
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const searchSongName = async (e) => {
        e.preventDefault();
        if (searchInput != '') {
            navigate(`/song/search?q=${searchInput}`)
        }
    }
    return (
        <div>
            <header id="header">
                <div className="container">
                    <div className="header-container">
                        <div className="d-flex align-items-center">
                            <div role="button"
                                 className="header-text sidebar-toggler d-lg-none me-3"
                                 aria-label="Sidebar toggler"><i
                                className="ri-menu-3-line"></i></div>
                            <form id="search_form" className="me-3" onSubmit={searchSongName}>
                                <label htmlFor="search_input">
                                    <i className="ri-search-2-line" onClick={searchSongName}/></label> <input
                                type="text"
                                placeholder="Hãy tìm gì đó ở đây ..."
                                id="search_input"
                                className="form-control form-control-sm"
                                value={searchInput || ''}
                                onChange={(e) => handleSearchInput(e)}
                            />
                            </form>
                            <div className="icon" style={{
                                width: '34px',
                                height: '34px',
                                background: '#196EED',
                                borderRadius: '50%',
                                MozBorderRadius: '50%',
                                WebkitBorderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <button style={{color: '#ffffff', border: "none", display: 'contents'}}>
                                    <i className="fa-regular fa-bell" style={{fontSize: '20px'}}></i>
                                    <span className={"notify-text"}>2</span>
                                </button>
                            </div>
                            <div className="d-flex align-items-center">
                                {!_.isEmpty(accountLogin) ? (
                                    <div className="dropdown ms-3 ms-sm-4">
                                        <div className="avatar header-text"
                                             role="button" id="user_menu"
                                             data-bs-toggle="dropdown"
                                             aria-expanded="false">
                                            <div className="avatar__image">
                                                <img src={accountLogin.img} alt="user"/>
                                            </div>
                                            <span className="ps-2 d-none d-sm-block">{accountLogin.name}</span></div>
                                        <ul className="dropdown-menu dropdown-menu-md dropdown-menu-end"
                                            aria-labelledby="user_menu">
                                            <li>
                                                <div className="py-2 px-3 avatar avatar--lg">
                                                    <div className="avatar__image"><img src={accountLogin.img}
                                                                                        alt="user"/></div>
                                                    <div className="avatar__content"><span
                                                        className="avatar__title">{accountLogin.name}</span>
                                                        <span className="avatar__subtitle">Artist</span></div>
                                                </div>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                                <Link to={"/updateProfile/"}>
                                                    <div className="dropdown-item d-flex align-items-center">
                                                        <i className="ri-user-3-line fs-5"></i>
                                                        <span className="ps-2">Thông tin cá nhân</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/updatePassword/"}>
                                                    <div className="dropdown-item d-flex align-items-center">
                                                        <i className="ri-lock-2-line fs-5"></i>
                                                        <span className="ps-2">Cập nhật mật khẩu</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={"/favorite"}>
                                                    <div className="dropdown-item d-flex align-items-center">
                                                        <i className="ri-heart-line fs-5"></i>
                                                        <span className="ps-2">Yêu thích</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                                <button
                                                    className="dropdown-item d-flex align-items-center external text-danger"
                                                    onClick={() => logOut()}><i
                                                    className="ri-logout-circle-line fs-5"></i> <span
                                                    className="ps-2">Logout</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link to={'/login'}>
                                        <button className="btn btn-primary">Đăng nhập</button>
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default SearchComponent;
