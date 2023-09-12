import { Provider } from "react-redux";
import "./App.css";
import StepCounter from "./components/step-counter";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StepCounter />
      </div>
    </Provider>
  );
}

export default App;
