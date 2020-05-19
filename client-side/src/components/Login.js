import React, { Component } from "react";
import { login } from "./UserFunctions";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    login(user).then((res) => {
      if(this.state.level === "manager") {
        if (res) {
          this.props.history.push(`/product-list`);
        }
      }
      else if(this.state.level === "admin"){
        if (res) {
          this.props.history.push(`/user-list`);
        }
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-2 mx-auto">
            <div className="uk-card uk-card-default uk-card-body ">
              <form noValidate onSubmit={this.onSubmit}>
                <h3 className="h3 mb-3">
                  <p align="center">Dashboard Login</p>
                  <div>
                    <input
                      type="email"
                      className="form-control mb-2"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <input
                      type="password"
                      className="form-control mb-2"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <input
                        type="string"
                        className="form-control mb-2"
                        name="level"
                        placeholder="Enter level"
                        value={this.state.level}
                        onChange={this.onChange}
                    />
                  </div>
                  <button className="btn btn-primary btn-block">Sign In</button>
                </h3>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
