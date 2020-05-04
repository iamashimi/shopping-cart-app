import React, { Component } from "react";
import axios from "axios";

export default class TableRow extends Component {
  deleteProduct = (e) => {
    console.log(e);
    axios
      .delete(`http://localhost:3000/admin/delete-product/${e}`)
      .then((res) => console.log(res.data));
    window.location.reload(false);
  };
  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.quantity}</td>
        <td>{this.props.obj.description}</td>
        <td>
          <button className="btn btn-sm btn-primary">
            <span uk-icon="pencil"></span>
          </button>
        </td>
        <td>
          <button
            onClick={(e) => {
              if (window.confirm("Are you sure to delete ?")) {
                this.deleteProduct(this.props.obj._id);
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
