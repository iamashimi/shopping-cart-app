import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Register from "./components/Register";
import Users from "./components/Users";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/product-list" component={ProductList} />
            <Route exact path="/user-list" component={Users} />
            <Route exact path="/add-product" component={AddProduct} />
            <Route exact path="/edit-product" component={EditProduct} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


// new test commit
