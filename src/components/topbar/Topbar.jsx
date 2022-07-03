import React from "react";
import { useHistory } from "react-router-dom";
import "./topbar.css";

const Topbar = () => {
  const history = useHistory();
  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    history.push("/login");
  };
  return (
    <div className="container-fluid" style={{"backgroundColor":"black"}}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img
              src="../../assets/Icon2.jpg"
              alt=""
              width="200"
              height="70"
              className="d-inline-block align-text-top"
            />
            {/* Trading Data */}
          </a>
          <form class="d-flex" role="logout" onSubmit={handleLogout}>
            <button class="btn btn-outline-light" type="submit">
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
