import { server } from '../store';
import axios from 'axios';

// Action Creators for User Authentication and Subscription Management

// User Login Action
export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    // Handle specific error cases or set a generic error message
    const errorMessage = error.response ? error.response.data.message : 'An error occurred during login';
    dispatch({ type: 'loginFail', payload: errorMessage });
  }
};

// User Registration Action
export const register = formData => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred during registration';
    dispatch({ type: 'registerFail', payload: errorMessage });
  }
};

// Load User Action
export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Failed to load user data';
    dispatch({ type: 'loadUserFail', payload: errorMessage });
  }
};

// User Logout Action
export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'An error occurred during logout';
    dispatch({ type: 'logoutFail', payload: errorMessage });
  }
};

// Buy Subscription Action
export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Failed to buy subscription';
    dispatch({ type: 'buySubscriptionFail', payload: errorMessage });
  }
};

// Cancel Subscription Action
export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Failed to cancel subscription';
    dispatch({ type: 'cancelSubscriptionFail', payload: errorMessage });
  }
};
