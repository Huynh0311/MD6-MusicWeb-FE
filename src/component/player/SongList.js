import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {saveSong} from "../../redux/actions";
import {
    AudioPlayerContext,
    useAudioPlayer
} from "../../redux/playern/ActionsUseContext/AudioPlayerProvider";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs";
import AxiosCustomize from "../api/utils/AxiosCustomize";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function SongList() {
    const accountLogin = useSelector(state => state.account)
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [selectedSongId, setSelectedSongId] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState([]);
    const [songsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {currentSong, updateCurrentSongAndSongs} = useAudioPlayer();
    const {isPlaying, handlePlayToggle} = useContext(AudioPlayerContext);
    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleOpen = async (id) => {
        console.log(1)
        try {
            console.log('handleOpen', id);
            const response = await AxiosCustomize.get('/playlist/findByAccountId/' + accountLogin.id);
            console.log('response.data', response.data)
            setSelectedSongId(id);
            setPlaylist(response.data);
            setOpen(true)
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát:', error);
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

        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát:', error);
        }
        // Lưu xong thì đóng modal
        handleClose();
        // Đóng modal xong thì hiển thị thông báo thêm playlist thành công
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await AxiosCustomize.get('/songs/getall');
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
    }, [updateCurrentSongAndSongs, currentSong]); // The empty dependency array ensures the effect runs only once (like componentDidMount)

    const addToQueue = (song) => {
        dispatch(saveSong(song));
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

    return (
        <>
            <div className="container">
                <div className="row">
                    {currentSongs.map((song) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={song.id}>
                            <div className="song-card">
                                <div className="cover cover--round">
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">

                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto">
                                            <div className="dropdown-link"
                                                 role="button"
                                                 data-bs-toggle="dropdown" aria-label="Cover options"
                                                 aria-expanded="false">
                                                <i className="ri-more-2-fill"></i>
                                            </div>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                {/*<li>*/}
                                                {/*    <div className="dropdown-item"*/}
                                                {/*         role="button"*/}
                                                {/*         >Favorite*/}
                                                {/*    </div>*/}
                                                {/*</li>*/}
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         data-playlist-id="1" onClick={() => {
                                                        handleOpen(song.id)
                                                    }}>Add to playlist
                                                    </div>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <p className="dropdown-item"*/}
                                                {/*       role="button"*/}
                                                {/*        // data-queue-id="1"*/}
                                                {/*       onClick={() => addToQueue(song)}*/}
                                                {/*    >Add to queue</p>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                {/*    <div className="dropdown-item"*/}
                                                {/*         role="button"*/}
                                                {/*         data-next-id="1">Next to play*/}
                                                {/*    </div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                {/*    <div className="dropdown-item"*/}
                                                {/*         role="button">Share*/}
                                                {/*    </div>*/}
                                                {/*</li>*/}
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <div className="dropdown-item"
                                                         role="button"
                                                         onClick={() => {
                                                             handleToggleSongPlay(song.id);
                                                             updateCurrentSongAndSongs(song, songs);
                                                         }}
                                                    >Play
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="cover__image">
                                        <img src={song.imgSong} alt={song.nameSong}/>
                                        <button type="button"
                                                className="btn btn-play btn-default btn-icon rounded-pill">
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
                                        </button>
                                    </div>

                                    <Link to={"/song/detailSong/" + song.id}>
                                        <div className="cover__foot">
                                            <p className="cover__title text-truncate">
                                                {song.nameSong}
                                            </p>
                                            <p className="cover__subtitle text-truncate">
                                                {song.nameSinger}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({length: pageCount}, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >

                        </button>
                    ))}
                </div>
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
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={openSnackbar} autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                {/*<Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>*/}
                {/*    Thêm vào playlist thành công*/}
                {/*</Alert>*/}
            </Snackbar>
        </>
    );
}

export default SongList;

