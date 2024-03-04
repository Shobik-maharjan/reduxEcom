import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Homepage from "./components/routes/Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
