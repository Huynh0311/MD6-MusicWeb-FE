import React, {useContext, useEffect, useState} from 'react';

import {AiOutlinePauseCircle, AiOutlinePlayCircle} from 'react-icons/ai';
import {
    AudioPlayerContext,
    useAudioPlayer
} from '../../redux/playern/ActionsUseContext/AudioPlayerProvider';
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import AxiosCustomize from "../api/utils/AxiosCustomize";
import {likeClickAPI} from "../api/LikesService/LikesService";
import {saveNotify} from "../api/NotifyService/NotifyService";
import {WebSocketContext} from "../WebSocketProvider";
import {findAccountBySong} from "../api/songService/SongService";
import _ from "lodash";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function Top5Songs() {
    const accountLogin = useSelector(state => state.account)
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [songs, setSongs] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    const {sendNotify} = useContext(WebSocketContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState([]);
    // const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleOpen = async (id) => {
        if (_.isEmpty(accountLogin)) {
            toast.warn("Bạn cần đăng nhập để sử dụng chức năng này");
        } else {
            try {
                const response = await AxiosCustomize.get('/playlist/findByAccountId/' + accountLogin.id);
                setSelectedSongId(id);
                setPlaylist(response.data);
                setOpen(true)
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát:', error);
            }
        }
    };
    const handleClose = () => setOpen(false);

    const handleChangePlaylist = (event) => {
        setSelectedPlaylist(event.target.value);
        console.log(event.target.value)
    };

    const handleSave = async () => {
        console.log('handleSave', selectedSongId, selectedPlaylist);
        // TODO: Gọi API add song to playlist
        try {
            let playlistSong = {playlist: {id: selectedPlaylist}, song: {id: selectedSongId}}
            const response = await AxiosCustomize.post('/playlist/saveToPlaylist', playlistSong);
            toast.success('Thêm vào danh sách phát thành công');
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát:', error);
        }
        // Lưu xong thì đóng modal
        handleClose();
        // Đóng modal xong thì hiển thị thông báo thêm playlist thành công
        // setOpenSnackbar(true);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await AxiosCustomize.get('/songs/top5ByPlays');
                const songs = response.data.map((song) => ({
                    ...song,
                    isPlaying: currentSong && currentSong.id === song.id ? isPlaying : false,
                }));
                setSongs(songs);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát:', error);
            }
        }

        fetchData();
    }, [updateCurrentSongAndSongs, currentSong, isLike]);


    const handleToggleSongPlay = (songId) => {
        const updatedSongs = songs.map((song) => {
            const newIsPlaying = song.id === songId ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying
            }
        })
        setSongs(updatedSongs);
        handlePlayToggle(updatedSongs.some((song) => song.isPlaying));
    };

    function likeClick(id) {
        if (!account) {
            navigate("/login");
            return;
        }
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
            if (isLike === true){
                    findAccountBySong(id).then(res => {
                        handleSendNotifyLike(res.data, id)
                    })
            }
        })
    }
    const handleSendNotifyLike = (receiver, id) => {
        const data = {
            sender: account,
            receiver: {id: receiver.id},
            message: `${account.name} đã thích 1 bài hát của bạn`,
            navigate: '/song/detailSong/' + id
        }
        saveNotify(data).then(response => {
            sendNotify(response.data);
        }).catch(error => {
            console.log(error)
        })
    }



    return (
        <div>
            <ul>
                {songs.map((song,index) => (
                    <div className="list" key={song.id}>
                        <div className="list__item">
                            <div className="list__cover">
                                <img src={song.imgSong} alt={song.nameSong}/>
                                <div className="btn btn-play btn-sm btn-default btn-icon rounded-pill">
                                    {song.isPlaying ? (
                                        <BsPauseFill role='button'
                                                     onClick={() => {
                                                         handleToggleSongPlay(song.id);
                                                         updateCurrentSongAndSongs(song, songs);
                                                     }}
                                                     style={{fontSize: "30px"}}
                                        />
                                    ) : (
                                        <BsFillPlayFill role='button'
                                                        onClick={() => {
                                                            handleToggleSongPlay(song.id);
                                                            updateCurrentSongAndSongs(song, songs);
                                                        }}
                                                        style={{fontSize: "30px"}}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="list__content">
                                <Link to={"/song/detailSong/" + song.id}>
                                    <p className="list__title text-truncate">
                                        {song.nameSong}
                                    </p>
                                </Link>
                                <Link to={"/song/detailSong/" + song.id}>
                                    <p className="list__subtitle text-truncate">
                                        {song.description}
                                    </p>
                                </Link>
                            </div>
                            <ul className="list__option">
                                    {/*<li>*/}
                                    {/*<span className="badge rounded-pill bg-info">*/}
                                    {/*    {index === 0 ?  <i className="ri-vip-crown-fill"></i> : null}*/}
                                    {/*</span>*/}
                                    {/*</li>*/}
                                <li>
                                    <div
                                        role="button"
                                        className="d-inline-flex"
                                        aria-label="Favorite"
                                        data-favorite-id={song.id}>
                                        {song.isLiked === 1 ? (
                                            <i className="fa-sharp fa-solid fa-heart"
                                               style={{
                                                   color: "#ff0000",
                                                   fontSize: "24px"
                                               }}
                                               onClick={() => likeClick(song.id)}>
                                            </i>
                                        ) : (
                                            <i className="ri-heart-line heart-empty"
                                               onClick={() => likeClick(song.id)}
                                            />
                                        )}
                                    </div>
                                </li>
                                <li className="dropstart d-inline-flex">
                                    <div
                                        className="dropdown-link"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-label="Cover options"
                                        aria-expanded="false">
                                        <i className="ri-more-fill"></i>
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-sm">
                                        <li>
                                            <div className="dropdown-item"
                                                 role="button"
                                                 data-playlist-id="1" onClick={() => {
                                                handleOpen(song.id)
                                            }}>Thêm vào danh sách phát
                                            </div>
                                        </li>
                                        <li className="dropdown-divider"></li>
                                        <li>
                                            <div className="dropdown-item"
                                                 role="button"
                                                 onClick={() => {
                                                     handleToggleSongPlay(song.id);
                                                     updateCurrentSongAndSongs(song, songs);
                                                 }}
                                            >Phát
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </ul>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        mb: 2
                    }}>
                        Vui lòng chọn Playlist muốn thêm
                    </Typography>
                    <FormControl sx={{
                        mb: 2
                    }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Chọn Playlist</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPlaylist}
                            label="Chọn Playlist"
                            onChange={handleChangePlaylist}
                        >
                            {playlist.map((item) =>
                                (<MenuItem key={item.id} value={item.id}>{item.namePlaylist}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                    <div style={{textAlign: 'right'}}>
                        <Button variant="contained" onClick={handleSave}>Lưu</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Top5Songs;
