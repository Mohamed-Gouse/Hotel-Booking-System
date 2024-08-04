import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import HotelDetailPage from "./pages/HotelDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SelectionPage from "./pages/SelectionPage";
import ProfilePage from "./pages/ProfilePage";
import HotelPage from "./hotel/pages/HotelPage";
import HotelAddPage from "./hotel/pages/HotelAddPage";
import AdminHotelDetailPage from "./hotel/pages/AdminHotelDetailPage";
import SuccessPage from "./pages/SuccessPage";
import AdminBookings from "./hotel/pages/AdminBookings";
import AdminMessages from "./hotel/pages/AdminMessages";
import AdminBookingDetailPage from "./hotel/pages/AdminBookingDetailPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import AdminReservationPage from "./hotel/pages/AdminReservationPage";
import AdminReservationDetailPage from "./hotel/pages/AdminReservationDetailPage";
import ReviewWritingPage from "./pages/ReviewWritingPage";
import SuperDashboardPage from "./admin/pages/SuperDashboardPage";
import SuperHotelListPage from "./admin/pages/SuperHotelListPage";
import SuperHotelDetailPage from "./admin/pages/SuperHotelDetailPage";
import SuperUserListPage from "./admin/pages/SuperUserListPage";
import HotelEdit from "./hotel/features/hotel/HotelEdit";
import AdminReviewPage from "./hotel/pages/AdminReviewPage";
import SearchResultPage from "./pages/SearchResultPage";
import DashboardPage from "./hotel/pages/DashboardPage";

const AppRoutes = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isLogged ? (
            <LoginPage />
          ) : (
            <Navigate
              to={
                user.role === "user"
                  ? "/"
                  : user.role === "hotel"
                  ? "/admin/dashboard"
                  : "/super/dashboard"
              }
            />
          )
        }
      />

      {/* UserRouters */}
      <Route path="/" element={isLogged && user.role !== 'user' ? <Navigate to={'/login'} /> : <HomePage />} />
      <Route path="/hotel/:slug" element={<HotelDetailPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route
        path="/selection"
        element={
          isLogged && user.role === "user" ? (
            <SelectionPage />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isLogged && user.role === "user" ? (
            <ProfilePage />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/success"
        element={
          isLogged && user.role === "user" ? (
            <SuccessPage />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/profile/booking/:id"
        element={
          isLogged && user.role === "user" ? (
            <BookingDetailPage />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="/profile/review/:id"
        element={
          isLogged && user.role === "user" ? (
            <ReviewWritingPage />
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />


      {/* HotelRouter */}
      <Route
        path="/admin/dashboard"
        element={
          isLogged && user.role === "hotel" ? (
            <DashboardPage />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/admin/hotels"
        element={
          isLogged && user.role === "hotel" ? (
            <HotelPage />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/admin/add-hotel"
        element={
          isLogged && user.role === "hotel" ? (
            <HotelAddPage />
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/admin/hotel/:slug"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminHotelDetailPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/hotel/:slug/edit"
        element={
          isLogged && user.role === "hotel" ? (
            <HotelEdit />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/bookings"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminBookings />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/bookings/:id"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminBookingDetailPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/bookings/reservation"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminReservationPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/bookings/reservation/:id"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminReservationDetailPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/messages"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminMessages />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/reviews"
        element={
          isLogged && user.role === "hotel" ? (
            <AdminReviewPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* SuperAdminRouter */}

      <Route
        path="/super/dashboard"
        element={
          isLogged && user.role === "admin" ? (
            <SuperDashboardPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/super/hotels"
        element={
          isLogged && user.role === "admin" ? (
            <SuperHotelListPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/super/hotels/:id"
        element={
          isLogged && user.role === "admin" ? (
            <SuperHotelDetailPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/super/users"
        element={
          isLogged && user.role === "admin" ? (
            <SuperUserListPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* CommonRouter */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
