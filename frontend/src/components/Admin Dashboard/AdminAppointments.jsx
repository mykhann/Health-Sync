import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchAdminAppointments from "../../customHooks/useFetchAdminAppointments";
import { Button } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

const AdminAppointments = () => {
  useFetchAdminAppointments();
  const { appointmentsAdmin } = useSelector((store) => store.appointments);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filters
  const pendingAppointments = appointmentsAdmin.filter(a => a.status === "pending");
  const acceptedAppointments = appointmentsAdmin.filter(a => a.status === "accepted");
  const cancelledAppointments = appointmentsAdmin.filter(a => a.status === "cancelled");
  const completedAppointments = appointmentsAdmin.filter(a => a.status === "completed");

  const filteredAppointments = appointmentsAdmin.filter((appointment) =>
    appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "completed": return "bg-teal-500 text-white";
      case "accepted": return "bg-blue-600 text-white";
      case "pending": return "bg-gray-400 text-white";
      case "cancelled": return "bg-gray-500 text-white";
      default: return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-gray-800 text-3xl font-bold mb-4 text-center">
        Admin Appointments
      </h1>

      {/* Search + Back */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Doctor..."
            className="p-2 md:p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
          />
          <FaSearch className="text-gray-600 w-5 h-5 md:w-6 md:h-6" />
        </div>
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-full"
        >
          Back
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 max-w-4xl mx-auto">
        <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded-full">
          Cancelled ({cancelledAppointments.length})
        </Button>
        <Button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-full">
          Pending ({pendingAppointments.length})
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full">
          Accepted ({acceptedAppointments.length})
        </Button>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded-full">
          Completed ({completedAppointments.length})
        </Button>
      </div>

      {/* Table */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow-md bg-white">
          <table className="table-auto w-full text-gray-800">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="border-b border-gray-200">
                  {/* Doctor Info */}
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={appointment.doctor?.avatar}
                      alt={appointment?.doctor?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span>{appointment.doctor?.name}</span>
                  </td>

                  {/* Patient Info */}
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={appointment?.patient?.avatar}
                      alt={appointment?.patient?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span>{appointment?.patient?.name}</span>
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${getStatusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
