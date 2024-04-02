import logo from './logo.svg';
import './App.css';
import Nav from './components/common/Nav';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WalletForm from './components/dashboard/operations/WalletForm';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createwallet' element={<WalletForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
