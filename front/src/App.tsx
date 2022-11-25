import Header from "./components/UI/Header";
import User from "./components/user/User";
import UserLoginForm from "./components/user/UserLoginForm";
import UserRegisterForm from "./components/user/UserRegisterForm";
import { ROUTES_LIST } from "@/routes/route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Header />
            <User />
            <UserLoginForm />
            <UserRegisterForm />
        </div>
        // <div className="App">
        //     <Router>
        //         <Routes>
        //             {ROUTES_LIST.map(({ path, Component }, idx) => (
        //                 <Route key={idx} path={path} element={<Component />} />
        //             ))}
        //         </Routes>
        //     </Router>
        // </div>
    );
}

export default App;
