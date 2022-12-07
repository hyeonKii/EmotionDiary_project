import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

import Header from "./components/UI/Header";
import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import Footer from "./components/UI/Footer";

import useSetUser from "./hooks/useSetUser";
import { isDarkAtom } from "@/temp/themeAtom";
import { darkTheme, lightTheme } from "./styles/common/theme";

function App() {
    const isDark = useRecoilValue(isDarkAtom);
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
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/diary" element={<Diary />} />
                    </Routes>
                    <Footer />
                </Router>
            </ThemeProvider>
        )
    );
}

export default App;
