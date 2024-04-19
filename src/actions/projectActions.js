import axios from 'axios';
import {
  GET_ERRORS,
  GET_WALLETS,
  DELETE_WALLET,
  GET_WALLET,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
} from './types';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;

export const createWallet = (newWallet, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/batwa`, newWallet);
    navigate('/dashboard');
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
    checkErr(err.response.data.status);
  }
};

export const updateWallet =
  (updatedWallet, id, navigate) => async (dispatch) => {
    try {
      const response = await axios.put(`${apiUrl}/batwa/${id}`, updatedWallet);
      navigate('/dashboard');
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
      checkErr(err.response.data.status);
    }
  };

export const getWallets = () => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/batwa`);
  dispatch({ type: GET_WALLETS, payload: response.data });
};

export const getWallet = (id) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/batwa/${id}`);
  dispatch({ type: GET_WALLET, payload: response.data });
};

export const deleteWallet = (id) => async (dispatch) => {
  const response = await axios.delete(`${apiUrl}/batwa/${id}`);
  dispatch({ type: DELETE_WALLET, payload: id });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
};

export const getTransactions = (id) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/lenden/${id}`);
  dispatch({ type: GET_TRANSACTIONS, payload: response.data });
};

export const deleteTransaction = (batwaId, tId) => async (dispatch) => {
  const response = await axios.delete(`${apiUrl}/lenden/${batwaId}/${tId}`);
  dispatch({ type: DELETE_TRANSACTION, payload: tId });
};

const checkErr = (err) => {
  if (err === 400) {
    let timerInterval;
    Swal.fire({
      title: 'Oops...!',
      html: 'Something went wrong :(',
      width: '25em',
      color: '#FB6D6D',
      timer: 1500,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  }
};
