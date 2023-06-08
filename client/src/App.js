import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import UserContextWrapper from "./contexts";
import Calculations from "./pages/Calculations";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <UserContextWrapper>
      <Routes>
        <Route path="/" element={<PageLayout />}>
        <Route path="/calculations" element={<Calculations />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContextWrapper>
  );
}

export default App;
