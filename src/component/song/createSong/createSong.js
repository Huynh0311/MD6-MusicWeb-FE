import React, {useEffect, useState} from 'react';
import {storage} from "../../../firebase/firebase"
import {v4} from 'uuid';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import "./create.css"
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {addSongSV, getAllGenres} from "../../api/songService/SongService";
import {toast} from "react-toastify";

const validateSchema = Yup.object().shape({
    nameSong: Yup.string()
        .min(5, 'song name must be at least 5 characters long')
        .max(50, 'song name must be maximum 50 characters long')
        .required('song name cannot be null'),
    nameSinger: Yup.string()
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
    const [song, setSong] = useState({
        genres: {id: 1}
    });
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
        const lines = text.replace(/\n/g, "<br/>");
        return lines;
    }

    const handleInputCreateSong = (e) => {
        let {id, value} = e.target;
        if (id == "description") {
            let renewValue = insertLineBreaks(value);
            setSong({...song, [id]: renewValue})
        }
        if (id == "genres_id") {
            setSong({...song, genres: {id: value}});
        } else {
            setSong({...song, [id]: value})
        }
    }


    const addSong = async (audioUrl, imgUrl) => {
        if (audioUrl && imgUrl) {
            song.imgSong = imgUrl;
            song.pathSong = audioUrl;
            try {
                const response = await addSongSV(song)
                setIsLoading(false);
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
                    nameSinger: '',

                }}
                validationSchema={validateSchema}
                onSubmit={(values, {resetForm}) => {
                    uploadImg();
                    resetForm();
                    document.getElementById("previewImage").value = '';
                }}>
                <Form>
                    <div>
                        <header id="header">
                            <div className="container">
                                <div className="header-container">
                                    <div className="d-flex align-items-center"><a href="javascript:void(0);"
                                                                                  role="button"
                                                                                  className="header-text sidebar-toggler d-lg-none me-3"
                                                                                  aria-label="Sidebar toggler"><i
                                        className="ri-menu-3-line"></i></a>
                                        <form action="#" id="search_form" className="me-3"><label
                                            htmlFor="search_input"><i
                                            className="ri-search-2-line"></i></label> <input type="text"
                                                                                             placeholder="Type anything to get result..."
                                                                                             id="search_input"
                                                                                             className="form-control form-control-sm"/>
                                        </form>
                                        <div id="search_results" className="search pb-3">
                                            <div className="search__head">
                                                <div className="search__head__filter">
                                                    <button type="button"
                                                            className="btn btn-sm btn-light-primary active">Trending
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-sm btn-light-primary">Artists
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-light-primary">Songs
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-sm btn-light-primary">Albums
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="search__body" data-scroll="true">
                                                <div className="mb-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-3"><span
                                                        className="search__title">Artists</span> <a href="artists.html"
                                                                                                    className="btn btn-link">View
                                                        All</a></div>
                                                    <div className="row g-4 list">
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="artist-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/large/5.jpg" alt="Jina Moore"/></a>
                                                                <div className="list__content"><a
                                                                    href="artist-details.html"
                                                                    className="list__title text-truncate">Jina
                                                                    Moore</a></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="artist-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/large/6.jpg" alt="Rasomi Pelina"/></a>
                                                                <div className="list__content"><a
                                                                    href="artist-details.html"
                                                                    className="list__title text-truncate">Rasomi
                                                                    Pelina</a></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="artist-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/large/7.jpg"
                                                                alt="Pimila Holliwy"/></a>
                                                                <div className="list__content"><a
                                                                    href="artist-details.html"
                                                                    className="list__title text-truncate">Pimila
                                                                    Holliwy</a></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="artist-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/large/8.jpg"
                                                                alt="Karen Jennings"/></a>
                                                                <div className="list__content"><a
                                                                    href="artist-details.html"
                                                                    className="list__title text-truncate">Karen
                                                                    Jennings</a></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-3"><span
                                                        className="search__title">Songs</span> <a href="songs.html"
                                                                                                  className="btn btn-link">View
                                                        All</a></div>
                                                    <div className="row g-4 list">
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="song-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/6.jpg" alt="Hey not me"/></a>
                                                                <div className="list__content"><a
                                                                    href="song-details.html"
                                                                    className="list__title text-truncate">Hey
                                                                    not
                                                                    me</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Rasomi
                                                                        Pelina</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="song-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/7.jpg" alt="Deep inside"/></a>
                                                                <div className="list__content"><a
                                                                    href="song-details.html"
                                                                    className="list__title text-truncate">Deep
                                                                    inside</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Pimila
                                                                        Holliwy</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="song-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/8.jpg" alt="Sadness"/></a>
                                                                <div className="list__content"><a
                                                                    href="song-details.html"
                                                                    className="list__title text-truncate">Sadness</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Karen
                                                                        Jennings</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="song-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/sm2all/9.jpg"
                                                                alt="Electric wave"/></a>
                                                                <div className="list__content"><a
                                                                    href="song-details.html"
                                                                    className="list__title text-truncate">Electric
                                                                    wave</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Lenisa
                                                                        Gory</a></p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-3"><span
                                                        className="search__title">Albums</span> <a href="albums.html"
                                                                                                   className="btn btn-link">View
                                                        All</a></div>
                                                    <div className="row g-4 list">
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="album-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/1.jpg" alt="Mummy"/></a>
                                                                <div className="list__content"><a
                                                                    href="album-details.html"
                                                                    className="list__title text-truncate">Mummy</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Arebica
                                                                        Luna</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="album-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/2.jpg" alt="Hot shot"/></a>
                                                                <div className="list__content"><a
                                                                    href="album-details.html"
                                                                    className="list__title text-truncate">Hot
                                                                    shot</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Gerrina
                                                                        Linda</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="album-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/3.jpg" alt="Own way"/></a>
                                                                <div className="list__content"><a
                                                                    href="album-details.html"
                                                                    className="list__title text-truncate">Own
                                                                    way</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Zunira
                                                                        Willy & Nutty Nina</a></p></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-4 col-sm-6">
                                                            <div className="list__item"><a href="album-details.html"
                                                                                           className="list__cover"><img
                                                                src="images/cover/small/4.jpg" alt="Say yes"/></a>
                                                                <div className="list__content"><a
                                                                    href="album-details.html"
                                                                    className="list__title text-truncate">Say
                                                                    yes</a>
                                                                    <p className="list__subtitle text-truncate"><a
                                                                        href="artist-details.html">Johnny
                                                                        Marro</a></p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="dropdown ms-3 ms-sm-4"><a href="javascript:void(0);"
                                                                                      className="avatar header-text"
                                                                                      role="button" id="user_menu"
                                                                                      data-bs-toggle="dropdown"
                                                                                      aria-expanded="false">
                                                <div className="avatar__image"><img src="images/users/thumb.jpg"
                                                                                    alt="user"/>
                                                </div>
                                                <span className="ps-2 d-none d-sm-block">Androws</span></a>
                                                <ul className="dropdown-menu dropdown-menu-md dropdown-menu-end"
                                                    aria-labelledby="user_menu">
                                                    <li>
                                                        <div className="py-2 px-3 avatar avatar--lg">
                                                            <div className="avatar__image"><img
                                                                src="images/users/thumb.jpg"
                                                                alt="user"/></div>
                                                            <div className="avatar__content"><span
                                                                className="avatar__title">Androws Kinny</span>
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
                                                    <li><a className="dropdown-item d-flex align-items-center"
                                                           href="plan.html"><i
                                                        className="ri-money-dollar-circle-line fs-5"></i> <span
                                                        className="ps-2">Plan</span></a>
                                                    </li>
                                                    <li className="dropdown-divider"></li>
                                                    <li><a
                                                        className="dropdown-item d-flex align-items-center external text-danger"
                                                        href="index.html"><i className="ri-logout-circle-line fs-5"></i>
                                                        <span
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
                                                                    <label style={{margin: "5px 10px"}}>Hãy chọn ảnh đại
                                                                        diện của Bài hát(*)</label>
                                                                    <div style={{display: "flex"}}>
                                                                        <input type={"file"} style={{flex: "1"}}
                                                                               accept={".jpg,.jpeg,.png,.gif"}
                                                                               className="form-control"
                                                                               id="image" onChange={(event) => {
                                                                            if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
                                                                                toast.error('Thêm ảnh thất bại!');
                                                                                event.target.value = null;
                                                                            } else {
                                                                                setImageUpload(event.target.files[0]);
                                                                                previewSelectedImage(event.target.files[0])
                                                                                toast.success('Upload ảnh thành công');
                                                                            }
                                                                        }}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Hãy nhập tên Bài
                                                                    hát(*)</label>
                                                                <div className="requiredInput">
                                                                    <Field type="text" name="nameSong" id="nameSong"
                                                                           className="form-control"
                                                                           placeholder="Tên bài hát"
                                                                           onInput={handleInputCreateSong} required/>

                                                                </div>
                                                            </div>
                                                            <span className="fomik-error" style={{color: "red"}}><ErrorMessage
                                                                name={'nameSong'}/></span>

                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Hãy chọn file của Bài hát(*)</label>
                                                                <div className="requiredInput">
                                                                    <input type="file" id="audio"
                                                                           className="form-control"
                                                                           accept={".mp3,.mp4"}
                                                                           onChange={(event) => {
                                                                               if (!event.target.files[0].name.match(/\.(mp3|mp4)$/)) {
                                                                                   toast.error('Thêm bài hát thất bại!');
                                                                                   event.target.value = null;
                                                                               } else {
                                                                                   setAudioUpload(event.target.files[0])
                                                                                   toast.success('Thêm bài hát thành công');
                                                                               }
                                                                           }}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Hãy nhập tên của Ca sỹ(*)</label>
                                                                <div className="requiredInput requiredSinger">
                                                                    <Field type="text" id="nameSinger" name="nameSinger"
                                                                           className="form-control"
                                                                           placeholder="Ca sỹ thực hiện"
                                                                           onInput={handleInputCreateSong}
                                                                           />
                                                                </div>
                                                            </div>
                                                            <span className="fomik-error" style={{color: "red"}}><ErrorMessage name={'nameSinger'}/></span>
                                                            <div className="col-12 mb-4">
                                                                <label style={{margin: "5px 10px"}}>Hãy chọn thể loại
                                                                    Bài hát(*)</label>
                                                                <div className="requiredInput">
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
                                                                <label style={{margin: "5px 10px"}}>Hãy nhập tiêu đề Bài hát</label>
                                                                <textarea id="description"
                                                                          name="description"
                                                                          cols="30"
                                                                          rows="4"
                                                                          className="form-control requiredDescription"
                                                                          placeholder="Tiêu đề"
                                                                            style={{whiteSpace: "pre-wrap"}}
                                                                          onChange={handleInputCreateSong}>
                                                                </textarea>
                                                                <span className="fomik-error" style={{color: "red"}}><ErrorMessage
                                                                    name={'description'}/></span>
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