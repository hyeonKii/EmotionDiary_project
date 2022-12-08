import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

import Header from "./components/UI/Header";
import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import IntroducePage from "@/pages/IntroducePage";
import Footer from "./components/UI/Footer";

import useSetUser from "./hooks/useSetUser";

import { darkTheme, lightTheme } from "@/styles/common/theme";
import { ThemeEnums, themeMode } from "@/temp/themeAtom";

function App() {
    const theme: ThemeEnums = useRecoilValue(themeMode);
    const { LIGHT } = ThemeEnums;

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
            <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/intro" element={<IntroducePage />} />
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
