import React, { useState, useEffect } from 'react';
import { createWallet } from '../../../actions/projectActions';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import classnames from 'classnames';

const WalletForm = (props) => {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [priority, setPriority] = useState(''); // Default priority
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newWallet = {
      name,
      accountNumber,
      description,
      currentBalance,
      priority,
    };

    dispatch(createWallet(newWallet, navigate));
  };

  useEffect(() => {
    if (props.errors !== errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'currentBalance':
        setCurrentBalance(value);
        break;
      case 'priority':
        setPriority(parseFloat(value));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Create Wallet</h5>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    onChange={changeHandler}
                    value={name}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.name,
                    })}
                    placeholder='Account Name'
                    name='name'
                  />
                  <p className='text-danger'>{errors.name}</p>
                </div>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    onChange={changeHandler}
                    value={accountNumber}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.accountNumber,
                    })}
                    placeholder='Account No'
                    name='accountNumber'
                  />
                  <p className='text-danger'>{errors.accountNumber}</p>
                </div>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    onChange={changeHandler}
                    value={currentBalance}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.currentBalance,
                    })}
                    placeholder='Initial Balance'
                    name='currentBalance'
                  />
                  <p className='text-danger'>{errors.currentBalance}</p>
                </div>
                <div className='form-group mb-3'>
                  <textarea
                    onChange={changeHandler}
                    value={description}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.description,
                    })}
                    placeholder='Description'
                    name='description'
                  />
                  <p className='text-danger'>{errors.description}</p>
                </div>
                <div className='form-group mb-3'>
                  <select
                    onChange={changeHandler}
                    value={priority}
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.priority,
                    })}
                    name='priority'
                  >
                    <option value={''}>Display Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                  <p className='text-danger'>{errors.priority}</p>
                </div>
                <input
                  type='submit'
                  className='btn btn-primary w-100'
                  value='Create'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createWallet })(WalletForm);
