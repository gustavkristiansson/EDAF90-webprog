import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import { ConfirmOrder } from "./ConfirmOrder";
import { ErrorPage } from "./404";
import inventoryLoader from './InventoryLoader';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:id",
            Component: ConfirmOrder
          }
        ]
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