import "./App.css";
import { IndexRoute } from "./Routers/IndexRoute";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

const route = createHashRouter(IndexRoute);

function App() {
  return (
    <>
      <AnimatePresence>
        <RouterProvider router={route} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AnimatePresence>
    </>
  );
}

export default App;
