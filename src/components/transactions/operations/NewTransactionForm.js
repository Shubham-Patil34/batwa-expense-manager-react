import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createTransaction } from '../../../actions/projectActions';
import classnames from 'classnames';

const NewTransactionForm = ({ batwaId, walletName, wallets, errors }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(1);
  const [date, setDate] = useState(getCurrentDate());
  const [errorsState, setErrorsState] = useState('');
  const [saving, setSaving] = useState(false);
  const [fromBatwaId, setFromBatwaId] = useState('');
  const [fromBatwaId, setFromBatwaId] = useState('');
  const [toBatwaId, setToBatwaId] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    setSaving(true);
    event.preventDefault();

    const newTransaction = {
      amount,
      description,
      type,
      date,
      batwaId: fromBatwaId,
      batwaId: fromBatwaId,
      toBatwaId,
    };

    const timeout = setTimeout(() => {
      dispatch(
        createTransaction(fromBatwaId, toBatwaId, newTransaction, navigate)
      );
      dispatch(
        createTransaction(fromBatwaId, toBatwaId, newTransaction, navigate)
      );
      setSaving(false);
    }, 1000);
  };

  useEffect(() => {
    setFromBatwaId(batwaId);

    setFromBatwaId(batwaId);

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
        if (type !== 3) {
          setToBatwaId('');
        }
        if (type !== 3) {
          setToBatwaId('');
        }
        break;
      case 'toBatwaId':
        setToBatwaId(parseInt(value));
        break;
      case 'fromBatwaId':
        setFromBatwaId(parseInt(value));
        break;
      case 'fromBatwaId':
        setFromBatwaId(parseInt(value));
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
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 col-md-8 col-lg-6 m-auto '>
          <Link
            to={batwaId ? `/transactions/${fromBatwaId}` : `/dashboard`}
            to={batwaId ? `/transactions/${fromBatwaId}` : `/dashboard`}
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
              <h6 className='display-6 text-center'>Record New Transaction</h6>
              <p className='lead text-center'>
                {wallets.find((wallet) => wallet.id === fromBatwaId)?.name}{' '}
                Account
              </p>
              <p className='lead text-center'>
                {wallets.find((wallet) => wallet.id === fromBatwaId)?.name}{' '}
                Account
              </p>
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
                      className='form-check-input'
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
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='type'
                      onChange={changeHandler}
                      id='transfer'
                      value='3'
                    />
                    <label className='form-check-label' htmlFor='transfer'>
                      Transfer
                    </label>
                  </div>
                  <p className='text-danger'>{errors.type}</p>
                </div>
                <div className='row form-group mb-2'>
                  <div className={`col${type === 3 ? '-5' : '-12'}`}>
                    <select
                      id='walletSelect'
                      name='fromBatwaId'
                      name='fromBatwaId'
                      onChange={changeHandler}
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.fromBatwaIdValid,
                        'is-invalid': errors.fromBatwaIdValid,
                      })}
                      // disabled
                      // disabled
                    >
                      <option value=''>Transfer from account</option>
                      <option value=''>Transfer from account</option>
                      {wallets.map(
                        (wallet) =>
                          wallet.id !== toBatwaId && (
                            <option
                              key={wallet.id}
                              value={wallet.id}
                              selected={wallet.id === fromBatwaId}
                            >
                          wallet.id !== toBatwaId && (
                            <option
                              key={wallet.id}
                              value={wallet.id}
                              selected={wallet.id === fromBatwaId}
                            >
                              {wallet.name}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                  {type === 3 && (
                    <div className='col-7 row pe-0'>
                      <div className='col-2 arrow m-auto'></div>
                      <div className='col-10 pe-0'>
                        <select
                          id='walletSelect'
                          name='toBatwaId'
                          onChange={changeHandler}
                          className={classnames(
                            'form-control form-control-lg',
                            {
                              'is-invalid':
                                errors.toBatwaIdValid ||
                                errors.toBatwaIdInValid,
                            }
                          )}
                          // disabled
                        >
                          <option value=''>Transfer to account</option>
                          {wallets.map(
                            (wallet) =>
                              wallet.id !== fromBatwaId && (
                                <option
                                  key={wallet.id}
                                  value={wallet.id}
                                  selected={wallet.id === toBatwaId}
                                >
                                  {wallet.name}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                  <p className='text-danger m-0'>{errors.toBatwaIdValid}</p>
                  <p className='text-danger m-0'>{errors.toBatwaIdInValid}</p>
                  <p className='text-danger m-0'>{errors.fromBatwaIdValid}</p>
                </div>

                  </div>
                  {type === 3 && (
                    <div className='col-7 row pe-0'>
                      <div className='col-2 arrow m-auto'></div>
                      <div className='col-10 pe-0'>
                        <select
                          id='walletSelect'
                          name='toBatwaId'
                          onChange={changeHandler}
                          className={classnames(
                            'form-control form-control-lg',
                            {
                              'is-invalid':
                                errors.toBatwaIdValid ||
                                errors.toBatwaIdInValid,
                            }
                          )}
                          // disabled
                        >
                          <option value=''>Transfer to account</option>
                          {wallets.map(
                            (wallet) =>
                              wallet.id !== fromBatwaId && (
                                <option
                                  key={wallet.id}
                                  value={wallet.id}
                                  selected={wallet.id === toBatwaId}
                                >
                                  {wallet.name}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                  <p className='text-danger m-0'>{errors.toBatwaIdValid}</p>
                  <p className='text-danger m-0'>{errors.toBatwaIdInValid}</p>
                  <p className='text-danger m-0'>{errors.fromBatwaIdValid}</p>
                </div>

                <h6>Transaction Date</h6>
                <div className='form-group mb-2'>
                  <input
                    type='datetime-local'
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
                  {!saving && 'Submit'}
                  {saving && (
                    <div>
                      <div className='saveData'></div> Saving...
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
  batwaId: state.wallet.wallet.id,
  walletName: state.wallet.wallet.name,
  wallets: state.wallet.wallets,
  errors: state.errors,
});

export default connect(mapStateToProps, { createTransaction })(
  NewTransactionForm
);
