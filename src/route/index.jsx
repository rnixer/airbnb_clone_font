import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Header from "../layouts/Header";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import RedirectIfAuthenticated from "../feature/auth/components/RedirectIfAuthenticated";
import PlaceFormPage from "../pages/places/PlaceFormPage";
import ProtectedRoute from "../feature/auth/components/ProtectedRoute";
import BookingPage from "../pages/BookingPage";
import PaymentPage from "../pages/PaymentPage";

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

        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/account/:subpage?",
        element: <AccountPage />,
      },
      {
        path: "/account/places/account/places/new",
        element: <PlaceFormPage />,
      },
      {
        path: "/account/places/account/places/:placeId",
        element: <PlaceFormPage />,
      },
      {
        path: "/bookingPage/:placeId",
        element: <BookingPage />,
      },
      {
        path: "/payment/:placeId",
        element: <PaymentPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
