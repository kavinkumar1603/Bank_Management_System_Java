import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import BankAccount from './components/BankAccount';
import CreateAccount from './components/CreateAccount';
import AdminLogin from './components/AdminLogin';
import About from './components/About';
import NotFound from './components/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="account" element={<BankAccount />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="about" element={<About />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
