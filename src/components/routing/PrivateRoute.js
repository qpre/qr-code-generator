import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/api-authentication';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { status } = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {status === 'logged-in' ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/auth/signin',
            state: { from: location }
          }}
        />
      )}
    </Route>
  );
}

export default PrivateRoute;
