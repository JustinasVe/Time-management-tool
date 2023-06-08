import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Calculations from "./pages/Calculations";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout user={user}/>}>
        <Route path="/calculations" element={<Calculations />} />
        </Route>
        <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
