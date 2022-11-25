import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useFetchUser } from "./api/account";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { currentUser } from "./temp/userAtom";

function App() {
    const setUser = useSetRecoilState(currentUser);

    const { refetch: getUser } = useFetchUser(["user"], {
        enabled: false,
        retry: 3,

        onSuccess: (res) => {
            const {
                User: { nickname },
            } = res.data;

            setUser({ nickname });
        },

        onError: (error) => {
            console.log(error.message);
        },
    });

    const fetchUser = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            return;
        }

        getUser();
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
