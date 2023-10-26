import React, {useContext, useEffect, useState} from 'react';
import {AudioPlayerContext, useAudioPlayer} from "../../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {getAllSongByIdDesc} from "../../api/songService/SongService";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {likeClickAPI} from "../../api/LikesService/LikesService";
import _ from "lodash";
import {toast} from "react-toastify";
import AxiosCustomize from "../../api/utils/AxiosCustomize";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";


const NewSongList = () => {
    const accountLogin = useSelector(state => state.account)
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [isLike, setIsLike] = useState(false);
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    const [songsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
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
                const response = await getAllSongByIdDesc();
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
        const updateSongs = songs.map((song) => {
            const newIsPlaying = song.id === songId ? !song.isPlaying : false;
            return {
                ...song,
                isPlaying: newIsPlaying,
            }
        })
        setSongs(updateSongs);
        handlePlayToggle(updateSongs.some((song) => song.isPlaying));
    };

    function likeClick(id) {
        if (!account) {
            navigate("/login");
            return;
        }
        likeClickAPI(id).then(res => {
            setIsLike(!isLike)
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const calculatePageCount = () => {
        return Math.ceil(songs.length / songsPerPage);
    };

    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    const pageCount = calculatePageCount();

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/song.jpg)"}}></div>
                    <div className="under-hero container" >
                        <div className="section">
                            <div className="section__head"><h3 className="mb-0">Bài hát mới</h3></div>
                            <div className="list">
                                <div className="row">
                                    <div className="col-xl-12">
                                        {songs && currentSongs.map((song) => (
                                            <div className="list__item" key={song.id}>
                                                <div className="list__cover" style={{
                                                    width: "4rem",
                                                    height: "4rem",
                                                }}>
                                                    <img src={song.imgSong} alt="Error"/>
                                                    <div
                                                        className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                                        aria-label="Play pause">
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
                                                <Link to={"/song/detailSong/" + song.id} className="list__content"
                                                      style={{
                                                          paddingLeft: "2rem"
                                                      }}>
                                                    <div>
                                                        <div href="song-details.html"
                                                             className="list__title text-truncate">{song.nameSong}</div>
                                                        <p className="list__subtitle text-truncate">
                                                            {song.nameSinger}
                                                        </p>
                                                    </div>
                                                </Link>
                                                <ul className="list__option">
                                                    <li>
                                                        <div href="#" role="button" className="d-inline-flex"
                                                             aria-label="Favorite" data-favorite-id="1">
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
                                                        <div className="dropdown-link"
                                                             href="#" role="button"
                                                             data-bs-toggle="dropdown"
                                                             aria-label="Cover options"
                                                             aria-expanded="false"><i
                                                            className="ri-more-fill"></i>
                                                        </div>
                                                        <ul className="dropdown-menu dropdown-menu-sm">
                                                            <li>
                                                                <div className="dropdown-item" role="button"
                                                                     onClick={() => {
                                                                         handleOpen(song.id)
                                                                     }}>Thêm vào danh sách phát
                                                                </div>
                                                            </li>
                                                            <li className="dropdown-divider"></li>
                                                            <li>
                                                                <div className="dropdown-item" role="button"
                                                                     onClick={() => {
                                                                         handleToggleSongPlay(song.id);
                                                                         updateCurrentSongAndSongs(song, songs);
                                                                     }}>Phát
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pagination">
                                {Array.from({length: pageCount}, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
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
};

export default NewSongList;