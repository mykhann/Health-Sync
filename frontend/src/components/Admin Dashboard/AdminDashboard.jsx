import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaUserMd, FaUsers, FaSignOutAlt } from "react-icons/fa"; // ✅ Correct icons
import LatestDoctors from "./LatestDoctors";
import LatestAppointments from "./LatestAppointments";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reduxStore/authSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors = [] } = useSelector((store) => store.doctors);
  const { appointmentsAdmin = [] } = useSelector((store) => store.appointments);

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-12 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0 text-blue-900">
          Healthcare Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-all shadow-md hover:scale-105"
        >
          <FaSignOutAlt className="mr-2 w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Quick Stats / Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-6 md:px-12 py-6">
        {/* Add Doctor */}
        <Link to="/admin/add-doctor">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex flex-col items-center text-center border-t-4 border-blue-500">
            <FaPlus className="text-4xl md:text-5xl mb-2 text-blue-500" />
            <h2 className="font-semibold text-lg md:text-xl mt-1">Add Doctor</h2>
            <p className="text-sm text-gray-600 mt-1">Add new doctor to the system</p>
          </div>
        </Link>

        {/* View Doctors */}
        <Link to="/admin/view-doctors">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex flex-col items-center text-center border-t-4 border-green-500">
            <FaUserMd className="text-4xl md:text-5xl mb-2 text-green-500" />
            <h2 className="font-semibold text-lg md:text-xl mt-1">
              Doctors ({doctors.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">Manage all registered doctors</p>
          </div>
        </Link>

        {/* View Appointments */}
        <Link to="/admin/view-appointments">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex flex-col items-center text-center border-t-4 border-red-500">
            <FaUsers className="text-4xl md:text-5xl mb-2 text-red-500" />
            <h2 className="font-semibold text-lg md:text-xl mt-1">
              Appointments ({appointmentsAdmin.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">View all doctor appointments</p>
          </div>
        </Link>
      </div>

      {/* Latest Doctors & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 px-6 md:px-12 pb-12">
        <LatestDoctors />
        <LatestAppointments />
      </div>
    </div>
  );
};

export default AdminDashboard;
