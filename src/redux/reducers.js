// reducers.js
import {DELETE_ACCOUNT, EDIT_ACCOUNT, SAVE_ACCOUNT, SAVE_SONGS} from './actions';

const initialState = {
    account: localStorage.getItem("data") ?
        JSON.parse(localStorage.getItem("data")) :
        {},
    songs: localStorage.getItem("songs") ?
        JSON.parse(localStorage.getItem("songs")) : []

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
        default:
            return state;
    }
}
