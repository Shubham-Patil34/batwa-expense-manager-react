import axios from 'axios';
import { GET_ERRORS, GET_WALLETS, DELETE_WALLET, GET_WALLET } from './types';
import Swal from 'sweetalert2';

export const createWallet = (newWallet, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8088/batwa/create',
      newWallet
    );
    navigate('/dashboard');
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
    checkErr(err.response.data.status);
  }
};

export const updateWallet =
  (updatedWallet, id, navigate) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8088/batwa/${id}`,
        updatedWallet
      );
      navigate('/dashboard');
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
      checkErr(err.response.data.status);
    }
  };

export const getWallets = () => async (dispatch) => {
  const response = await axios.get('http://localhost:8088/batwa/');
  dispatch({ type: GET_WALLETS, payload: response.data });
};

export const getWallet = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8088/batwa/${id}`);
  dispatch({ type: GET_WALLET, payload: response.data });
};

export const deleteWallet = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8088/batwa/${id}`);
  dispatch({ type: DELETE_WALLET, payload: id });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
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
