import "./App.css";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="App">
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
