import logo from './logo.svg';
import './App.css';
import Nav from './components/common/Nav';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WalletForm from './components/dashboard/operations/WalletForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/createwallet' element={<WalletForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
