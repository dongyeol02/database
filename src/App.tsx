import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";
import { CartProvider } from "./components/context/CartContext";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
