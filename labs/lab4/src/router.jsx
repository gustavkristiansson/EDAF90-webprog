import { createBrowserRouter, useRouteError } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import { ConfirmOrder } from "./ConfirmOrder";
import { ErrorPage } from "./404";
import inventoryLoader from './InventoryLoader';

// async function inventoryLoader() {
//   const inventory = { Sallad: { price: 10, foundation: true, vegan: true } };
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return inventory;
// }

const router = createBrowserRouter([
  {
    Component: App,
    loader: inventoryLoader,
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