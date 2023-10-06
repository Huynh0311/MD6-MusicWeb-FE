import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import Loader from "./component/Loader";

import DetailSong from "./component/Song/DetailSong";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path={'/'} element={<BodyComponent/>}></Route>

                <Route path={"song/detailSong/:id"} element={<DetailSong/>}/>
            </Routes>
        </div>
    );
}

export default App;
