// import React from "react";
// import logo from "./logo.svg";
import "./App.scss";
import { router } from "../src/routes";
import { RouterProvider } from "react-router-dom";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
