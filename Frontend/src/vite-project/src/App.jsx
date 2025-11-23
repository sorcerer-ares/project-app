import React from 'react'
import { useAuthStore } from "./store/authStore";
import { Loader } from "lucide-react";
import HomePage from "./pages/HomePage";
import "./pages/Homepage.css"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
// import SignupPage from './pages/SignupPage';
import { Toaster } from 'react-hot-toast';
import RecentPage from './pages/RecentPage';
import StarredPage from './pages/StarredPage';


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
   console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
       <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/recent" element={authUser ? <RecentPage /> : <Navigate to="/signup" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/starred" element={authUser ? <StarredPage /> : <Navigate to="/login" />} />
        {/* <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
      </Routes>
      <Toaster/>
    </>
  );
};

export default App;
