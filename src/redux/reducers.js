// reducers.js
import {
    CHANGE_STATUS,
    COUNT_UNREAD_NOTIFY,
    DELETE_ACCOUNT,
    EDIT_ACCOUNT,
    GET_ALL_NOTIFY,
    SAVE_ACCOUNT,
    SAVE_SONGS
} from './actions';

const initialState = {
    account: localStorage.getItem("data") ?
        JSON.parse(localStorage.getItem("data")) :
        {},
    songs: localStorage.getItem("songs") ?
        JSON.parse(localStorage.getItem("songs")) : [],
    unreadNotify: 0,
    notifyList: [],
    toggleStatus: true

};


export const accountInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT:
            return {
                ...state,
                account: action.payload
            };
        case EDIT_ACCOUNT:
            return {
                 ...state,
                account: action.payload
            };

        case DELETE_ACCOUNT:
            return {
                ...state,
                account: {}
            };
        case SAVE_SONGS:
            const songs = [...state.songs]
            songs.push(action.payload)
            return {
                ...state,songs: songs
            }
        case COUNT_UNREAD_NOTIFY:
            return {
                ...state,
                unreadNotify: action.payload
            };
        case GET_ALL_NOTIFY:
            return {
                ...state,
                notifyList: action.payload
            };
        case CHANGE_STATUS:
            return {
                ...state,
                toggleStatus: !state.toggleStatus
            }
        default:
            return state;
    }
}
