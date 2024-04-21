import React, { Component } from 'react';
import { deleteTransaction } from '../../actions/projectActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class TransactionEntry extends Component {
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
    const bgColorCls = transaction.type === 1 ? 'success ' : 'danger';

    return (
      <tr className={`table-secondary`}>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td className={`text-${bgColorCls}`}>
          {parseFloat(transaction.amount).toFixed(2)}
        </td>
        <td className='text-end'>
          <Link
            className='text-info'
            to={`/updateTransaction/${transaction.id}`}
          >
            <i className='far fa-edit click-icon'></i>
          </Link>
        </td>
        <td className='text-start'>
          <Link className='text-info' onClick={() => this.deleteBtnClick()}>
            <span className='text-danger'>
              <i className='fas fa-trash-alt click-icon'></i>
            </span>
          </Link>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteTransaction })(TransactionEntry);
