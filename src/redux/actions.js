export const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const SAVE_SONGS = 'SAVE_SONGS';
export const COUNT_UNREAD_NOTIFY = 'COUNT_UNREAD_NOTIFY';
export const GET_ALL_NOTIFY = 'GET_ALL_NOTIFY';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export const saveAccount = (account) => {
    return {
        type: SAVE_ACCOUNT,
        payload: account
    };
}
export const editAccount = (account) => {
    return {
        type: EDIT_ACCOUNT,
        payload: account
    };
}

export const deleteAccount = () => {
    return {
        type: DELETE_ACCOUNT,
    };
}

export const saveSong = (song) => {
    return {
        type: SAVE_SONGS,
        payload: song
    };
}
export const countUnreadNotify = (count) => {
    return {
        type: COUNT_UNREAD_NOTIFY,
        payload: count
    };
}

export const getAllNotify = (notifyList) => {
    return {
        type: GET_ALL_NOTIFY,
        payload: notifyList
    };
}

export const changeStatus = () => {
    return {
        type: CHANGE_STATUS
    };
}