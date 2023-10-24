import axios from "../utils/AxiosCustomize";

const playlistLikeClickAPI = (id) => {
    return axios.post(`playlistLikes/setlike/${id}`);
}

export {
   playlistLikeClickAPI
}