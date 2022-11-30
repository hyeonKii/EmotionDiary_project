import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import Footer from "./components/UI/Footer";
import useSetUser from "./hooks/useSetUser";
import UserLogin from "./components/user/UserLogin";

function App() {
    const { isLoading, setUser: setUser } = useSetUser();

    const fetchUser = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            return;
        }

        setUser();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        !isLoading && (
            <Router>
                <Header />
                {/* <Home /> */}
                <Diary />
                <Footer />
            </Router>
        )
    );
}

export default App;
