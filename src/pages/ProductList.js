import React, { Component } from "react";
import Product from "../components/Product";
import Title from "../components/Title";
import { ProductConsumer } from "../context";

class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="py-5">
          <div className="container">
            <div className="row">
              <Title name="our" title="products" />
            </div>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    // console.log(product.id);
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ProductList;
