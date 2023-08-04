import "./App.css";
import HomePage from "pages/home";
import Navbar from "components/navbar";

function App() {
  return (
    <div className="App bg-gray-900 antialiased">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
