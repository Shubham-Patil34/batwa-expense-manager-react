import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div>
        <div className='landing'>
          <div className='light-overlay landing-inner text-dark'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <h1 className='display-3 mb-4'>Personal Expense Manager</h1>
                  <p className='lead'>
                    Create your account to manage your daily expense and hisab
                    kitab
                  </p>
                  <hr />
                  <Link to='register' className='me-2 btn btn-lg btn-primary'>
                    Sign Up
                  </Link>
                  <Link to='login' className='me-2 btn btn-lg btn-secondary'>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
