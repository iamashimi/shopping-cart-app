import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts, deleteProduct } from "../../actions";
import { Card, Button, Loader } from "semantic-ui-react";

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    const { products } = this.props;
    return (
      <Card.Group itemsPerRow={3}>
        {!products.length ? (
          <Loader active inline="centered" />
        ) : (
          products.map((product) => {
            return (
              <Card key={product._id} link>
                <Card.Content href={`/products/${product._id}`}>
                  <Card.Header>{product.title}</Card.Header>
                  <Card.Meta>
                    {new Date(product.createdAt).toDateString() || "no"}
                  </Card.Meta>
                  <Card.Description>{product.price}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      content="Edit"
                      href={`/products/edit/${product._id}`}
                    />
                    <Button
                      basic
                      color="red"
                      content="Delete"
                      onClick={(e) => this.props.deleteProduct(product._id)}
                    />
                  </div>
                </Card.Content>
              </Card>
            );
          })
        )}
      </Card.Group>
    );
  }

  render() {
    return <div>{this.renderProducts()}</div>;
  }
}

function mapStateToProps({ products }) {
  return { products: products.products };
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(
  ProductList
);
