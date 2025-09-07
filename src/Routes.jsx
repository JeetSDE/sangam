import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import AlumniDirectory from './pages/alumni-directory';
import LoginPage from './pages/login';
import AlumniDashboard from './pages/alumni-dashboard';
import StudentDashboard from './pages/student-dashboard';
import Register from './pages/register';
import ProfilePage from './pages/profile-page';
import DonationCenter from './pages/donation-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/donation-center" element={<DonationCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;