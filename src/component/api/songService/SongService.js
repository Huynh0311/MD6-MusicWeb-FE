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
export {
    addSongSV,
    getAllGenres,
    getSongByID,
    playSong,
    getAllSongByGenresIDAPI
}