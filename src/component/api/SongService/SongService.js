import axios from "../utils/axiousCustomize";

const addSongSV = (form) => {
    return axios.post("/songs/add",form)
}

const getAllGenres =() =>{
    return axios.get("/genres")
}

export {addSongSV,
        getAllGenres}