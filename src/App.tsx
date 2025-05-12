import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { AjouterProduit } from './pages/AjouterProduit';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Statistiques } from './pages/Statistiques';
export function App() {
  return <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Layout>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/statistiques" element={<PrivateRoute><Statistiques /></PrivateRoute>} />
            <Route path="/ajouter" element={<PrivateRoute><AjouterProduit /></PrivateRoute>} />
          </Routes>
        </Layout>} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>;
}