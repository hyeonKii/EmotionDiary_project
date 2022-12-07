import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "@/pages/HomePage";
import Diary from "@/pages/DiaryPage";
import Footer from "./components/UI/Footer";
import useSetUser from "./hooks/useSetUser";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "@/styles/common/themeAtom";
import { ThemeProvider } from "styled-components";
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
            <Router>
                <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                    <Header />
                    {/* <Home /> */}
                    <Diary />
                    <Footer />
                </ThemeProvider>
            </Router>
        )
    );
}

export default App;
