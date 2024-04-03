import axios from 'axios';
import { GET_ERRORS, GET_WALLETS } from './types';

export const createWallet = (newWallet, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8088/batwa/create',
      newWallet
    );
    navigate('/dashboard');
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const getWallets = () => async (dispatch) => {
  const response = await axios.get('http://localhost:8088/batwa/');
  dispatch({ type: GET_WALLETS, payload: response.data });
};
