import React, {useEffect, useState} from "react";
import {
    getAllPlaylistById,
} from "../api/PlaylistService/PlaylistService";
import {Link} from "react-router-dom";
import "./Playlist.css"
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/Firebase";
import {v4} from "uuid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AxiosCustomize from "../api/utils/AxiosCustomize";

export default function ListPlaylist() {
    const accountLogin = useSelector(state => state.account)
    const [listPlaylist, setListPlaylist] = useState([]);
    const account = useSelector(state => state.account);
    const [playlistLikesQuantity, setPlaylistLikesQuantity] = useState(0);
    const [isLiked, setIsLiked] = useState();
    const [imgPlaylist, setImgPlaylist] = useState(null);
    const [openModalCreate, setOpenModalCreate] = React.useState(false);
    const [openModalRemove, setOpenModalRemove] = React.useState(false);
    const [newPlaylist, setNewPlaylist] = useState({});
    const [addPlaylist, setAddPlaylist] = useState(false);
    const [remove, setRemove] = useState(false);
    const [idPlaylistRemove, setIdPlaylistRemove] = useState({});


    useEffect(() => {
        if (account != null) {
            getAllPlaylistById(accountLogin.id).then(res => {
                setListPlaylist(res.data);
            })
        }
        setAddPlaylist(false);
        setRemove(false);
    }, [playlistLikesQuantity, isLiked, addPlaylist, remove])

    const uploadImg = (even) => {
        if (even.target.files[0] == null) return;
        if (!even.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            toast.error('Thêm ảnh thất bại!');
        } else {
            const imageRef = ref(storage, `images/${even.target.files[0].name + v4()}`);
            uploadBytes(imageRef, even.target.files[0]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImgPlaylist(url);
                    previewSelectedImage(even.target.files[0]);
                    toast.success('Upload ảnh thành công');
                });
            });
        }
    }

    const previewSelectedImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImageElement = document.getElementById("previewImage");
                if (previewImageElement) {
                    previewImageElement.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
    };

    const ChangeInputAccountEdit = (e) => {
        const {name, value} = e.target;
        setNewPlaylist({...newPlaylist, [name]: value});
    }
    const handleAdd = async () => {
        const data = {...newPlaylist,playlistImg:imgPlaylist, idAccount:accountLogin.id};
        try {
            const response = await AxiosCustomize.post('/playlist/addPlaylist/', data);
            toast.success('Thêm danh sách phát thành công');
            setAddPlaylist(true);
        } catch (error) {
            toast.error("Thêm danh sách phát thất bại");
        }
        // Lưu xong thì đóng modal
        handleCloseModalCreate();
    }

    const handleOpenModalRemove = (id) => {
        setIdPlaylistRemove(id);
        setOpenModalRemove(true)
    };

    const handleRemove = async () => {
        // TODO: Gọi API add song to playlist
        try {
            const response = await AxiosCustomize.post('/playlist/deletePlaylist/' + idPlaylistRemove);
            toast.success('Xóa danh sách thành công');
            setRemove(true);
        } catch (error) {
            toast.error("Xóa danh sách thất bại");
        }
        // Lưu xong thì đóng modal
        handleCloseModalRemove();
    }

    const handleCloseModalCreate = () => setOpenModalCreate(false);
    const handleCloseModalRemove = () => setOpenModalRemove(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/home.jpg"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1">
                                    <h3 className="mb-0">Danh sách phát <span className="text-primary">của tôi</span>
                                    </h3></div>
                                <a type="button" data-toggle="modal" data-target="#exampleModalCenter"
                                   className="btn btn-link" onClick={handleOpenModalCreate}>
                                    <i className="fa-sharp fa-light fa-list-music"></i>
                                    Tạo mới danh sách phát
                                </a>
                            </div>
                            <div className="list list--lg list--order">
                                <div className="row">
                                    {listPlaylist.map((item) => (
                                        <div className="list__item" key={item.id} style={{width: "99%"}}>
                                            <a className="list__cover"
                                               style={{height: "150px", width: "150px"}}><img
                                                src={item.playlistImg} alt="" style={{height: 200 + 'px'}}/></a>
                                            <div className="list__content">
                                                <Link
                                                    to={`/detailPlaylist/${item.id}`}
                                                    className="list__title text-truncate"
                                                    style={{fontSize: "20px"}}>{item.namePlaylist}</Link>
                                                <p className="list__subtitle text-truncate"><Link
                                                    to={`/detailPlaylist/${item.id}`}>
                                                </Link></p></div>
                                            <ul className="list__option">
                                                <li className="dropstart d-inline-flex"><a
                                                    className="dropdown-link"
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-label="Cover options"
                                                    aria-expanded="false"><i
                                                    className="ri-more-fill"></i></a>
                                                    <ul className="dropdown-menu dropdown-menu-sm">
                                                        <li>
                                                            <div className="dropdown-item"
                                                                 role="button" onClick={() => {
                                                                handleOpenModalRemove(item.id)
                                                            }}
                                                                >
                                                                Xóa danh sách phát
                                                            </div>
                                                        </li>
                                                        <li><Link to={`/detailPlaylist/${item.id}`}
                                                                  className="dropdown-item">
                                                            Xem danh sách
                                                        </Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Modal
                open={openModalCreate}
                onClose={handleCloseModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        mb: 2
                    }}>
                        Tạo danh sách mới
                    </Typography>
                    <div className="modal-body">
                        <div className="input-playlist">
                            <p>Tên Playlist:</p>
                            <input placeholder={"Hãy nhập tên Playlist"} name={'namePlaylist'} onChange={ChangeInputAccountEdit}
                            style={{
                                border: "1px solid black",
                                borderRadius: "4px",
                                marginBottom: "16px"
                            }}/>
                        </div>

                        <div className={"input-playlist"}>
                            <p>Nhập ảnh Playlist:</p>
                            <input type={"file"} onChange={uploadImg}/>
                        </div>
                        {imgPlaylist ? (
                            <div className={"input-playlist"} style={{justifyContent: "center"}}>
                                <img id={"previewImage"} src="" alt="" style={{
                                    width: "250px",
                                    height: "250px",
                                    borderRadius: "10px"
                                }}/>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <FormControl sx={{
                        mb: 2
                    }} fullWidth>

                    </FormControl>
                    <div style={{textAlign: 'right'}}>
                        <Button variant="contained" onClick={handleAdd}>Tạo</Button>
                        <Button variant="contained" onClick={handleCloseModalCreate} style={{marginLeft: "15px"}}>Đóng</Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModalRemove}
                onClose={handleCloseModalRemove}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        mb: 2
                    }}>
                        Bạn Chắc chắn muốn xóa danh sách phát ?
                    </Typography>
                    <FormControl sx={{
                        mb: 2
                    }} fullWidth>

                    </FormControl>
                    <div style={{textAlign: 'right'}}>
                        <Button variant="contained" onClick={handleRemove}>Xóa</Button>
                        <Button variant="contained" onClick={handleCloseModalRemove} style={{marginLeft: "15px"}}>Đóng</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}