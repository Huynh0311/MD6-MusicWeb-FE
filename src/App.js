import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import SongList from "./component/SongList";
import Loader from "./component/Loader";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path="/" element={<BodyComponent/>}/>
                <Route path="/SongList" element={<SongList/>}/>
            </Routes>
        </div>
    );
}

export default App;
