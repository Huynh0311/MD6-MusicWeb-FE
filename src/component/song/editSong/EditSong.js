import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import "./EditSong.css"

import {toast} from "react-toastify";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebase/Firebase";
import {v4} from "uuid";
import {getAllGenres} from "../../api/songService/SongService";


const EditSong = () => {
    const {songid} = useParams();

    useEffect(() => {
        fetch("http://localhost:8080/songs/" + songid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            descriptionchange(resp.description);
            img_songchange(resp.imgSong);
            name_songchange(resp.nameSong);
            path_songchange(resp.pathSong);
            singerchange(resp.nameSinger);
            setGenres(resp.genres);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idchange] = useState("");
    const [description, descriptionchange] = useState("");
    const [imgSong, img_songchange] = useState("");
    const [nameSong, name_songchange] = useState("");
    const [pathSong, path_songchange] = useState("");
    const [nameSinger, singerchange] = useState("");
    const [genres, setGenres] = useState({id: 1});
    const [genresList, setGenresList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const uploadImg = (even) => {
        if (!even.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            toast.error('Thêm ảnh thất bại!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (even.target.files[0] == null) return;
            const imageRef = ref(storage, `images/${even.target.files[0].name + v4()}`);
            uploadBytes(imageRef, even.target.files[0]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    img_songchange(url)
                    previewSelectedImage(even.target.files[0]);
                    toast.success('Upload ảnh thành công', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
            });
        }
    }

    const showGenres = async () => {
        const response = await getAllGenres()
        setGenresList(response.data)
    }
    useEffect(() => {
        showGenres();
    }, [])

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

    const handlesubmit = (e) => {
        e.preventDefault();
        const songdata = {id, description, imgSong, nameSong, genres, pathSong, nameSinger};

        fetch("http://localhost:8080/songs/edit/" + songid, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(songdata)
        }).then((res) => {
            alert('Cập nhật bài hát thành công')
            navigate('/song');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <main id="page_content">
            <div className="hero"
                 style={{backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/test-upload-image-4f5e4.appspot.com/o/song.jpg?alt=media&token=01b02d65-1ab1-48cc-9e7f-18c039ca71ce&_gl=1*cq3ko9*_ga*MTM5ODIyMjY1MS4xNjk2MzgyMTgz*_ga_CW55HF8NVT*MTY5Njk5ODA0NC4xNC4xLjE2OTY5OTgzMTIuNDguMC4w')"}}></div>
            <div className="under-hero container">
                <form className="section" onSubmit={handlesubmit}>
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
                                                        aria-selected="true">Chỉnh sửa bài hát
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
                                                <div>
                                                    <div>
                                                        <img src={imgSong} id="previewImage"
                                                             style={{
                                                                 width: "400px",
                                                                 height: "400px",
                                                                 marginBottom: "20px",
                                                                 marginLeft: "100px"
                                                             }}/>
                                                    </div>
                                                    <label style={{margin: "5px 10px"}}>Hãy chọn ảnh đại diện của Bài
                                                        hát</label>
                                                    <div className="">
                                                        <input type="file" className="form-control" id="image"
                                                               onChange={uploadImg}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div>
                                                <div className="col-12 mb-4 ">
                                                    <label style={{margin: "5px 10px"}}>Hãy nhập tên Bài hát</label>
                                                    <input required value={nameSong} type="text" name="nameSong"
                                                           onChange={e => name_songchange(e.target.value)} id="nameSong"
                                                           className="form-control"
                                                           placeholder="Tên bài hát"/>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="col-12 mb-4 ">
                                                    <label style={{margin: "5px 10px"}}>Hãy chọn file của Bài
                                                        hát</label>
                                                    <div>
                                                        <input disabled="disabled" type="file" id="audio"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                               }}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 mb-4 ">
                                                <label style={{margin: "5px 10px"}}>Hãy nhập tên của Ca sỹ</label>
                                                <input value={nameSinger}
                                                       type="text" id="singer" name="singer"
                                                       onChange={e => singerchange(e.target.value)}
                                                       className="form-control"
                                                       placeholder="Tên ca sĩ"
                                                       style={{width: "200%"}}/>
                                            </div>

                                            <div className="col-12 mb-4 ">
                                                <label style={{margin: "5px 10px"}}>Hãy chọn thể loại Bài hát</label>
                                                <select id="genres_id" className="form-select"
                                                        value={genres.id} onChange={(e) => {
                                                    setGenres({id: e.target.value});
                                                }}
                                                        aria-label="Select category">
                                                    {genresList.map((g) => {
                                                        return (
                                                            <option key={g.id}
                                                                    value={g.id}>{g.name}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>

                                            <div className="col-12 mb-4 ">
                                                <label style={{margin: "5px 10px"}}>Hãy nhập tiêu đề Bài hát</label>
                                                <textarea required id="description" value={description}
                                                          onChange={e => descriptionchange(e.target.value)}
                                                          name="description"
                                                          cols="30"
                                                          rows="4"
                                                          className="form-control"
                                                          placeholder="Describle"

                                                ></textarea>
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
                                            'Chỉnh sửa'
                                        )}
                                    </button>
                                    <button className="btn btn-danger">Hủy bỏ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </main>
    )

};


export default EditSong;
