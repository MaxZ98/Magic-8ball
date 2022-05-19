import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import InputField from "./inputField.js";

function App() {
  return <InputField />;
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Shopify-ai" />, mountNode);
