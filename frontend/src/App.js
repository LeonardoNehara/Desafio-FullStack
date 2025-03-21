import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Niveis from "./pages/Niveis";
import Desenvolvedores from "./pages/Desenvolvedores";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/niveis" element={<Niveis />} />
            <Route path="/desenvolvedores" element={<Desenvolvedores />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
