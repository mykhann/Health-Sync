import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import useFetchDoctorById from "../../customHooks/useFetchDoctorById";
import { useDispatch, useSelector } from "react-redux";
import SingleDoctorCard from "./SingleDoctorCard";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { setSingleAppointment } from "../../reduxStore/appointmentsSlice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { baseUrl } from "../../baseUrl.js";
import Footer from "../layout/Footer.jsx";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const doctorId = params.id;
  const singleDoctor = useSelector((store) => store.doctors.singleDoctor);

  const [input, setInput] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/appointments/register-appointment/${doctorId}`,
        input,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setSingleAppointment(res.data.appointment));
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  useFetchDoctorById();

  if (!singleDoctor) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Loader2 className="animate-spin w-12 h-12 text-blue-900" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 flex flex-col items-center">
        <h1 className="text-3xl mt-10 md:text-4xl font-bold text-blue-900 text-center mb-8">
          Book an Appointment with{" "}
          <span className="text-red-800">{singleDoctor.name}</span>
        </h1>

        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 px-4">
          {/* Doctor Card */}
          <div className="w-full md:w-1/3 bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 flex justify-center">
            <SingleDoctorCard />
          </div>

          {/* Appointment Form */}
          <form
            onSubmit={submitHandler}
            className="w-full md:w-2/3 bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 md:p-8 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium text-blue-900">Select Date</label>
              <input
                type="date"
                name="date"
                value={input.date}
                onChange={inputHandler}
                required
                className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-blue-900">Select Time</label>
              <input
                type="time"
                name="time"
                value={input.time}
                onChange={inputHandler}
                required
                className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-blue-900">
                Reason for Appointment
              </label>
              <textarea
                name="reason"
                value={input.reason}
                onChange={inputHandler}
                rows="4"
                placeholder="Enter the reason for your appointment"
                required
                className="w-full p-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {user ? (
              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 py-3 font-semibold rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Book Appointment
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  type="submit"
                  disabled
                  className="w-full bg-blue-500 py-3 font-semibold rounded-xl shadow-lg cursor-not-allowed"
                >
                  Book Appointment
                </Button>
                <p className="text-center text-red-900 font-medium">
                  <Link to="/login" className="hover:text-red-700">
                    <span className="text-blue-800">Login</span>
                  </Link>{" "}
                  to book an appointment
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
        <Footer/>
    </>
  );
};

export default AppointmentPage;
