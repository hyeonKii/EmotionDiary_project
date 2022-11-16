import { QueryClientProvider, QueryClient } from "react-query";

import DiaryRegisterForm from "./components/diary/DiaryRegisterForm";
import UserLoginForm from "./components/user/UserLoginForm";
import UserRegisterForm from "./components/user/UserRegisterForm";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <UserLoginForm />
                <UserRegisterForm />
                <DiaryRegisterForm />
            </div>
        </QueryClientProvider>
    );
}

export default App;
