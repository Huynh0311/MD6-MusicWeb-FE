import React, { Component } from 'react';
import axiosInstance from '../api/service/axios-instance';
import {Link} from "react-router-dom";

class SongList extends Component {
    state = {
        songs: [],
        currentSong: null,
        songsPerPage:4,
        currentPage: 1,
    };

    async componentDidMount() {
        try {
            const response = await axiosInstance.get('/songs/getall');
            const songs = response.data;
            this.setState({ songs });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát:', error);
        }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    calculatePageCount() {
        const { songs, songsPerPage } = this.state;
        return Math.ceil(songs.length / songsPerPage);
    }

    render() {
        const { songs, songsPerPage, currentPage } = this.state;

        const indexOfLastSong = currentPage * songsPerPage;
        const indexOfFirstSong = indexOfLastSong - songsPerPage;
        const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

        const pageCount = this.calculatePageCount();

        return (
            <div className="container">
                <div className="row">
                    {currentSongs.map((song) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={song.id}>
                            <div className="song-card">
                                <div className="cover cover--round" data-song-id={song.id}
                                     data-song-name={song.nameSong}
                                     data-song-url={song.pathSong}
                                     data-song-cover={song.imgSong}>
                                    <div className="cover__head">
                                        <ul className="cover__label d-flex">
                                            <li>
                                                <span className="badge rounded-pill bg-danger">
                                                    <i className="ri-heart-fill"></i>
                                                </span>
                                            </li>
                                        </ul>
                                        <div className="cover__options dropstart d-inline-flex ms-auto">
                                            <a className="dropdown-link" href="javascript:void(0);"
                                               role="button"
                                               data-bs-toggle="dropdown" aria-label="Cover options"
                                               aria-expanded="false">
                                                <i className="ri-more-2-fill"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-sm">
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-favorite-id="1">Favorite</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-playlist-id="1">Add to playlist</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-queue-id="1">Add to queue</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-next-id="1">Next to play</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button">Share</a>
                                                </li>
                                                <li className="dropdown-divider"></li>
                                                <li>
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                       role="button"
                                                       data-play-id="1">Play</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="cover__image">
                                        <img src={song.imgSong} alt={song.nameSong} />
                                        <button type="button"
                                                className="btn btn-play btn-default btn-icon rounded-pill"
                                                data-play-id={song.id}>
                                            <i className="ri-play-fill icon-play"></i>
                                            <i className="ri-pause-fill icon-pause"></i>
                                        </button>
                                    </div>

                                <Link to={"/song/detailSong/" + song.id}>
                                    <div className="cover__foot">
                                        <p className="cover__title text-truncate">
                                            {song.nameSong}
                                        </p>
                                        <p className="cover__subtitle text-truncate">
                                            <a href="artist-details.html"> {song.description}</a>
                                        </p>
                                    </div>
                                </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => this.handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default SongList;
