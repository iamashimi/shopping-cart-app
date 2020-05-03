import React, { Component } from "react";
import { Field, reduxForm, propTypes } from "redux-form";
import TextInput from "../forms/TextInput";
import { connect } from "react-redux";
import { addProduct, fetchProduct, updateProduct } from "../../actions";
import { Button, Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { redirect: false };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchProduct(id);
    }
  }

  onSubmit(product) {
    if (!product._id) {
      this.props
        .addProduct(product)
        .then((_) => this.setState({ redirect: true }))
        .catch((_) => {});
    } else {
      this.props
        .updateProduct(product)
        .then((_) => this.setState({ redirect: true }))
        .catch((_) => {});
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // Receive Product data Asynchronously
    const { product } = nextProps;

    if (product._id !== this.props.product._id) {
      // Initialize form only once
      this.props.initialize(product);
    }
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/products" />
    ) : (
      <div>
        <Header
          as="h2"
          content={
            this.props.match.params.id ? "Edit Product" : "Add New Product"
          }
        />
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form"
        >
          <Field
            name="title"
            type="text"
            component={TextInput}
            label="Title"
            required
          />
          <Field
            name="price"
            type="text"
            component={TextInput}
            label="Price"
            required
          />
          <Field
            name="quantity"
            type="text"
            component={TextInput}
            label="Quantity"
            required
          />
          <Field
            name="description"
            type="text"
            component={TextInput}
            label="Description"
            required
          />
          <Field
            name="imagePath"
            type="text"
            component={TextInput}
            label="ImagePath"
            required
          />

          <Button
            primary
            type="submit"
            disabled={this.props.pristine}
            content="Submit"
          />
          <Button as="a" href="/products" content="Cancel" />
        </form>
      </div>
    );
  }
}

ProductForm.propTypes = {
  ...propTypes,
};

const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "Required";
  if (!values.price) errors.price = "Required";
  if (!values.quantity) errors.quantity = "Required";
  if (!values.description) errors.description = "Required";
  if (!values.imagePath) errors.imagePath = "Required";
  return errors;
};

function mapStateToProps({ products }) {
  return { product: products.product };
}

let ProductFormView = reduxForm({
  validate,
  form: "productForm",
  destroyOnUnmount: false,
})(ProductForm);

export default connect(mapStateToProps, {
  addProduct,
  fetchProduct,
  updateProduct,
})(ProductFormView);
