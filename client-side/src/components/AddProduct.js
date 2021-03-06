import React, { Component } from "react";
import { addProduct } from "./ProductFunction";

export default class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      price: "",
      quantity: "",
      imagePath: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const product = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      imagePath: this.state.imagePath,
    };
    addProduct(product).then((res) => {
      if (res) {
        this.props.history.push(`/product-list`);
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
                  <p align="center">Add new products</p>
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="title"
                      placeholder="Enter title"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="price"
                      placeholder="Enter price"
                      value={this.state.price}
                      onChange={this.onChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={this.state.quantity}
                      onChange={this.onChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="imagePath"
                      placeholder="Enter imagePath"
                      value={this.state.imagePath}
                      onChange={this.onChange}
                    />
                    <textarea
                      type="text"
                      className="form-control mb-2"
                      name="description"
                      placeholder="Enter description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
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
