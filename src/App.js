import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import Loader from "./component/Loader";
import EditProfile from "./component/EditProfile";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path={'/'} element={<BodyComponent/>}></Route>
                <Route path={"/edit"} element={<EditProfile/>}/>
            </Routes>
        </div>
    );
}

export default App;
