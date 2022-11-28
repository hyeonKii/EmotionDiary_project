import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import useSetUser from "./hooks/useSetUser";

function App() {
    const { setUser: setUser } = useSetUser();

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
        <Router>
            <Header />
            <Footer />
        </Router>
    );
}

export default App;
