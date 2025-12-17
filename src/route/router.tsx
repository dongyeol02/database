import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import Homepage from "../pages/Homepage";
import AllStoresPage from "../pages/AllStorePage";
import StampPage from "../pages/StampPage";
import CafeDetailPage from "../pages/CafeDetailPage";
import CartPage from "../pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/AllStore",
        element: <AllStoresPage />,
      },
      {
        path: "/stamp",
        element: <StampPage />,
      },
      {
        path: "/store/:id",
        element: <CafeDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
