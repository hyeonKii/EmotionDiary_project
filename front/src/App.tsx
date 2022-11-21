import { useEffect } from "react";
import DiaryRegister from "./components/diary/DiaryRegister";
import Header from "./components/UI/Header";
import User from "./components/user/User";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";

function App() {
    useEffect(() => {});

    return (
        <div className="App">
            <Header />
            <User />
            <UserLogin />
            <UserRegister />
            <DiaryRegister />
        </div>
    );
}

export default App;
