import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home route</div>} />
        <Route path="/register" element={<div>Register route</div>} />
        <Route path="/calculations" element={<div>Calculations route</div>} />
      </Routes>
    </div>
  );
}

export default App;
