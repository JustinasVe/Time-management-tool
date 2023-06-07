import { Route, Routes } from "react-router-dom";
import Calculations from "./pages/Calculations";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home route</div>} />
        <Route path="/register" element={<div>Register route</div>} />
        <Route path="/calculations" element={<Calculations />} />
      </Routes>
    </div>
  );
}

export default App;
