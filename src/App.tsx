import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { IndexRoute } from "./Routers/IndexRoute";
import { createHashRouter, RouterProvider } from "react-router-dom";

const route = createHashRouter(IndexRoute);

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
