import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useFetchDoctorAppointments from "../../customHooks/useFetchDoctorAppointments";
import { useSelector } from "react-redux";
import { EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useFetchDoctorAppointments();
  const { doctorAppointments, singleDoctor } = useSelector(
    (store) => store.doctors
  );

  const filteredAppointments = doctorAppointments.filter((appointment) =>
    appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "accepted":
        return "bg-teal-500 text-white";
      case "pending":
        return "bg-gray-400 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-yellow-500 text-black";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center mb-6 text-2xl md:text-3xl font-bold text-gray-800">
        <span className="text-teal-600">{singleDoctor?.name}'s</span> Appointments
      </h1>

      {/* Search & Back */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 max-w-4xl mx-auto gap-3">
        <Button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Back
        </Button>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient..."
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 flex-1"
          />
          <Button className="p-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg h-10 w-10 flex items-center justify-center">
            <FaSearch />
          </Button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Patient Info</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="hidden md:table-cell px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No appointments found.
                </td>
              </tr>
            )}
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={appointment?.patient.avatar}
                    alt={appointment?.patient.name}
                    className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{appointment?.patient.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(appointment?.date).toLocaleDateString()}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-gray-700">
                  {appointment?.time}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      appointment?.status
                    )}`}
                  >
                    {appointment?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <EditIcon
                    className="cursor-pointer text-gray-600 hover:text-teal-600"
                    onClick={() =>
                      navigate(`/doctor/update-appointment/${appointment?._id}`)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
