import DiaryRegisterForm from "./components/diary/DiaryRegisterForm";
import UserLoginForm from "./components/user/UserLoginForm";
import UserRegisterForm from "./components/user/UserRegisterForm";

function App() {
    return (
        <div className="App">
            <UserLoginForm />
            <UserRegisterForm />
            <DiaryRegisterForm />
        </div>
    );
}

export default App;
