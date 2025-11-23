import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast"; 


const LoginPage= () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password)
      return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <div className="bg-primary-500 p-1.5 rounded-md">
                  <span className="material-symbols-outlined text-white">cloud</span>
                </div>
                <h1 className="text-xl font-bold">CloudStorage</h1>
              </div>
              <button className="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-300">
                Need help?
              </button>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">
              Please enter your details to sign in
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-all duration-300 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary-600 hover:text-primary-800 transition-colors duration-300 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Password Input with toggle */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-500 transition-all duration-300 outline-none pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-5 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-400"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-gray-300 flex-grow" />
                <span className="mx-4 text-sm text-gray-500">
                  or continue with
                </span>
                <div className="border-t border-gray-300 flex-grow" />
              </div>

              {/* Social Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <i className="fa-brands fa-google text-xl" />
                </button>
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <i className="fa-brands fa-apple text-xl" />
                </button>
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <i className="fa-brands fa-github text-xl" />
                </button>
              </div>

              {/* Sign up link */}
              <p className="text-center text-gray-600 text-sm mt-6">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-800 font-medium ml-1 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Info Section */}
          <div className="w-full md:w-1/2 bg-primary-600 p-10 hidden md:flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-2xl font-bold mb-6">
                Store everything important in one secure location
              </h3>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
                <div className="flex items-start mb-4">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <span className="material-symbols-outlined text-white">
                      security
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      End-to-end encryption
                    </h4>
                    <p className="text-white/70 text-sm mt-1">
                      Your files are encrypted and secure in our cloud
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <span className="material-symbols-outlined text-white">
                      devices
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Access anywhere</h4>
                    <p className="text-white/70 text-sm mt-1">
                      Available on desktop, mobile and web
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative / Stats Section */}
            <div className="absolute bottom-0 right-0 opacity-20 -mb-16 -mr-16">
              <span className="material-symbols-outlined text-white text-[200px]">
                cloud_circle
              </span>
            </div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-primary-600"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-primary-600"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-primary-600"
                />
              </div>
              <div className="text-white">
                <p className="text-sm font-medium">Join 10,000+ users</p>
                <p className="text-xs text-white/70">
                  Start your free trial today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
