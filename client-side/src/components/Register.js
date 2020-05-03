import React, { Component } from "react";
import { register } from "./UserFunctions";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      level: "manager",
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
      level: this.state.level,
    };
    register(user).then((res) => {
      if (res) {
        this.props.history.push(`/user-list`);
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
                <h1 className="h3 mb-3">
                  <p align="center">User Register</p>
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
                    <div className="form-group">
                      <select
                        name="level"
                        className="form-control"
                        id="level"
                        value={this.state.level}
                        onChange={this.onChange}
                      >
                        {/* <option value selected="true" disabled="disabled">
                        Select user level
                      </option> */}
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block">Add</button>
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
