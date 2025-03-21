import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Desenvolvedores from './pages/Desenvolvedores';
import Niveis from './pages/Niveis';
import Header from './components/Header';

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Bem-vindo ao Sistema</h1>} />
        <Route path="/desenvolvedores" element={<Desenvolvedores />} />
        <Route path="/niveis" element={<Niveis/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;