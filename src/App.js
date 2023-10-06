import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import Loader from "./component/Loader";
import ListSong from "./component/song/listSong/ListSong";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path={'/'} element={<BodyComponent/>}></Route>
                <Route path='/song/all' element={<ListSong />}></Route>
            </Routes>
        </div>
    );
}

export default App;
