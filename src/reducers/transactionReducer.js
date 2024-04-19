import {
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_TRANSACTION,
} from '../actions/types';

const initialState = {
  transactions: [],
  transaction: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    // case GET_TRANSACTION:
    //   return { ...state, transaction: action.payload };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}
