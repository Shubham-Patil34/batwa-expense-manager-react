import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import walletReducer from './walletReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
});

export default rootReducer;
