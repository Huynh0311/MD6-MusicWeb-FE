import './App.css';
import {Route, Routes} from "react-router-dom";
import BodyComponent from "./component/BodyComponent";
import NavbarComponent from "./component/navbarComponent";
import Loader from "./component/Loader";
import UpdateAccount from "./component/Account/updateAccount";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UpdatePassword from "./component/Account/updatePassword";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>
            <Loader/>
            <Routes>
                <Route path={'/'} element={<BodyComponent/>}></Route>
                <Route path={"/updateProfile/:id"} element={<UpdateAccount/>}/>
                <Route path={"/updatePassword/:id"} element={<UpdatePassword/>}/>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
