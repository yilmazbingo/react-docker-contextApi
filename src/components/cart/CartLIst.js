import React from "react";
import CartItem from "./CartItem";
const CartList = ({ value }) => {
  const { cart } = value;
  console.log(value);
  console.log("yi");
  return (
    <div className="container-fluid">
      {cart.map(item => {
        console.log(item.id);
        console.log("yil");
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
};

export default CartList;
