import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {
    changeStatusNotify,
    countUnreadNotifyByAccountLogin,
    getAllNotifyByAccountLogin
} from "../api/NotifyService/NotifyService";
import {countUnreadNotify, getAllNotify} from "../../redux/actions";
import {format} from "date-fns";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {toast} from "react-toastify";


const SearchComponent = () => {
    const accountLogin = useSelector(state => state.account);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState();
    const {account, unreadNotify, notifyList} = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!_.isEmpty(account)) {
            countUnreadNotifyByAccountLogin(account.id).then(response => {
                dispatch(countUnreadNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    useEffect(() => {
        if (!_.isEmpty(account)) {
            getAllNotifyByAccountLogin(account.id).then(response => {
                dispatch(getAllNotify(response.data));
            }).catch(error => {
                console.log(error);
            })
        }
    }, [unreadNotify])
    const handleChangeStatusNotify = () => {
        changeStatusNotify(account.id).then(response => {
            dispatch(countUnreadNotify(0));
        }).catch(error => {
            console.log(error)
        })
    }

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ActiveUser = (id) => {
        handleClick();
            fetch("http://localhost:8080/apiAccount/informationEmail/" + id, {
                method: "POST"
            }).then((res) => {
                toast.success("Thành công")
                handleClose();
                setLoading(!loading)
            }).catch((err) => {
                console.log(err.message)
            })
        }

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
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
                            <div className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                        onClick={handleChangeStatusNotify}>
                                    <i className="fa-sharp fa-solid fa-bell"></i>
                                    {unreadNotify ?
                                        <sup className="badge text-white bg-danger position-absolute top-0 start-50"
                                             style={{fontSize: '10px'}}>
                                            {unreadNotify > 5 ? '5+' : unreadNotify}
                                        </sup>
                                        :
                                        null
                                    }
                                </button>
                                <div className="dropdown-menu dropdown-notify">
                                    {!_.isEmpty(notifyList) && notifyList.map(item => (
                                        <Link to={`${item.navigate}`} className="d-flex align-items-center py-2 px-3 dropdown-notify-item"
                                              key={item.id}>
                                            <img className="img-thumbnail rounded-circle"
                                                 src={item.sender.img ? item.sender.img : "https://img.lovepik.com/original_origin_pic/17/11/27/0f0628268c4abd9497d6b44f781c2d76.png_wh860.png"}
                                                 alt="" width={50}
                                                 style={{height: '50px'}}/>
                                            <div className="d-flex flex-column ms-3">
                                                <p className="mb-2 message-title">
                                                    {item.message}
                                                </p>
                                                <small className="fst-italic" style={{fontSize: '12px'}}>
                                                    <i className="bi bi-clock me-1"></i>{format(new Date(item.createAt), "dd/MM/yyyy")}
                                                </small>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
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
                                                        <span className="ps-2">Bài hát yêu thích</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            {accountLogin.auth === true ?
                                                <></> : (
                                                    <>
                                                        <li>
                                                            <div className="dropdown-item d-flex align-items-center">
                                                    <div onClick={handleClickOpen} className=""
                                                          style={{cursor: 'pointer'}}>
                                                        <i className="ri-user-follow-fill" style={{fontSize:20}}></i>
                                                        <span className="ps-1">   Kích hoạt tài khoản</span>
                                                    </div>
                                                            </div>
                                                        </li>
                                                        <Dialog
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">
                                                                {"Bạn muốn kích hoạt cho tài khoản ?"}
                                                            </DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                <p>Thông tin bạn đã cung cấp trong phần tạo tài khoản sẽ
                                                                    được sử dụng để xác thực.</p>
                                                                    Bạn có thể thay đổi trong phần thông tin cá nhân.
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose}>Hủy bỏ</Button>

                                                                <LoadingButton onClick={() => {ActiveUser(accountLogin.id)}}
                                                                    size="small"
                                                                    endIcon={<SendIcon />}
                                                                    loading={loading}
                                                                    loadingPosition="end"
                                                                    variant="contained"
                                                                >
                                                                    <span> Đồng ý</span>
                                                                </LoadingButton>

                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
                                                )}
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
