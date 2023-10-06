import axios from "../utils/axiousCustomize";

const addSongSV = (form) => {
    return axios.post("songs/add",form);
}

const getAllGenres =() =>{
    return axios.get("/genres");
}


const getSongByID=(id) => {
    return axios.get(`songs/find/${id}`);
}
export {addSongSV,
    getAllGenres,
    getSongByID}


