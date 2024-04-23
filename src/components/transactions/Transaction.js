import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  getTransactions,
  getWallet,
  clearErrors,
} from '../../actions/projectActions';
import TransactionEntry from './TransactionEntry';

const Transaction = (props) => {
  const [name, setName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { walletId } = useParams();
  const data = props.transactions;

  useEffect(() => {
    dispatch(getWallet(walletId));
    dispatch(getTransactions(walletId));
    dispatch(clearErrors());
    setName(props.wallet.name);
    setCurrentBalance(props.wallet.currentBalance);
    setLoading(false);
  }, [props.wallet.name, props.transactions]);

  return (
    <div className='container'>
      {loading && (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
      <Link to='/dashboard' className='btn btn-outline-secondary mb-3 me-2'>
        Back
      </Link>
      <Link to='/newTransaction' className='btn btn-outline-primary mb-3'>
        <i className='fas fa-plus-circle'> Record new Transaction</i>
      </Link>
      <br />
      <div className='card text-center'>
        <div className='card-header bg-success text-white'>
          <h4>{name} Account Balance</h4>
          <h1>Rs. {parseFloat(currentBalance).toFixed(2)}</h1>
        </div>
      </div>
      <hr />
      {data.length === 0 && (
        <div
          className='alert alert-warning d-flex align-items-center ms-3 me-3'
          role='alert'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='currentColor'
            className='bi bi-exclamation-triangle-fill flex-shrink-0 me-2'
            viewBox='0 0 16 16'
            role='img'
            aria-label='Warning:'
          >
            <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
          </svg>
          <div>No transactions found for {name} account...!</div>
        </div>
      )}
      {data.length !== 0 && (
        <table className='table text-center'>
          <thead className='thead-dark'>
            <tr>
              <th>Account</th>
              <th scope='col'>Date</th>
              <th scope='col'>Description</th>
              <th scope='col'>Amount</th>
              <th></th>
              <th className='d-none d-sm-table-cell'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <TransactionEntry
                key={transaction.id}
                transaction={transaction}
                id={walletId}
                name={name}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  wallet: state.wallet.wallet,
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, { getWallet, getTransactions })(
  Transaction
);
