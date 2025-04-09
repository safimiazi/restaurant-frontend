/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import MaxWidth from "../../wrapper/MaxWidth";
import { useAdminLoginMutation } from "../../redux/api/authApi/AuthApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setAdmin } from "../../redux/features/auth/AdminAuthSlice";
import { useNavigate } from "react-router-dom";

export default function LoginRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("mohibullamiazi@gmail.com");
  const [password, setPassword] = useState("password");
  const [adminLogin] = useAdminLoginMutation();
  const handleAuth = async (e: any) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const result = (await adminLogin({
          email,
          password,
        }).unwrap()) as any; // Using unwrap() to properly handle the promise
        console.log(result);
        dispatch(
          setAdmin({
            token: result?.data.token,
            user: {
              userId: result?.data.user?._id,
              phone: result?.data.user?.phone,
              role: result?.data.user?.role,
              name: result?.data.user?.name,
              email: result?.data.user?.email,
              address: result?.data.user?.address,
            },
          })
        );

        // Wait for state to update and persist

        Swal.fire({
          title: "Logged In!",
          text: result.message,
          icon: "success",
        }).then(() => {
          navigate("/admin/dashboard"); // Redirect after successful login
        });
      } catch (error: any) {
        Swal.fire({
          title: "Login Failed",
          text: error.data?.message || "An error occurred",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100 p-4">
      <MaxWidth>
        <div
          className={`bg-gray-900 shadow-xl rounded-lg overflow-hidden w-full flex flex-col md:flex-row 
          transition-transform duration-500 ${
            isLogin ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Left Side Image */}
          <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-900 p-6">
            <img
              src="/auth.webp"
              alt="Login Illustration"
              className="w-full h-auto"
            />
          </div>

          {/* Right Side Form */}
          <div
            className={`w-full md:w-1/2 p-8 ${
              isLogin ? "md:rounded-l-2xl" : "md:rounded-r-2xl"
            }  bg-white`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {isLogin ? "Sign In" : "Register"}
            </h2>

            <form className="mt-4 space-y-4">
              {!isLogin && (
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <User className="w-5 h-5 text-gray-500 ml-3" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 outline-none"
                  />
                </div>
              )}

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <Mail className="w-5 h-5 text-gray-500 ml-3" />
                <input
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 outline-none"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden relative">
                <Lock className="w-5 h-5 text-gray-500 ml-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                onClick={handleAuth}
                className="w-full bg-gray-900 cursor-pointer text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {isLogin ? "Sign In" : "Register"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="w-full h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500">or</span>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
              Continue with Google
            </button>

            <p className="text-center text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="text-blue-600 hover:underline ml-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}
