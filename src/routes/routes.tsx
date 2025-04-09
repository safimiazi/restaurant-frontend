import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/user/home/Home";
import ProductDetails from "../pages/user/ProductDetails/ProductDetails";
import Admin from "../Admin";
import { routeGenerator } from "../utils/routesGenerator";
import LoginRegistration from "../pages/auth/LoginRegistration";
import { adminPaths } from "./admin.routes";
import Products from "../pages/user/products/Products";
import CheckOut from "../pages/user/checkout/CheckOut";
import PaymentSuccess from "../pages/user/checkout/PaymentSuccess";
import PaymentFail from "../pages/user/checkout/PaymentFail";
import PaymentCancelled from "../pages/user/checkout/PaymentCancelled";
import BestSelling from "../pages/user/bestSelling/BestSelling";
import OfferProducts from "../pages/user/offerProducts/OfferProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/best-selling",
        element: <BestSelling />,
      },
      {
        path: "/offer-products",
        element: <OfferProducts />,
      },
      {
        path: "/payment/success/:tran_id",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail/:tran_id",
        element: <PaymentFail />,
      },
      {
        path: "/payment/cancelled/:tran_id",
        element: <PaymentCancelled />,
      },
      {
        path: "/details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart/checkout",
        element: <CheckOut/>,
      }
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/auth",
    element: <LoginRegistration />,
  },
]);

export default router;
