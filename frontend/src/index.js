import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode'; // parses the user's session token
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import * as UserActions from './actions/user_actions'
import * as BoardActions from './actions/board_actions'
import * as PinActions from './actions/pin_actions'
import * as ItemActions from './actions/item_actions'

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);
    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }
  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');

  window.store = store
  window.dispatch = store.dispatch
  window.getState = store.getState
  window.fetchUser = UserActions.fetchUser
  window.fetchUserBoards = BoardActions.fetchUserBoards
  window.fetchBoard = BoardActions.fetchBoard
  window.updateBoard = BoardActions.updateBoard;
  window.fetchPins = PinActions.fetchPins
  window.fetchPin = PinActions.fetchPin
  window.fetchUserItems = ItemActions.fetchUserItems
  window.fetchBoardItems = ItemActions.fetchBoardItems
  window.fetchItem = ItemActions.fetchItem

  ReactDOM.render(<Root store={store} />, root);
});
