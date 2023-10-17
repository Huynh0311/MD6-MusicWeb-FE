// reducers.js
import {DELETE_ACCOUNT, EDIT_ACCOUNT, SAVE_ACCOUNT, SAVE_SONGS} from './actions';

const initialState = {
    account: JSON.parse(localStorage.getItem("account")) ?
        JSON.parse(localStorage.getItem("account")) :
        {},
    songs: localStorage.getItem("songs") ?
        JSON.parse(localStorage.getItem("songs")) : []

};


export const accountInfo = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT:
            return {
                account: action.payload
            };
        case EDIT_ACCOUNT:
            return {
                account: {...action.payload}
            };

        case DELETE_ACCOUNT:
            return {
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
