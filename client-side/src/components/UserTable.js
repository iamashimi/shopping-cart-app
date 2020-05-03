import React, { Component } from "react";
import axios from "axios";

export default class UserTable extends Component {
  deleteUser = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/admin/delete-user/${e}`)
      .then((res) => console.log(res.data));
    window.location.reload(false);
  };

  render() {
    return (
      <tr>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.level}</td>
        <td>
          <button
            onClick={(e) => {
              if (window.confirm("Are you sure to delete ?")) {
                this.deleteUser(this.props.obj._id);
              }
            }}
            className="btn btn-sm btn-danger"
          >
            <span uk-icon="trash"></span>
          </button>
        </td>
      </tr>
    );
  }
}
