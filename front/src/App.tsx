import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import Footer from "./components/UI/Footer";
import useSetUser from "./hooks/useSetUser";

function App() {
    const { isLoading, setUser: setUser } = useSetUser();

    const [loadingCheck, setLoadingCheck] = useState(false);

    const fetchUser = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            setLoadingCheck(true);
            return;
        }

        setUser().then(() => {
            setLoadingCheck(true);
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        !isLoading &&
        loadingCheck && (
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
