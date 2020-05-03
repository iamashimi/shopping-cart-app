import { Container } from "semantic-ui-react";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
// import AssetDashboard from './assets/AssetDashboard'

// import AssetForm from './assets/AssetForm'
import ProductDashboard from "./products/ProductDashboard";
import ProductForm from "./products/ProductForm";
import ProductDetail from "./products/ProductDetail";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Container>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/products" component={ProductDashboard} />
            <Route exact path="/products/new/form" component={ProductForm} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/products/edit/:id" component={ProductForm} />
            {/* <Route exact path="/assets" component={AssetDashboard} />
						<Route exact path="/malls/:mall_id/assets/new/form" component={AssetForm} /> */}
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return state;
}

export default connect(mapStateToProps, actions)(App);
