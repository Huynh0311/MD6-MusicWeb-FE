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

const findListSongFavorite = () =>{
    return axios.get(`apiAccount/favorites`)
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
const findAccountBySong = (id) => {
    return axios.get(`songs/findAccountBySong/${id}`)
}

const isSongOwnedByLoggedInAccount = (id) => {
    return axios.get(`songs/checkOwned/${id}`)
}

const removeCommentInASongByCommentID = (idSong,idComment) => {
    return axios.post(`songs/removeComment/${idSong}/${idComment}`)
}

const getAllSongByIdDesc = () => {
    return axios.get(`/songs/getAllDesc`)
}

export {
    findAccountBySong,
    addSongSV,
    getAllGenres,
    getSongByID,
    playSong,
    getAllSongByGenresIDAPI,
    findListSongFavorite,
    searchListSongByName,
    searchListSongByNameSinger,
    searchListSongByNamePlaylist,
    isSongOwnedByLoggedInAccount,
    removeCommentInASongByCommentID,
    getAllSongByIdDesc
}