import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import Nav from './components/common/Nav';
import Welcome from './components/Welcome';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WalletForm from './components/dashboard/operations/WalletForm';
import NotFound from './components/common/NotFound';
import WalletUpdateForm from './components/dashboard/operations/WalletUpdateForm';
import Transaction from './components/transactions/Transaction';
import NewTransactionForm from './components/transactions/operations/NewTransactionForm';
import TransactionUpdateForm from './components/transactions/operations/TransactionUpdateForm';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createwallet' element={<WalletForm />} />
          <Route path='/updatewallet/:id' element={<WalletUpdateForm />} />
          <Route path='/transactions/:walletId' element={<Transaction />} />
          <Route path='/newTransaction' element={<NewTransactionForm />} />
          <Route
            path='/updateTransaction/:transactionId'
            element={<TransactionUpdateForm />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
