import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import { ErrorPage } from "./404";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
      }, 
      {
        path: "view-order",
        Component: ViewOrder
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>
      },
      {
        path: "*",
        Component: ErrorPage
      } 
    ],
  },
]);
export default router