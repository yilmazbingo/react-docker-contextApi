import React, { Component } from "react";
import Title from "../components/Title";
import CartColumns from "../components/cart/cartColumns.js";
import EmptyCart from "../components/cart/EmptyCart";
import { ProductConsumer } from "../context";
import CartList from "../components/cart/CartLIst";
import CartTotals from "../components/cart/CArtTotals";

const Cart = (props) => {
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          console.log(cart);
          if (cart.length > 0) {
            return (
              <React.Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} history={props.history} />
              </React.Fragment>
            );
          } else {
            return <EmptyCart />;
          }
        }}
      </ProductConsumer>
    </section>
  );
};

export default Cart;
