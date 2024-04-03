import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import walletReducer from './walletReducer';

const rootReducer = combineReducers({
  errors: errorReducer,
  wallet: walletReducer,
});

export default rootReducer;
