import { useEffect } from "react";
import { QueryClient } from "react-query";
import Header from "./components/UI/Header";
import Loading from "./components/UI/Loading";
import User from "./components/user/User";
import UserRegister from "./components/user/UserRegister";

function App() {
    const queryClient = new QueryClient();

    if (queryClient.getQueryData["accessToken"]) {
    }

    useEffect(() => {}, []);

    return isLoading ? (
        <Loading />
    ) : (
        <div className="App">
            <Header />
            <User />
            <UserRegister />
        </div>
    );
}

export default App;
