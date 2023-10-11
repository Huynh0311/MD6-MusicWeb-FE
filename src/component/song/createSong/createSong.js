import React, {useEffect, useState} from 'react';
import {storage} from "../../../firebase/Firebase"
import {v4} from 'uuid';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import "./create.css"
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {addSongSV, getAllGenres} from "../../api/songService/SongService";


const validateSchema = Yup.object().shape({
    nameSong: Yup.string()
        .min(5, 'song name must be at least 5 characters long')
        .max(50, 'song name must be maximum 50 characters long')
        .required('song name cannot be null'),
    singer: Yup.string()
        .min(3, 'Artists name must be at least 3 characters long')
        .max(150, 'Artists name must be maximum 150 characters long')
        .required('Artists name cannot be null'),
});

const CreateSong = () => {
    const navigate = useNavigate();
    const [audioUpload, setAudioUpload] = useState(null);
    const [singer, setSinger] = useState();
    const [nameSong, setNameSong] = useState('');
    const [genres, setGenres] = useState(1);
    const [genresList, setGenresList] = useState([]);
    const [description, setDescription] = useState('');
    const [imageUpload, setImageUpload] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const [defaultImg, setDefaultImg] = useState('https://www.billboard.com/wp-content/uploads/media/streaming-illustration-v-2019-billboard-1548.jpg');
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("data")));
    console.log(account)
    const uploadAudio = async (imgFile) => {
        if (audioUpload == null) return;
        const audioRef = ref(storage, `audios/${audioUpload.name + v4()}`);
        try {
            await uploadBytes(audioRef, audioUpload);
            const audioUrl = await getDownloadURL(audioRef);

            addSong(audioUrl, imgFile);
        } catch (error) {
            console.error(error);
        }
    }


    const uploadImg = async () => {
        setIsLoading(true);
        if (imageUpload == null) return;
        const imgRef = ref(storage, `images/${imageUpload.name + v4()}`);
        try {
            await uploadBytes(imgRef, imageUpload);
            const imgUrl = await getDownloadURL(imgRef);
            uploadAudio(imgUrl);
        } catch (error) {
            console.error(error);
        }
    }

    function insertLineBreaks(text) {
        // Tách chuỗi thành các dòng bằng dấu xuống dòng
        const lines = text.split(/\r\n|\r|\n/);

        // Chèn thẻ <br> vào cuối mỗi dòng
        const result = lines.map(line => line + '<br>').join('');

        return result;
    }

    const handleInputCreateSong = (e) => {
        let {id, value} = e.target;
        switch (id) {
            case "nameSong":
                setNameSong(value);
                break;
            case "description":
                let renewValue = insertLineBreaks(value);
                console.log(renewValue);
                setDescription(renewValue);
                break;
            case "genres_id":
                setGenres(value);
                break;
            case "singer":
                setSinger(value);
                break;
        }
    }


    const addSong = async (audioUrl, imgUrl) => {
        let form = new FormData();
        if (audioUrl && imgUrl) {
            let singerListInput = singer.split(",");
            setSinger(singerListInput);
            form.append("pathImg", imgUrl);
            form.append("nameSong", nameSong);
            form.append("description", description);
            form.append("genres_id", genres);
            form.append("pathSong", audioUrl);
            form.append("singer", singer);
            try {
                const response = await addSongSV(form)
                setIsLoading(false);
                console.log(response.data);
                let obj = response.data;
                navigate(`/song/detailSong/${obj.id}`)
            } catch (error) {
                console.log(error)
            }
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

    const showGenres = async () => {
        const response = await getAllGenres()
        setGenresList(response.data)
    }
    useEffect(() => {
        showGenres();
    }, [])


    return (

        <div id="wrapper">
            <Formik
                initialValues={{
                    nameSong: '',
                    singer: '',
                }}
                validationSchema={validateSchema}
                onSubmit={(values, {resetForm}) => {
                    uploadImg();
                    resetForm();
                    document.getElementById("previewImage").value = '';
                }}>
                <Form>
                    <div>
                        <main id="page_content">
                            <div className="hero" style={{backgroundImage: "url(../images/banner/song.jpg)"}}></div>
                            <div className="under-hero container">
                                <div className="section">
                                    <div className="row">
                                        <div className="col-xl-7 col-md-10 mx-auto">
                                            <div className="card">
                                                <div className="card-header pb-0">
                                                    <div className="mat-tabs">
                                                        <ul className="nav nav-tabs" id="add_music" role="tablist">
                                                            <li className="nav-item" role="presentation">
                                                                <button className="nav-link active" id="music"
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target="#music_pane" type="button"
                                                                        role="tab"
                                                                        aria-controls="music_pane"
                                                                        aria-selected="true">Add
                                                                    Music
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="tab-content" id="add_music_content">
                                                        <div className="tab-pane fade show active" id="music_pane"
                                                             role="tabpanel"
                                                             aria-labelledby="music" tabIndex="0">
                                                            <div className="col-12 mb-4">
                                                                <img src={previewImage || defaultImg} alt="Preview"
                                                                     id="previewImage"
                                                                     style={{
                                                                         width: "400px",
                                                                         height: "400px",
                                                                         marginBottom: "20px",
                                                                         marginLeft: "100px"
                                                                     }}/>

                                                                <div>
                                                                    <label style={{margin: "5px 10px"}}>Select the song's picture(*)</label>
                                                                    <div style={{display: "flex"}}>
                                                                        {/*<span style={{marginRight: "5px"}}>*</span>*/}
                                                                        <input type={"file"} className="form-control"
                                                                               id="image" onChange={(event) => {
                                                                            setImageUpload(event.target.files[0]);
                                                                            previewSelectedImage(event.target.files[0])
                                                                        }}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Enter song
                                                                    name(*)</label>
                                                                <div className="requiredInput">
                                                                    {/*<span>*</span>*/}
                                                                    <Field type="text" name="nameSong" id="nameSong"
                                                                           className="form-control"
                                                                           placeholder="Song name"
                                                                           onInput={handleInputCreateSong} required/>

                                                                </div>
                                                            </div>
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'nameSong'}/></span>

                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Select the song's
                                                                    file(*)</label>
                                                                <div className="requiredInput">
                                                                    {/*<span>*</span>*/}
                                                                    <input type="file" id="audio"
                                                                           className="form-control"
                                                                           onChange={(event) => {
                                                                               setAudioUpload(event.target.files[0])
                                                                           }}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Enter singer name(*)</label>
                                                                <div className="requiredInput">
                                                                    {/*<span>*</span>*/}
                                                                    <Field type="text" id="singer" name="singer"
                                                                           className="form-control"
                                                                           placeholder="Singer"
                                                                           onInput={handleInputCreateSong}
                                                                           style={{width: "200%"}}/>
                                                                </div>
                                                            </div>
                                                            <span style={{color: "red"}}><ErrorMessage name={'singer'}/></span>
                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Enter the song's genres(*)</label>
                                                                <div className="requiredInput">
                                                                {/*<span>*</span>*/}
                                                                <select id="genres_id" className="form-select"
                                                                        onChange={handleInputCreateSong}
                                                                        aria-label="Select category">
                                                                    {genresList.map((g) => {
                                                                        return (
                                                                            <option key={g.id}
                                                                                    value={g.id}>{g.name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Enter the song's description(*)</label>
                                                                <textarea id="description"
                                                                          name="description"
                                                                          cols="30"
                                                                          rows="4"
                                                                          className="form-control"
                                                                          placeholder="Describle"
                                                                          onChange={handleInputCreateSong}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-footer text-center addcancelBtn">
                                                    <button type={"submit"} className="btn btn-primary acceptBtn"
                                                            style={{minWidth: "140px"}} disabled={isLoading}>
                                                        {isLoading ? (
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            'Add Music'
                                                        )}
                                                    </button>
                                                    <button className="btn btn-danger">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div id="player">
                        <div className="container">
                            {/*<div className="player-container">*/}
                            {/*    <div className="player-progress">*/}
                            {/*        <progress className="amplitude-buffered-progress player-progress__bar"*/}
                            {/*                  value="0"></progress>*/}
                            {/*        <progress*/}
                            {/*            className="amplitude-song-played-progress player-progress__bar"></progress>*/}
                            {/*        <input type="range" className="amplitude-song-slider player-progress__slider"*/}
                            {/*               aria-label="Progress slider"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="cover d-flex align-items-center">*/}
                            {/*        <div className="cover__image"><img data-amplitude-song-info="cover_art_url"*/}
                            {/*                                           src="images/cover/small/1.jpg"*/}
                            {/*                                           alt=""/></div>*/}
                            {/*        <div className="cover__content ps-3 d-none d-sm-block"><a href="song-details.html"*/}
                            {/*                                                                  className="cover__title text-truncate"*/}
                            {/*                                                                  data-amplitude-song-info="name"></a>*/}
                            {/*            <a href="artist-details.html" className="cover__subtitle text-truncate"*/}
                            {/*               data-amplitude-song-info="artist"></a></div>*/}
                            {/*    </div>*/}
                            {/*    <div className="player-control">*/}
                            {/*        <button type="button"*/}
                            {/*                className="amplitude-repeat btn btn-icon me-4 d-none d-md-block"*/}
                            {/*                aria-label="Repeat">*/}
                            {/*            <i className="ri-repeat-2-fill fs-5"></i></button>*/}
                            {/*        <button type="button" className="amplitude-prev btn btn-icon" aria-label="Backward">*/}
                            {/*            <i*/}
                            {/*                className="ri-skip-back-mini-fill"></i></button>*/}
                            {/*        <button type="button"*/}
                            {/*                className="amplitude-play-pause btn btn-icon btn-default rounded-pill"*/}
                            {/*                aria-label="Play pause"><i className="ri-play-fill icon-play"></i> <i*/}
                            {/*            className="ri-pause-fill icon-pause"></i></button>*/}
                            {/*        <button type="button" className="amplitude-next btn btn-icon" aria-label="Forward">*/}
                            {/*            <i*/}
                            {/*                className="ri-skip-forward-mini-fill"></i></button>*/}
                            {/*        <button type="button"*/}
                            {/*                className="amplitude-shuffle amplitude-shuffle-off btn btn-icon ms-4 d-none d-md-block"*/}
                            {/*                aria-label="Shuffle"><i className="ri-shuffle-fill fs-5"></i></button>*/}
                            {/*    </div>*/}
                            {/*    <div className="player-info">*/}
                            {/*        <div className="me-4 d-none d-xl-block"><span*/}
                            {/*            className="amplitude-current-minutes"></span>:<span*/}
                            {/*            className="amplitude-current-seconds"></span> / <span*/}
                            {/*            className="amplitude-duration-minutes"></span>:<span*/}
                            {/*            className="amplitude-duration-seconds"></span>*/}
                            {/*        </div>*/}
                            {/*        <div className="player-volume dropdown d-none d-md-block">*/}
                            {/*            <button className="btn btn-icon" data-bs-toggle="dropdown"*/}
                            {/*                    data-bs-auto-close="outside"*/}
                            {/*                    aria-label="Volume" aria-expanded="false"><i*/}
                            {/*                className="ri-volume-mute-fill fs-5 d-none"></i> <i*/}
                            {/*                className="ri-volume-down-fill fs-5"></i> <i*/}
                            {/*                className="ri-volume-up-fill fs-5 d-none"></i>*/}
                            {/*            </button>*/}
                            {/*            <div className="dropdown-menu prevent-click"><input type="range"*/}
                            {/*                                                                className="amplitude-volume-slider"*/}
                            {/*                                                                value="50" min="0" max="100"*/}
                            {/*                                                                aria-label="Volume slider"/>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="dropstart d-none d-md-block">*/}
                            {/*            <button className="btn btn-icon" data-bs-toggle="dropdown"*/}
                            {/*                    aria-label="song options"*/}
                            {/*                    aria-expanded="false"><i className="ri-more-2-fill fs-5"></i></button>*/}
                            {/*            <ul className="dropdown-menu dropdown-menu-sm" id="player_options">*/}
                            {/*                <li><a className="dropdown-item" href="javascript:void(0);" role="button"*/}
                            {/*                       data-favorite-id="1">Favorite</a>*/}
                            {/*                </li>*/}
                            {/*                <li><a className="dropdown-item" href="javascript:void(0);" role="button"*/}
                            {/*                       data-playlist-id="1">Add*/}
                            {/*                    to playlist</a></li>*/}
                            {/*                <li><a className="dropdown-item" href="audio/ringtone-1.mp3"*/}
                            {/*                       download>Download</a>*/}
                            {/*                </li>*/}
                            {/*                <li><a className="dropdown-item" href="javascript:void(0);"*/}
                            {/*                       role="button">Share</a>*/}
                            {/*                </li>*/}
                            {/*                <li className="dropdown-divider"></li>*/}
                            {/*                <li><a className="dropdown-item" href="song-details.html">View details</a>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*        <div className="playlist dropstart me-3">*/}
                            {/*            <button className="btn btn-icon" data-bs-toggle="dropdown"*/}
                            {/*                    data-bs-auto-close="outside"*/}
                            {/*                    aria-label="Playlist" aria-expanded="false"><i*/}
                            {/*                className="ri-play-list-fill fs-5"></i></button>*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};


export default CreateSong;