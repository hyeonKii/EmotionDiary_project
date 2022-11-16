import { QueryClientProvider, QueryClient } from "react-query";

import DiaryRegisterForm from "./component/Diary/DiaryRegisterForm";
import UserRegisterForm from "./component/user/UserRegisterForm";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <UserRegisterForm />
                <DiaryRegisterForm />
            </div>
        </QueryClientProvider>
    );
}

export default App;
