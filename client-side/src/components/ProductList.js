import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TableRow from "./TableRow";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/admin/product")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  tableRow() {
    return this.state.products.map(function (obj, i) {
      return <TableRow obj={obj} key={i} />;
    });
  }
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-body ">
        <h3 align="center">Product List</h3>
        <Link to="/add-product" className="btn btn-success">
          <span uk-icon="plus"></span>
        </Link>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>{this.tableRow()}</tbody>
        </table>
      </div>
    );
  }
}
