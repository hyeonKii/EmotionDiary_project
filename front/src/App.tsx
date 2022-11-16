import { QueryClientProvider, QueryClient } from "react-query";
import RegisterForm from "./component/User/RegisterForm";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <RegisterForm />
            </div>
        </QueryClientProvider>
    );
}

export default App;
