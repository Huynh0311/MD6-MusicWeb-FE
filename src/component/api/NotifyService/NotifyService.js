import instance from "../utils/AxiosCustomize";

const getAllNotifyByAccountLogin = (accountId) => {
    return instance.get(`/notification/${accountId}`)
}

const countUnreadNotifyByAccountLogin = (accountId) => {
    return instance.get(`/notification/count-unread/${accountId}`)
}

const changeStatusNotify = (accountId) => {
    return instance.put(`/notification/change-status/${accountId}`)
}

const saveNotify = (notify) => {
    return instance.post('/notification', notify)
}

export {
    getAllNotifyByAccountLogin,
    countUnreadNotifyByAccountLogin,
    changeStatusNotify,
    saveNotify
};