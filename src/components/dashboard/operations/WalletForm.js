import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      accountNumber: '',
      description: '',
      priority: '',
    };
  }

  changeHandler = (event, fieldName) => {
    this.setState({
      [fieldName]: event.target.value,
    });
  };

  handleSubmit(event) {
    const newWallet = {
      name: this.state.name,
      accountNumber: this.state.accountNumber,
      description: this.state.description,
      priority: this.state.priority,
    };

    axios
      .post('http://localhost:8088/batwa/create', newWallet)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        alert('error');
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='project'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h5 className='display-4 text-center'>Create Wallet</h5>
                <hr />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <div className='form-group mb-3'>
                    <input
                      type='text'
                      onChange={(event) => this.changeHandler(event, 'name')}
                      className='form-control form-control-lg '
                      placeholder='Account Name'
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <input
                      type='text'
                      onChange={(event) =>
                        this.changeHandler(event, 'accountNumber')
                      }
                      className='form-control form-control-lg'
                      placeholder='Account No'
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <textarea
                      onChange={(event) =>
                        this.changeHandler(event, 'description')
                      }
                      className='form-control form-control-lg'
                      placeholder='Description'
                    ></textarea>
                  </div>
                  <div className='form-group mb-3'>
                    <select
                      onChange={(event) =>
                        this.changeHandler(event, 'priority')
                      }
                      className='form-control form-control-lg'
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
  }
}

export default WalletForm;
