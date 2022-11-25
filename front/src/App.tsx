import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useFetchUser } from "./api/account";
import Header from "./components/UI/Header";
import User from "./components/user/User";

function App() {
    const { refetch: getUser } = useFetchUser(["user"], {
        enabled: false,
        retry: 3,

        onSuccess: (res) => {
            const {
                User: { nickname },
            } = res.data;

            console.log(nickname);
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
        </Router>
    );
}

export default App;
