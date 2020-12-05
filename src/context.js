import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let products = [];
    // since it is array of objects, each has to be spread individually
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    console.log("temp", tempProducts);
    const item = this.getItem(id, tempProducts);
    console.log("item", item);
    const index = tempProducts.indexOf(this.getItem(id));
    console.log("index", index);
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return {
        products: [...tempProducts],
        cart: [...this.state.cart, product],
        detailProduct: { ...product },
      };
    }, this.addTotals);
  };
  // addToCart = (id) => {
  //   let tempProducts = [...this.state.products];
  //   console.log("tempProducts", tempProducts);
  //   const index = tempProducts.indexOf(this.getItem(id));
  //   console.log("index", index);
  //   const product = tempProducts[index];
  //   console.log("product", product);
  //   product.inCart = true;
  //   product.count = 1;
  //   const price = product.price;
  //   product.total = price;

  //   this.setState(() => {
  //     return {
  //       products: [...tempProducts],
  //       cart: [...this.state.cart, product],
  //       detailProduct: { ...product },
  //     };
  //   }, this.addTotals());
  // };

  openModal = (id) => {
    const product = this.getItem(id, this.state.products);

    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart],
      };
    }, this.addTotals);
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];

    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });

    const index = tempCart.indexOf(selectedProduct);

    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;

      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };

  getTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };

  addTotals = () => {
    const totals = this.getTotals();
    this.setState(
      () => {
        return {
          cartSubTotal: totals.subTotal,
          cartTax: totals.tax,
          cartTotal: totals.total,
        };
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];

    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id, tempProducts));

    let removedProduct = tempProducts[index];

    removedProduct.inCart = false;

    removedProduct.count = 0;

    removedProduct.total = 0;

    tempCart = tempCart.filter((item) => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],

        products: [...tempProducts],
      };
    }, this.addTotals);
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },

      () => {
        this.setProducts();

        this.addTotals();
      }
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,

          handleDetail: this.handleDetail,

          addToCart: this.addToCart,

          openModal: this.openModal,

          closeModal: this.closeModal,

          increment: this.increment,

          decrement: this.decrement,

          removeItem: this.removeItem,

          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
