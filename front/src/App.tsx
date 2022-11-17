import DiaryRegisterForm from "./components/diary/DiaryRegisterForm";
import Header from "./components/UI/Header";
import UserLoginForm from "./components/user/UserLoginForm";
import UserRegisterForm from "./components/user/UserRegisterForm";

function App() {
    return (
        <div className="App">
            <Header />
            <UserRegisterForm />
            <DiaryRegisterForm />
        </div>
    );
}

export default App;
