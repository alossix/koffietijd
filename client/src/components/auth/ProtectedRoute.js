import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  userInSession,
  path,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return userInSession ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
