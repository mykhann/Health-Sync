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
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
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
        <h1 className="text-2xl font-bold text-gray-800">
          <Loader2 className="animate-spin w-10 h-14" />
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start pt-8"> 
        <h1 className="mb-6 text-4xl font-bold text-black text-center">
          Book an appointment with <span className="text-red-800">{singleDoctor.name}</span>
        </h1>

        <div className="flex flex-col md:flex-row w-full max-w-5xl space-x-0 md:space-x-4">
          {/* Doctor Card */}
          <div className="w-full max-w-md p-6 md:mr-6 bg-white rounded-lg ">
            <SingleDoctorCard />
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-gray-300 mx-4"></div>

          {/* Appointment Form */}
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md p-6 rounded-lg space-y-4"
          >
            <div>
              <label
                htmlFor="date"
                className="block mb-1 text-sm font-medium text-black"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                onChange={inputHandler}
                value={input.date}
                name="date"
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block mb-1 text-sm font-medium text-black"
              >
                Select Time
              </label>
              <input
                type="time"
                id="time"
                onChange={inputHandler}
                value={input.time}
                name="time"
                required
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block mb-1 text-sm font-medium text-black"
              >
                Reason for Appointment
              </label>
              <textarea
                id="reason"
                name="reason"
                onChange={inputHandler}
                value={input.reason}
                placeholder="Enter the reason for your appointment"
                required
                rows="4"
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              ></textarea>
            </div>
            {user ? (
              <Button
                type="submit"
                className="w-full py-4 px-4 bg-blue-900 text-white font-semibold rounded-md transition"
              >
                Book an appointment
              </Button>
            ) : (
              <div>
                <Button
                  type="submit"
                  className="w-full py-4 px-4 bg-blue-500 text-white font-semibold rounded-md transition"
                  disabled={true}
                >
                  Book an appointment
                </Button>
                <h1 className="text-black mt-4">
                  <Link to="/login">
                    <span className="font-bold text-blue-500">Login </span>
                  </Link>
                  to book an appointment
                </h1>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
