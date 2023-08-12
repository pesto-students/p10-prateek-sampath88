import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import Room from "./components/room";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Room />
      </div>
    </Provider>
  );
}

export default App;
