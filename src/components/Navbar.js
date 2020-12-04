import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img
            src={"/img/logo.png"}
            alt="store-logo"
            className="navbar-brand"
            style={{ width: "5rem", height: "5rem" }}
          />
        </Link>
        <ul className="navbar align-items-center ">
          <li className="nav-item ml-5">
            <Link to="/products" className="nav-link">
              products
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <span className="nav-item ml-5">
            <i class="fab fa-github fa-3x"></i>
          </span>
        </Link>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus " />
            </span>
            cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}
const NavWrapper = styled.nav`
  background: black;
  .nav-link {
    color: white !important;
    font-size: 1.3rem;
    text-transform: uppercase;
  }
`;

export default Navbar;
