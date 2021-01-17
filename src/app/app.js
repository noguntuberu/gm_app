import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

/** */
import GuestArea from './guest/guest';
import MemberArea from './member/member';

/** */
import './app.css';

const getLoginStatus = createSelector(state => state.user_data, user_data => {
  const { _id, token } = user_data;
  return (_id && token);
});

function App() {
  const userIsLoggedIn = useSelector(getLoginStatus);

  return <div>
    <BrowserRouter >
      <Switch>
        <Route path='/' component={userIsLoggedIn ? MemberArea : GuestArea} />
      </Switch>
    </BrowserRouter>
  </div>
}

export default App;
