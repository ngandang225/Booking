import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Layout from "./Layout/layout";
import LayoutPartner from "./Layout/layout-partner";
import PropertyListing from "./pages/property-listing/PropertyListing";
import PropertyDetail from "./pages/property-detail/PropertyDetail";
import SignUpLandLord from "./pages/sign-up-landlord/SignUpLandlord";
import CheckOut from "./pages/room-booking/CheckOut";
import routes from "./routes";
import ManageRoom from "./pages/manage-rooms/ManageRoom";
import Home from "./pages/home/Home";
import StaffListing from "./pages/staff-listing/StaffListing";
import ErrorPage from "./pages/error-page/ErrorPage";
//demo
const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.listings,
        element: <PropertyListing />,
      },
      {
        path: routes.detail(null),
        element: <PropertyDetail />,
      },
      {
        path: routes.landlordSignUp,
        element: <SignUpLandLord />,
      },
      {
        path: routes.checkout,
        element: <CheckOut />,
      },
    ],
  },
  {
    //path: routes.manageProperty,
    path: routes.properties,
    element: <LayoutPartner />,
    children: [
      {
        path: routes.stafflistings,
        element: <StaffListing />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
export { router };
