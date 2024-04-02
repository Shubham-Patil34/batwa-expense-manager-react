import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WalletForm = () => {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(3); // Default priority

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newWallet = {
      name,
      accountNumber,
      description,
      priority,
    };

    try {
      const response = await axios.post(
        'http://localhost:8088/batwa/create',
        newWallet
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error creating wallet');
    }
  };

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
      case 'priority':
        setPriority(parseInt(value)); // Parse to integer
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
                    className='form-control form-control-lg'
                    placeholder='Account Name'
                    name='name'
                  />
                </div>
                <div className='form-group mb-3'>
                  <input
                    type='text'
                    onChange={changeHandler}
                    value={accountNumber}
                    className='form-control form-control-lg'
                    placeholder='Account No'
                    name='accountNumber'
                  />
                </div>
                <div className='form-group mb-3'>
                  <textarea
                    onChange={changeHandler}
                    value={description}
                    className='form-control form-control-lg'
                    placeholder='Description'
                    name='description'
                  />
                </div>
                <div className='form-group mb-3'>
                  <select
                    onChange={changeHandler}
                    value={priority}
                    className='form-control form-control-lg'
                    name='priority'
                  >
                    <option value={3}>Display Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
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

export default WalletForm;
