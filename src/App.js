import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import Loader from "./component/Loader";
import CreateSong from "./component/song/createSong/createSong";
import DetailSong from "./component/song/DetailSong/DetailSong";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path="/" element={<BodyComponent/>}/>
                <Route path="/create" element={<CreateSong/>}/>
                <Route path="/detailSong/:id" element={<DetailSong/>}/>
            </Routes>
        </div>
    );
}

export default App;
