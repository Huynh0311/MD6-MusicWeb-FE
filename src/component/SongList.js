import React, { Component } from 'react';
import axios from 'axios';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            singerId: 2,
        };
    }

    componentDidMount() {
        this.fetchSongsBySinger();
    }

    fetchSongsBySinger() {
        axios.get(`/api/SingerSong/getSongsBySinger/${this.state.singerId}`)
            .then((response) => {
                this.setState({ songs: response.data });
            })
            .catch((error) => {
                console.error('Error fetching songs:', error);
            });
    }

    render() {
        const { songs } = this.state;

        return (
            <div>
                <h2>Songs by Singer</h2>
                <ul>
                    {songs.map((song) => (
                        <li key={song.id}>{song.nameSong}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SongList;