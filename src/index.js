import React from "react";
import App from "./app";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context.js";

const jsx = (
  <ProductProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductProvider>
);

ReactDOM.render(jsx, document.getElementById("root"));
