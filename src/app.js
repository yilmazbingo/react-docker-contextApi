import React, { Component } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Default from "./components/Default";
import { Switch, Route } from "react-router-dom";
import Modal from "./components/Modal";
// import Cart from "./components/cart";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <Switch>
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/" component={ProductList} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
