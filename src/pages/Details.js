import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../components/Button";
class Details extends Component {
  state = {};
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            id,
            img,
            author,
            description,
            price,
            title,
            inCart,
          } = value.detailProduct;
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 col-md-6 mx-auto text-secondary text-uppercase text-center my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* product info */}
              <div className="row">
                <div className="col-10 col-md-6 mx-auto  my-3 ">
                  <img
                    src={img}
                    className="img-fluid mx-auto  "
                    alt="product"
                  />
                </div>
                {/* product text */}
                <div
                  className="col-10 col-md-6
                 mx-auto   my-3 text-capitalize"
                >
                  <h2 className="text-danger">
                    <strong className="text-dark">Title:</strong>
                    {title}
                  </h2>
                  <h4 className="text-title text-muted mt-3 mb-2 text-uppercase">
                    written by <span className="text-uppercase">{author}</span>
                  </h4>
                  <h4 className="text-primary">
                    <strong>
                      {" "}
                      price: <span>{price}</span>{" "}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Description:{" "}
                    <span className="text-muted lead">{description}</span>
                  </p>
                  {/* buttons */}
                  <div className="my-5">
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "inCart" : "Add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
