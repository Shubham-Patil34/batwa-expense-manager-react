import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getTransactions, getWallet } from '../../actions/projectActions';
import TransactionEntry from './TransactionEntry';

const Transaction = (props) => {
  const [name, setName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams();
  const data = props.transactions;

  useEffect(() => {
    dispatch(getWallet(id));
    dispatch(getTransactions(id));
    setName(props.wallet.name);
    setCurrentBalance(props.wallet.currentBalance);
  }, [props.wallet.name, props.transactions]);

  return (
    <div className='container'>
      <Link to='/dashboard' className='btn btn-default btn-lg mb-3'>
        Back
      </Link>
      <Link to='/newTransactionForm' className='btn btn-info btn-lg mb-3'>
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
      <table className='table text-center'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Date</th>
            <th scope='col'>Description</th>
            <th scope='col'>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <TransactionEntry
              key={transaction.id}
              transaction={transaction}
              id={id}
            />
          ))}
        </tbody>
      </table>
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
