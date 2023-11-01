import axios from "../utils/AxiosCustomize";
const sendCommentAPI = (commentInfoObj) => {
    return axios.post("comments/add", commentInfoObj);
}
const getAllCommentBySongIdAPI = (id) => {
    return axios.get(`comments/getAll/${id}`);
}

export {
    sendCommentAPI,
    getAllCommentBySongIdAPI
}
