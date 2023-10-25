import React, {createContext, useContext, useState} from 'react';

export const AudioPlayerContext = createContext();


export function AudioPlayerProvider({children}) {
    const [currentSong, setCurrentSong] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isPlaying,setIsPlaying] = useState(false);
    const [currentPlaylist,setCurrentPlaylist] = useState();
    const [allCurrentComments, setAllCurrentComments] = useState([]);

    const updateAllCurrentComments = (playlist) => {
        setAllCurrentComments(playlist);
    };

    const updateCurrentPlaylist = (playlist) => {
        setCurrentPlaylist(playlist);
    };


    const updateCurrentSongAndSongs = (song, songList) => {
        setCurrentSong(song);
        setSongs(songList);
    };
    const handlePlayToggle = (isPlaying) => {
        setIsPlaying(isPlaying)
    };

    return (
        <AudioPlayerContext.Provider value={{currentSong, songs, setCurrentSong, setSongs, updateCurrentSongAndSongs,isPlaying,handlePlayToggle,currentPlaylist,updateCurrentPlaylist,updateAllCurrentComments,allCurrentComments}}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => {
    return useContext(AudioPlayerContext);
};