import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {getAllPlaylist} from "../api/PlaylistService/PlaylistService";


export default function TopPlaylist(){
    const [listPlaylist,setListPlaylist] = useState([]);
    const [playlistCounts, setPlaylistCounts] = useState(0);
    useEffect(() => {
        getAllPlaylist().then(res => {
            console.log(res.data)
            setListPlaylist(res.data)
            fetchPlaylistCounts(res.data);
        })
    }, [])
    const fetchPlaylistCounts = async (playlists) => {
        const counts = {};
        for (const playlist of playlists) {
            try {
                const res = await axios.get(`http://localhost:8080/playlist/countSong/${playlist.id}`);
                counts[playlist.id] = res.data;
            } catch (error) {
                counts[playlist.id] = 0;
            }
        }
        setPlaylistCounts(counts);
        console.log(playlistCounts)
    };

    return (
        <div className="section">
            <div className="section__head">
                <div className="flex-grow-1">
                    <span className="section__subtitle">Collection to listen</span>
                    <h3 className="mb-0">Best <span className="text-primary">Playlist</span></h3>
                </div>
                <a href="albums.html" className="btn btn-link">View All</a>
            </div>
            <div className="swiper-carousel">
                <div className="swiper" data-swiper-slides="4" data-swiper-autoplay="true">
                    <div className="swiper-wrapper">
                        {listPlaylist.map((item) => (
                            <div className="swiper-slide" key={item.id}>
                                <div className="cover cover--round">
                                    <div className="cover__image">
                                        <Link to={`/detailPlaylist/${item.id}`}>
                                            <img src={item.playlistImg} alt="DJ Remix" />
                                        </Link>
                                        <div className="cover__image__content">
                                            <Link to={`/detailPlaylist/${item.id}`} className="cover__title mb-1 fs-6 text-truncate">{item.namePlaylist}</Link>
                                            <span className="cover__subtitle">{playlistCounts[item.id]} Songs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="swiper-button-prev btn-default rounded-pill"></div>
                <div className="swiper-button-next btn-default rounded-pill"></div>
            </div>
        </div>
    );
}
