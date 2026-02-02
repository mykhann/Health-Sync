import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSingleDoctor } from "../../reduxStore/doctorsSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleDoctor } = useSelector((store) => store.doctors);

  const handleLogout = () => {
    dispatch(setSingleDoctor(null));
    navigate("/doctor/login");
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto">
          {/* Logout */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12">
            Welcome, Dr. {singleDoctor?.name || "Dashboard"}
          </h1>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appointments Card */}
            <div className="flex flex-col justify-center bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaCalendarAlt className="text-5xl text-teal-500 mb-4 self-center" />
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Appointments
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Manage and track your upcoming appointments.
              </p>
              <Link
                to="/doctor/view-appointments"
                className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 self-center transition duration-300"
              >
                View Appointments
              </Link>
            </div>

            {/* Analytics Card */}
            <div className="flex flex-col justify-center bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition duration-300 transform hover:scale-105">
              <FaChartLine className="text-5xl text-indigo-500 mb-4 self-center" />
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Analytics
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                View appointment trends and patient care metrics.
              </p>
              <Link
                to="/doctor/manage-patients"
                className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 self-center transition duration-300"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
