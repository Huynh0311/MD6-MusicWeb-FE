import axios from "../utils/AxiosCustomize";
const isLikedAPI = (likeObj) => {
    return axios.post("likes/check", likeObj);
}

const getSongLikeQuantityAPI = (id) => {
    return axios.get(`likes/getlike/${id}`);
}

const likeClickAPI=(id) => {
    return axios.post(`likes/setlike/${id}`)
}


export {
    isLikedAPI,
    getSongLikeQuantityAPI,
    likeClickAPI
}
