import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const SearchComponent = () => {
    const [account,setAccount] = useState(localStorage.getItem("data"));
    const loggedIn = isLoggedIn();
    const navigate = useNavigate();
    function isLoggedIn() {
        return account ? true : false;
    }
    const logOut =()=> {
        localStorage.clear();
        navigate("/");
        window.location.reload()
    }
    let accounts = null;
    if (account) {
        accounts = JSON.parse(account);
    }

    return (
        <div>
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
                            <div className="icon" style={{ backgroundColor: 'blue' }}>
                                <button><i className="fa-solid fa-bell"></i></button>
                                <div className="counter">2</div>
                            </div>
                            <div className="d-flex align-items-center">
                                {loggedIn ? (
                                    <div className="dropdown ms-3 ms-sm-4"><a href="javascript:void(0);"
                                                                              className="avatar header-text"
                                                                              role="button" id="user_menu"
                                                                              data-bs-toggle="dropdown"
                                                                              aria-expanded="false">
                                        <div className="avatar__image"><img src={accounts.img} alt="user"/>
                                        </div>
                                        <span className="ps-2 d-none d-sm-block">{accounts.name}</span></a>
                                        <ul className="dropdown-menu dropdown-menu-md dropdown-menu-end"
                                            aria-labelledby="user_menu">
                                            <li>
                                                <div className="py-2 px-3 avatar avatar--lg">
                                                    <div className="avatar__image"><img src={accounts.img}
                                                                                        alt="user"/></div>
                                                    <div className="avatar__content"><span className="avatar__title">{accounts.name}</span>
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
                                            <li><a className="dropdown-item d-flex align-items-center"
                                                   href="favorites.html"><i
                                                className="ri-heart-line fs-5"></i> <span
                                                className="ps-2">Yêu thích</span></a></li>
                                            <li className="dropdown-divider"></li>
                                            <li><button
                                                className="dropdown-item d-flex align-items-center external text-danger" onClick={() => logOut()}><i className="ri-logout-circle-line fs-5"></i> <span
                                                className="ps-2">Logout</span></button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link to={'/login'}><button className="btn btn-primary">Đăng nhập</button></Link>
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