import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleDoctor } from "../../reduxStore/doctorsSlice";
import { toast } from "react-toastify";
import Footer from "../layout/Footer";
import { baseUrl } from "../../baseUrl.js";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/doctors/doctor-login`,
        input,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/doctor/dashboard");
        dispatch(setSingleDoctor(res.data.doctor));
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center py-10 bg-blue-50 min-h-screen">
        <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-6">
            Doctor's Login
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={onChangeInput}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={onChangeInput}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 font-semibold rounded-lg shadow-md transition-all hover:scale-105 text-sm"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <Link to="/login" className="text-blue-900 hover:text-blue-700 font-medium">
              Login as a patient
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DoctorLogin;
