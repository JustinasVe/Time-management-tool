import { Route, Routes, useNavigate } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Calculations from "./pages/Calculations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContextWrapper";
import LOCAL_STORAGE_JWT_TOKEN_KEY from "./constants";

function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) { 
          const { id, email } = data;
          setUser({ id, email });
          navigate('/');
        }
      })
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
        <Route path="/calculations" element={<Calculations />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
