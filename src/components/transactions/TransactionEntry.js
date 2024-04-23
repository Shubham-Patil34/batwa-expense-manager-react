import React, { Component } from 'react';
import { deleteTransaction, getWallets } from '../../actions/projectActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class TransactionEntry extends Component {
  componentDidMount() {
    this.props.getWallets();
  }

  deleteBtnClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteTransaction(this.props.id, this.props.transaction.id);
        Swal.fire('Deleted!', 'The transaction has been deleted.', 'success');
      }
    });
  };

  render() {
    const transaction = this.props.transaction;
    const walletId = this.props.id;
    const name = this.props.name;
    const wallets = this.props.wallets;

    // const bgColorCls = transaction.type === 1 ? 'success ' : 'danger';
    const typeToBgColor = {
      1: 'success',
      2: 'danger',
      3: 'primary',
    };
    const bgColorCls = typeToBgColor[transaction.type] || '';

    return (
      <tr className='table-secondary'>
        <td>
          {wallets.find((wallet) => wallet.id === transaction.batwaId)?.name}
          {transaction.type === 3 && (
            <span>
              {' '}
              &rarr;{' '}
              {
                wallets.find((wallet) => wallet.id === transaction.toBatwaId)
                  ?.name
              }
            </span>
          )}
        </td>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td className={`text-${bgColorCls}`}>
          {parseFloat(transaction.amount).toFixed(2)}
        </td>
        <td className='text-end d-none d-sm-table-cell'>
          <Link
            className='text-info'
            to={`/updateTransaction/${transaction.id}`}
          >
            <i className='far fa-edit click-icon'></i>
          </Link>
        </td>
        <td className='text-start d-none d-sm-table-cell'>
          <Link className='text-info' onClick={() => this.deleteBtnClick()}>
            <span className='text-danger'>
              <i className='fas fa-trash-alt click-icon'></i>
            </span>
          </Link>
        </td>
        <td className='d-table-cell d-sm-none'>
          <div className='btn-group'>
            <Link
              className='text-secondary click-icon'
              data-toggle='dropdown'
              data-bs-theme='blue'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i class='fas fa-ellipsis-v'></i>
            </Link>
            <div
              className='dropdown-menu dropdown-menu-right'
              style={{
                minWidth: '50px',
              }}
            >
              <Link
                className='dropdown-item'
                to={`/updateTransaction/${transaction.id}`}
              >
                <span className='text-info'>
                  <i className='far fa-edit click-icon'></i>
                </span>
              </Link>
              <Link
                className='dropdown-item'
                onClick={() => this.deleteBtnClick()}
              >
                <span className='text-danger'>
                  <i className='fas fa-trash-alt click-icon'></i>
                </span>
              </Link>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  wallets: state.wallet.wallets,
});

export default connect(mapStateToProps, { deleteTransaction, getWallets })(
  TransactionEntry
);
