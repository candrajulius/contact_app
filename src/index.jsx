import React from "react";
import ReactDOM from "react-dom/client";
import ContactApp from "./components/ContactApp";
import { BrowserRouter } from "react-router-dom";
import "../src/style/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContactApp />
  </BrowserRouter>
);
