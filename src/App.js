import "./App.css";
import Header from "./Components/Header";
import Invoice from "./Components/Invoice";
import Order from "./Components/Order";
import Upload from "./Components/Upload";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </div>
  );
}

export default App;
