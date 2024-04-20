import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  getTransaction,
  updateTransaction,
} from '../../../actions/projectActions';
import classnames from 'classnames';

const TransactionUpdateForm = ({
  walletId,
  walletName,
  errors,
  transaction,
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState(getCurrentDate());
  const [errorsState, setErrorsState] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transactionId } = useParams();

  const handleSubmit = async (event) => {
    setSaving(true);
    event.preventDefault();
    const newTransaction = {
      amount,
      description,
      type,
      date,
    };
    const timeout = setTimeout(() => {
      dispatch(
        updateTransaction(walletId, transactionId, newTransaction, navigate)
      );
      setSaving(false);
    }, 1000);
  };

  useEffect(() => {
    if (errors !== errorsState) {
      setErrorsState(errors);
    }

    dispatch(getTransaction(walletId, transactionId));
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setType(transaction.type);
    setDate(transaction.date);
  }, [
    errors,
    transaction.amount,
    transaction.description,
    transaction.type,
    transaction.date,
  ]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'amount':
        setAmount(parseInt(value));
        break;
      case 'description':
        setDescription(value);
        break;
      case 'type':
        setType(parseInt(value));
        break;
      case 'date':
        setDate(value);
        break;
      default:
        break;
    }
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 col-md-8 col-lg-6 m-auto '>
          <Link
            to={`/transactions/${walletId}`}
            className='btn btn-outline-secondary mb-2'
          >
            Back to Wallet
          </Link>
          <div
            className={classnames('bg-form', {
              'bg-form-income': type === 1,
              'bg-form-expense': type === 2,
              'bg-form-transfer': type === 3,
            })}
          >
            <div className='col-11 m-auto'>
              <h6 className='display-6 text-center'>Update Transaction</h6>
              <p className='lead text-center'>{walletName} Account</p>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-2'>
                  <input
                    type='number'
                    name='amount'
                    min='1'
                    autoFocus={true}
                    onChange={changeHandler}
                    value={amount}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.amount,
                    })}
                    placeholder='Amount'
                  />
                  <p className='text-danger'>{errors.amount}</p>
                </div>
                <div className='form-group  mb-2'>
                  <textarea
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.description,
                    })}
                    placeholder='Description'
                    name='description'
                    value={description}
                    onChange={changeHandler}
                  ></textarea>
                  <p className='text-danger'>{errors.description}</p>
                </div>
                <div className='form-group  mb-2'>
                  <div className='form-check form-check-inline'>
                    <input
                      checked={type === 1}
                      className='form-check-input'
                      type='radio'
                      name='type'
                      disabled={type !== 1}
                      onChange={changeHandler}
                      id='income'
                      value='1'
                    />
                    <label className='form-check-label' htmlFor='income'>
                      Income
                    </label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      checked={type === 2}
                      type='radio'
                      name='type'
                      disabled={type !== 2}
                      onChange={changeHandler}
                      id='expense'
                      value='2'
                    />
                    <label className='form-check-label' htmlFor='expense'>
                      Expense
                    </label>
                  </div>
                  <p className='text-danger'>{errors.type}</p>
                </div>
                <h6>Transaction Date</h6>
                <div className='form-group mb-2'>
                  <input
                    type='date'
                    name='date'
                    onChange={changeHandler}
                    value={date}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.date,
                    })}
                  />
                  <p className='text-danger'>{errors.date}</p>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary btn-block w-100'
                  disabled={saving}
                >
                  {!saving && 'Update'}
                  {saving && (
                    <div>
                      <div className='saveData'></div> Updating...
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  walletId: state.wallet.wallet.id,
  walletName: state.wallet.wallet.name,
  errors: state.errors,
  transaction: state.transaction.transaction,
});

export default connect(mapStateToProps, { updateTransaction })(
  TransactionUpdateForm
);
