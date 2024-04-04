import React, { Component } from 'react';
import DashboardItem from './DashboardItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWallets, clearErrors } from '../../actions/projectActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWallets();
    this.props.clearErrors();
  }

  render() {
    const wallets = this.props.wallets;
    const walletComponent = wallets.map((wallet) => (
      <DashboardItem key={wallet.id} wallet={wallet} />
    ));

    let walletTotal = 0.0;
    const getWalletTotal = wallets.map((wallet) => {
      walletTotal += parseInt(wallet.currentBalance);
    });

    return (
      <div className='projects'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>My Wallets</h1>
              <br />
              <div className='btn-group'>
                <button
                  type='button'
                  className='btn btn-info btn-lg dropdown-toggle mb-2'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Create new
                </button>
                <div className='dropdown-menu'>
                  <Link className='dropdown-item' to='/createwallet'>
                    Wallet
                  </Link>
                  <button disabled className='dropdown-item'>
                    Transaction
                  </button>
                </div>
              </div>
              <br />
              <div className='card text-center'>
                <div className='card-header bg-success text-white'>
                  <h4>Current Balance (Total)</h4>
                  <h1>Rs. {walletTotal}</h1>
                </div>
              </div>
              <hr />
              {walletComponent}{' '}
              {walletComponent.length === 0 && (
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
                  <div>No wallet found...!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  wallets: state.wallet.wallets,
});

export default connect(mapStateToProps, { getWallets, clearErrors })(Dashboard);
