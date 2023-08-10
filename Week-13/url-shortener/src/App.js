import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import HomePage from "pages/home";
import Navbar from "components/navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-gray-900 antialiased">
        <Navbar />
        <HomePage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
