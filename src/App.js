import "./App.css";
import ProductDetail from "./Product/ProductDetail";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
    <ProductDetail />

    <Toaster />
    </div>
  );
}

export default App;
