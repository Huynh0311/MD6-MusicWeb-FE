import axios from "../utils/AxiosCustomize";


const getAllPlaylist = () => {
    return axios.get('/playlist/all');
}

const getAllPlaylistById = (id) => {
    return axios.get('/playlist/findByAccountId/' + id);
}


const findPlaylistById = (id) => {
    return axios.get(`playlist/findOne/${id}`);
}

const getAllPlaylistWithLikeQuantity = () => {
    return axios.get(`playlist/getAllWithLikeQuantity`);
}



export {
   getAllPlaylist,findPlaylistById,getAllPlaylistWithLikeQuantity
}