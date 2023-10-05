import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import Loader from "./component/Loader";
import RegisterComponent from "./component/RegisterComponent";
import NavbarComponent from "./component/navbarComponent";
import LoginComponent from "./component/LoginComponent";

function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    return (
        <div className="App">
            {showNavbar && <NavbarComponent/>}
            <Loader/>
            <Routes>
                <Route path="/register" element={<RegisterComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/login" element={<LoginComponent setShowNavbar={setShowNavbar}/>}/>
                <Route path="/" element={<BodyComponent/>}/>
            </Routes>
        </div>
    );
}

export default App;