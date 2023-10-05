import React from 'react';
import AudioPlayer from './firebase-getUrl'; // Điều này cần thay đổi thành đường dẫn đúng đến tệp AudioPlayer của bạn

const App = () => {
    const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/test-d4d5f.appspot.com/o/images%2Fy2mate.com%20-%20Adele%20%20Hello%20Official%20Music%20Video_320kbps.mp3?alt=media&token=64d12c6e-a130-4125-9b5b-236f7314f138';
    return (
        <div>
            <h1>Audio Player</h1>
            <AudioPlayer audioUrl={audioUrl} />
        </div>
    );
};

export default App;