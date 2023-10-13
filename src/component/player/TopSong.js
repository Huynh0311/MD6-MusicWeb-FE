import React, { Component } from 'react';
import axiosInstance from "../api/service/axios-instance";

class Top5Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
        };
    }

    async componentDidMount() {
        try {
            const response = await axiosInstance.get('/songs/top5ByPlays');
            const songs = response.data;
            this.setState({ songs });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát:', error);
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.songs.map((song) => (
                        <div className="list">
                            <div className="list__item" data-song-id={song.id}
                                 data-song-name="Shack your butty" data-song-artist={song.nameSong}
                                 data-song-album="Hot shot" data-song-url={song.pathSong}
                                 data-song-cover={song.imgSong}
                                 style={{width:"100%"}}>
                                <div className="list__cover">
                                    <img src={song.imgSong} alt="Shack your butty"/>
                                    <a href="javascript:void(0);"
                                       className="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                                       data-play-id={song.id} aria-label="Play pause">
                                        <i className="ri-play-fill icon-play"></i> <i
                                        className="ri-pause-fill icon-pause"></i>
                                    </a>
                                </div>
                                <div className="list__content">
                                    <a href="song-details.html" className="list__title text-truncate">{song.nameSong}</a>
                                    <p className="list__subtitle text-truncate"><a
                                        href="artist-details.html">{song.description}</a></p>
                                </div>
                                <ul className="list__option">
                                    <li><span className="badge rounded-pill bg-info"><i
                                        className="ri-vip-crown-fill"></i></span></li>
                                    <li><a href="javascript:void(0);" role="button"
                                           className="d-inline-flex" aria-label="Favorite"
                                           data-favorite-id={song.id}>
                                        <i className="ri-heart-line heart-empty"></i> <i
                                        className="ri-heart-fill heart-fill"></i>
                                    </a></li>
                                    <li className="dropstart d-inline-flex">
                                        <a className="dropdown-link" href="javascript:void(0);"
                                           role="button" data-bs-toggle="dropdown"
                                           aria-label="Cover options" aria-expanded="false">
                                            <i className="ri-more-fill"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-sm">
                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                   role="button" data-play-id={song.id}>Add to
                                                playlist</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                   role="button" data-play-id={song.id}>Add to queue</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                   role="button" data-play-id={song.id}>Next to play</a></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                   role="button">Share</a></li>
                                            <li className="dropdown-divider"></li>
                                            <li><a className="dropdown-item" href="javascript:void(0);"
                                                   role="button" data-play-id={song.id}>Play</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    ))}
                </ul>
            </div>
        );
    }
}

export default Top5Songs;