import Header from "./components/UI/Header";
import User from "./components/user/User";
import UserLoginForm from "./components/user/UserLoginForm";
import UserRegisterForm from "./components/user/UserRegisterForm";

function App() {
    return (
        <div className="App">
            <Header />
            <User />
            <UserLoginForm />
            <UserRegisterForm />
        </div>
    );
}

export default App;
