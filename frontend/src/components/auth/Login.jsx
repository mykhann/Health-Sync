import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";
import Footer from "../layout/Footer";
import { baseUrl } from "../../baseUrl.js";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/users/login`,
        input,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
        <div className="relative mt-20 bg-white/90 backdrop-blur-md shadow-xl rounded-3xl max-w-md w-full py-8 px-6 md:px-8 border border-white/30">
          
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={onChangeInput}
              placeholder="Email Address"
              className="w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-sm md:text-base"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={onChangeInput}
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-sm md:text-base"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 md:py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 text-sm md:text-base"
            >
              Login
            </button>
          </form>

          {/* Doctor login */}
          <p className="text-center mt-4 text-sm md:text-base">
            <Link to="/doctor/login">
              <span className="text-blue-900 font-medium hover:text-blue-700 transition-colors">
                Login
              </span>
            </Link>{" "}
            as a Doctor
          </p>

          {/* Signup link */}
          <div className="text-center mt-4">
            <Link to="/signup">
              <p className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                Signup ?
              </p>
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
