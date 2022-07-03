import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Topbar from "../components/topbar/Topbar.jsx";

const AuthMiddleware = ({ component: Component, path: Path }) => (
  <Route
    path={Path}
    render={(props) => {
      if (!sessionStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <>
          <Topbar />
          <Component {...props} />
        </>
      );
    }}
  />
);

export default withRouter(AuthMiddleware);
