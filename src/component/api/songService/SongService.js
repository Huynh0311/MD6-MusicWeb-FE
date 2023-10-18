import axios from "../utils/AxiosCustomize";

const addSongSV = (form) => {
    return axios.post("songs/add", form);
}

const getAllGenres = () => {
    return axios.get("/genres");
}


const getSongByID = (id) => {
    return axios.get(`songs/find/${id}`);
}

const playSong = (id) => {
    return axios.post(`songs/play/${id}`)
}

const getAllSongByGenresIDAPI = (id) => {
    return axios.get(`songs/getByGenresID/${id}`)
}

const searchListSongByName = (name) => {
    return axios.get(`songs/findByName/${name}`)
}

const searchListSongByNameSinger = (name) => {
    return axios.get(`songs/findBySingerName/${name}`)
}

const searchListSongByNamePlaylist = (name) => {
    return axios.get(`songs/findByPlaylist/${name}`)
}
export {
    addSongSV,
    getAllGenres,
    getSongByID,
    playSong,
    getAllSongByGenresIDAPI,
    searchListSongByName,
    searchListSongByNameSinger,
    searchListSongByNamePlaylist
}