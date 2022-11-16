import { QueryClientProvider, QueryClient } from "react-query";

import DiaryRegisterForm from "./component/Diary/DiaryRegisterForm";
import RegisterForm from "./component/User/UserRegisterForm";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <RegisterForm />
                <DiaryRegisterForm />
            </div>
        </QueryClientProvider>
    );
}

export default App;
