import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";

import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import IntroducePage from "@/pages/IntroducePage";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import Loading from "@/components/UI/Loading";
import useSetUser from "@/hooks/useSetUser";
import { ThemeEnums, themeMode } from "@/temp/themeAtom";
import { darkTheme, lightTheme } from "@/styles/common/theme";

function App() {
    const theme: ThemeEnums = useRecoilValue(themeMode);
    const { LIGHT } = ThemeEnums;

    const { isLoading, setUser: setUser } = useSetUser();

    const [loadingCheck, setLoadingCheck] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = sessionStorage.getItem("accessToken");
            const refreshToken = sessionStorage.getItem("refreshToken");

            if (!accessToken || !refreshToken) {
                setLoadingCheck(true);
                return;
            }

            await setUser();
            setLoadingCheck(true);
        };

        fetchUser();
    }, []);

    return isLoading ? (
        <Loading />
    ) : !loadingCheck ? (
        <Loading />
    ) : (
        <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/intro" element={<IntroducePage />} />
                    <Route path="/diary" element={<Diary />} />
                </Routes>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
