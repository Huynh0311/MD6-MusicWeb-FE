import React, {useState} from 'react';

const AudioPlayer = ({audioUrl}) => {
    const [audio] = useState(new Audio(audioUrl));
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button onClick={toggleAudio}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default AudioPlayer;