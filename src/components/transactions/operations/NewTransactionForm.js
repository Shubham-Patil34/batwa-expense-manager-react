import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createTransaction } from '../../../actions/projectActions';
import classnames from 'classnames';

const NewTransactionForm = ({ walletId, walletName, errors }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(1);
  const [date, setDate] = useState(getCurrentDate());
  const [errorsState, setErrorsState] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTransaction = {
      amount,
      description,
      type,
      date,
    };

    dispatch(createTransaction(walletId, newTransaction, navigate));
  };

  useEffect(() => {
    if (errors !== errorsState) {
      setErrorsState(errors);
    }
  }, [errors]);

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
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link to={`/transactions/${walletId}`} className='btn btn-light'>
              Back to Wallet
            </Link>
            <h4 className='display-4 text-center'>Record New Transaction</h4>
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
                  onChange={changeHandler}
                ></textarea>
                <p className='text-danger'>{errors.description}</p>
              </div>
              <div className='form-group  mb-2'>
                <div className='form-check form-check-inline'>
                  <input
                    defaultChecked
                    className='form-check-input'
                    type='radio'
                    name='type'
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
                    className={classnames('form-check-input', {
                      'is-invalid': errors.type,
                    })}
                    type='radio'
                    name='type'
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
              <input type='submit' className='btn btn-primary btn-block' />
            </form>
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
});

export default connect(mapStateToProps, { createTransaction })(
  NewTransactionForm
);
