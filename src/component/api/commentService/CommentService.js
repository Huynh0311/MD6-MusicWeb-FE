import axios from "../utils/axiousCustomize";
const sendCommentAPI = (commentInfoObj) => {
    return axios.post("comments/add", commentInfoObj);
}
const getAllCommentBySongIdAPI = (id) => {
    return axios.get(`comments/${id}`);
}

export {
    sendCommentAPI,
    getAllCommentBySongIdAPI
}