import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./ListSong.css"

const ListSong = () => {
    const [songdata, songdatachange] = useState(null);

    const navigate = useNavigate();

    const SongDetail = (id) => {
        navigate("/song/" + id);
    }

    const LoadEdit = (id) => {
        navigate("/song/edit/" + id);
    }

    const RemoveFunction = (id) => {
        if (window.confirm('are you sure you want to delete this song?')) {
            fetch("http://localhost:8080/songs/delete/" + id, {
                method: "GET"
            }).then((res) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    React.useEffect(() => {
        fetch("http://localhost:8080/songs/all").then((res) => {
            return res.json();
        }).then((resp) => {
            songdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div >
            <div id="wrapper">
                <header id="header">
                    <div className="container">
                    </div>
                </header>
                <main id="page_content">
                    <div className="hero" style={{ backgroundImage: 'url(../images/banner/song.jpg)' }}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="row">
                                <div className="col-xl-12 col-md-10 mx-auto">

                                        <div className="card-header pb-0 bg-pink text-white">

                                            <div className="container">

                                                <div className="card-title text-center">
                                                    <h2>List Music</h2>
                                                </div>
                                                <div className="card-body">
                                                    <div className="divbtn">
                                                        <button className="btn btn-primary">Add Music</button>
                                                    </div>
                                                    <table className="table table-bordered">
                                                        <thead className="bg-dark text-white">
                                                        <tr className="tr-title-position">
                                                            <td>Song Image</td>
                                                            <td className="namesong-width">Song Name</td>
                                                            <td className="descrip-width">Description</td>
                                                            <td>Action</td>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {   songdata &&
                                                        songdata.map(item=>(
                                                            <tr key={item.id} className="tr-data-position">
                                                                <td className="img-fixed-position"><img src={item.imgSong} width={250} alt="image"/></td>
                                                                <td className="namesong-position"> {item.nameSong}</td>
                                                                <td className="descrip-position descrip-height">{item.description}</td>
                                                                <td><a className="btn btn-success custom-button">Edit</a>
                                                                    <a onClick={() => { RemoveFunction(item.id) }} className="btn btn-danger custom-button">Remove</a>
                                                                    <a  className="btn btn-info custom-button">Details</a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
            </div>

            );
            };

            export default ListSong;

