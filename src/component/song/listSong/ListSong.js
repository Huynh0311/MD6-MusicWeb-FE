import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./ListSong.css"
import Tooltip from '@mui/material/Tooltip';
import {linkClasses} from "@mui/material";
import {toast} from "react-toastify";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListSong = () => {
    const [songdata, songdatachange] = useState([]);
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    const navigate = useNavigate();

    const SongDetail = (id) => {
        navigate("/song/" + id);
    }

    const LoadEdit = (id) => {
        navigate("/song/edit/" + id);
    }

    function handleOverflowChange(isOverflowed) {
        console.log(isOverflowed);
    }

    const EditFunction = (id) => {
        navigate("/song/edit/" + id);
    }

    const [deleteSong, deleteSongChange] = useState([]);

    const RemoveFunction = (id) => {
            fetch("http://localhost:8080/songs/delete/" + id, {
                method: "GET"
            }).then((res) => {
                fetch("http://localhost:8080/songs/account", {
                    headers: {
                        Authorization: `Bearer ${account.token}`,
                    },
                }).then((res) => {

                    return res.json();
                }).then((resp) => {
                    songdatachange(resp);
                    console.log(resp)
                }).catch((err) => {
                    console.log(err.message);
                })
            }).catch((err) => {
                console.log(err.message)
            })

    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedSongId, setSelectedSongId] = useState(null);

    React.useEffect(() => {
        fetch("http://localhost:8080/songs/account", {
            headers: {
                Authorization: `Bearer ${account.token}`,
            },
        }).then((res) => {

            return res.json();
        }).then((resp) => {
            songdatachange(resp);
            console.log(resp)
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])



    return (
<div>

    <div id="wrapper">

        <main id="page_content">
            <div className="hero" style={{ backgroundImage: 'url(../images/banner/event.jpg)' }}></div>
            <div className="col-md-10" style={{left: "130px"}}>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Danh sách bài hát</h4>
                        <div >
                            <Link to='/song/create' className="btn btn-primary">Thêm bài hát</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th></th>
                                    <th>Bài hát</th>
                                    <th>Ca sĩ</th>
                                    <th>Thể loại</th>
                                    <th className="text-nowrap">Tùy chọn</th>
                                </tr>
                                </thead>
                                <tbody className="count-numb-rs">
                                {songdata.length === 0 ?
                                    (
                                        <tr>
                                            <td colSpan={6} style={{textAlign:'center'}}>Chưa có bài hát mới nào. Hãy thêm bài hát</td>
                                        </tr>
                                    )
                                 :
                                    ( songdata.map(item => (
                                            <tr key={item.id} >
                                                <td className="count-numb"></td>
                                                <td></td>
                                                <td> {item.nameSong}</td>
                                                <td> {item.nameSinger}</td>
                                                <td> {item.genres.name}</td>
                                                <td>
                                                    <Tooltip title="Chỉnh sửa" placement="top-end">
                                                        <a onClick={() => {
                                                            EditFunction(item.id)
                                                        }} className="fa-regular fa-file-pen  custom-button"
                                                           style={{color: '#052ed1'}}></a>
                                                    </Tooltip>

                                                    <Tooltip title="Xóa" placement="top-end">
                                                        <a onClick={() => {
                                                            setSelectedSongId(item.id);
                                                            handleClickOpen();
                                                        }} className="fa-sharp fa-solid fa-trash  custom-button"
                                                           style={{color: '#196734'}}></a>

                                                    </Tooltip>

                                            <Tooltip title="Thông tin" placement="top-end">
                                                <Link to={"/song/detailSong/" + item.id} className="fa-duotone fa-circle-info  custom-button"></Link>
                                            </Tooltip>
                                        </td>

                                            </tr>
                                        )
                                    ))
                                }
                                </tbody>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                    BackdropProps ={{ style: { backgroundColor: 'transparent' }, }}>

                                    <DialogTitle>{"Bạn có muốn xóa bài hát này?"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Bài hát sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn xóa.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Hủy</Button>
                                        <Button onClick={() => {
                                            if (selectedSongId){
                                                RemoveFunction(selectedSongId);
                                                handleClose();
                                            }
                                        }}>Xác nhận</Button>
                                    </DialogActions>
                                </Dialog>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer">
                <div className="container">


                    
                </div>
            </footer>
        </main>
    </div>
</div>



    );
};

export default ListSong;

