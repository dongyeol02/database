import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { AuthLayout } from "../layout/AuthLayout";
import Homepage from "../pages/Homepage";
import AllStoresPage from "../pages/AllStorePage";
import StampPage from "../pages/StampPage";
import CafeDetailPage from "../pages/CafeDetailPage";
import CartPage from "../pages/CartPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 네브 + 푸터 있는 일반 레이아웃
    children: [
      { index: true, element: <Homepage /> },
      { path: "AllStore", element: <AllStoresPage /> },
      { path: "stamp", element: <StampPage /> },
      { path: "store/:id", element: <CafeDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "orderHistory", element: <OrderHistoryPage /> },
    ],
  },
  {
    element: <AuthLayout />, // 네브/푸터 없는 레이아웃
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      // 나중에 /signup, /reset-password 등도 여기로
    ],
  },
]);
