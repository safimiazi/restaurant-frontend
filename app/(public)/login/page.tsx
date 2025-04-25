/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useAdminLoginMutation } from "@/redux/api/AuthApi";
import { setUser } from "@/redux/features/AuthSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("superadmin");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await adminLogin({ email, password }).unwrap();
      dispatch(
        setUser({
          id: result?.data.user?._id,
          name: result?.data.user?.name,
          email: result?.data.user?.email,
          role: result?.data.user?.role,
        })
      );
      router.push("/admin");
      toast.success(result?.message || "Login successful!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="mt-4 space-y-4">
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

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
