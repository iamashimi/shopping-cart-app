import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserTable from "./UserTable";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/admin/users")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  tableRow() {
    return this.state.users.map(function (obj, i) {
      return <UserTable obj={obj} key={i} />;
    });
  }
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-body ">
        <h3 align="center">Authorized Users</h3>
        <Link to="/register" className="btn btn-success ">
          <span uk-icon="plus"></span>
        </Link>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Email</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>{this.tableRow()}</tbody>
        </table>
      </div>
    );
  }
}
