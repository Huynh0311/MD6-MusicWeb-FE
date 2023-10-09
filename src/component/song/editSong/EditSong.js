import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";

import "./EditSong.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";



const validateSchema = Yup.object().shape({
    nameSong: Yup.string()
        .min(5, 'Song name must be at least 5 characters long')
        .max(50, 'Song name must be maximum 50 characters long')
        .required('Song name cannot be null'),
    singer: Yup.string()
        .min(3, 'Artists name must be at least 3 characters long')
        .max(150, 'Artists name must be maximum 150 characters long')
        .required('Artists name cannot be null'),
});


const EditSong = () => {
    const { songid } = useParams();


    useEffect(() => {
        fetch("http://localhost:8080/songs/" + songid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            descriptionchange(resp.description);
            img_songchange(resp.imgSong);
            name_songchange(resp.nameSong);
            path_songchange(resp.pathSong);
            genres_idchange(resp.genres);
            singerchange(resp.singers);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idchange] = useState("");
    const [description, descriptionchange] = useState("");
    const [imgSong, img_songchange] = useState("");
    const [nameSong, name_songchange] = useState("");
    const [pathSong, path_songchange] = useState("");
    const [genres, genres_idchange] = useState("");
    const [singers, singerchange] = useState("");

    const navigate = useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        const songdata = {id, description, imgSong, nameSong, pathSong, genres, singers};

        fetch("http://localhost:8080/songs/edit"+ songid, {
            method:"POST",
            headers:{"content-type": "application/json"},
            body:JSON.stringify(songdata)
        }).then((res) => {
            alert('Update Tour Ok')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (


                <Form className="container" onSubmit={handlesubmit}>
                    <div>
                        <header id="header">
                        </header>
                        <main id="page_content">
                            <div className="hero" style={{backgroundImage: "url(images/banner/song.jpg)"}}></div>
                            <div className="under-hero container">
                                <div className="section" style={{marginTop: "-150px"}}>
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
                                                                        aria-selected="true">Edit
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
                                                                {/*<img src={previewImage || defaultImg} alt="Preview"*/}
                                                                     id="previewImage"
                                                                     style={{
                                                                         width: "400px",
                                                                         height: "400px",
                                                                         marginBottom: "20px"
                                                                     }}/>
                                                                <div style={{display: "flex"}}>
                                                                    <span style={{marginRight: "5px"}}>*</span>
                                                                    <input value={imgSong} type={"file"} className="form-control"
                                                                           id="image" onChange={(event) => {

                                                                    }}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 mb-4 requiredInput">
                                                                <span>*</span>
                                                                <Field type="text" name="nameSong" id="nameSong"
                                                                       className="form-control"
                                                                       placeholder="Song name"

                                                                        />
                                                            </div>
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'nameSong'}/></span>

                                                            <div className="col-12 mb-4 requiredInput">
                                                                <span>*</span>
                                                                <input disabled="disabled" type="file" id="audio" className="form-control"
                                                                       onChange={(event) => {

                                                                       }}/>
                                                            </div>
                                                            <div className="col-sm-6 mb-4 requiredInput">
                                                                <span>*</span>
                                                                <Field value={singers}
                                                                    type="text" id="singer" name="singer"
                                                                       className="form-control"
                                                                       placeholder="Singer"

                                                                       style={{width: "200%"}}/>
                                                            </div>
                                                            <span style={{color: "red"}}><ErrorMessage name={'singer'}/></span>
                                                            <div className="col-12 mb-4 requiredInput">
                                                                <span>*</span>
                                                                <select id="genres_id" className="form-select"

                                                                        aria-label="Select category">

                                                                </select>
                                                            </div>

                                                            <div className="col-12 mb-4 requiredInput">
                                                                <textarea id="description" value={description}
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

                                                    <button>Add Music</button>
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
                        </div>
                    </div>
                </Form>
    )

};


export default EditSong;
