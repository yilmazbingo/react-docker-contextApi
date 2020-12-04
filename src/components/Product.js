import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import PropTypes from "prop-types";

class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="d-flex  align-items-stretch col-9 col-md-6 col-lg-3 mx-auto my-3">
        <div className="card  ">
          <ProductConsumer>
            {(value) => {
              return (
                <div
                  className="card-body img-container  p-5 "
                  onClick={() => value.handleDetail(id)}
                >
                  <Link to="/details">
                    <img src={img} alt="product" className=" card-img-top " />
                  </Link>
                  <button
                    className="cart-btn badge-primary"
                    onClick={() => {
                      value.openModal(id);
                      value.addToCart(id);
                    }}
                    disabled={inCart ? true : false}
                  >
                    {inCart ? (
                      <p className="text-center" disabled>
                        In Cart
                      </p>
                    ) : (
                      <i className="fas fa-cart-plus" />
                    )}
                  </button>
                </div>
              );
            }}
          </ProductConsumer>
          <div className="card-footer d-flex  justify-content-between  ">
            <p className="align-self-center  text-capitalize text-alert mb-0">
              {title}
            </p>
            <h5 className="font-italic mb-0">
              <span>$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
};
const ProductWrapper = styled.div`
  .card {
    background-color: rgb(156, 0, 12);
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: white;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.3rem solid rgba(0, 0, 0, 1);
      box-shadow: 2px 2px 5px 0 rgb(136, 12, 12);
    }
    .card-footer {
      border: 0.1rem solid rgba(0, 0, 0, 1);
      box-shadow: 2px 2px 5px 0 rgb(136, 12, 12);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .card-img-top {
    transition: all 1s linear;
  }
  ${
    "" /* I keep the button all the way botoom and right, because when I add transformation effect, will move entire element right-bottom */
  }
  .cart-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.2rem 0.4rem;
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%); /*move right and bottom */
    transition: all 1s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: blue;
    cursor: pointer;
  }
`;
