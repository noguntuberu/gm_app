import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

/** */
import GuestArea from './guest/guest';
import MemberArea from './member/member';

/** */
import './app.css';
import 'react-toastify/dist/ReactToastify.css';

const getLoginStatus = createSelector(state => state.user_data, user_data => {
  const { _id, token } = user_data;
  return (_id && token);
});

function App() {
  const userIsLoggedIn = useSelector(getLoginStatus);

  return <div className="app-wrapper">
    <BrowserRouter >
      <Switch>
        <Route path='/' component={!userIsLoggedIn ? MemberArea : GuestArea} />
      </Switch>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
}

export default App;
