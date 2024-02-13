import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Header from "../layouts/Header";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="px-10 flex flex-col min-h-screen">
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account/:subpage?",
        element: <AccountPage />,
      },
      // {
      //   path: "/account/booking",
      //   element: <AccountPage />,
      // },
      // {
      //   path: "/account/place",
      //   element: <AccountPage />,
      // },
      // {
      //   path: "/account/payment",
      //   element: <AccountPage />,
      // },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
