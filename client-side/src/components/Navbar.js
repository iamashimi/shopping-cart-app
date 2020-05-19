import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }
  render() {
    const loginRegLink = (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <h4>Login</h4>
          </Link>
        </li>
      </ul>
    );
    const userLink = (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/product-list" className="nav-link">
            <h4>Product List</h4>
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logout.bind(this)} className="nav-link">
            <h4>
              <img src="https://img.icons8.com/android/24/000000/logout-rounded-left.png" />
              Logout
            </h4>
          </a>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-light rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbar1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbar1"
        >
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <h4>Home</h4>
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
