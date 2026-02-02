import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import useFetchDoctorAppointments from "../../customHooks/useFetchDoctorAppointments";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PatientsRecords = () => {
  const { doctorAppointments, singleDoctor } = useSelector(
    (store) => store.doctors
  );
  const navigate = useNavigate();
  useFetchDoctorAppointments();

  const totalPatients = doctorAppointments.length;
  const pendingAppointments = doctorAppointments.filter(
    (a) => a.status === "pending"
  ).length;
  const completedAppointments = doctorAppointments.filter(
    (a) => a.status === "completed"
  ).length;
  const cancelledAppointments = doctorAppointments.filter(
    (a) => a.status === "cancelled"
  ).length;
  const acceptedAppointments = doctorAppointments.filter(
    (a) => a.status === "accepted"
  ).length;

  const cardStyles = {
    pending: "bg-blue-50 text-blue-800",
    completed: "bg-teal-100 text-teal-900",
    cancelled: "bg-gray-100 text-gray-800",
    accepted: "bg-indigo-100 text-indigo-900",
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        <Button
          onClick={() => navigate("/doctor/dashboard")}
          className="bg-gray-800 text-white hover:bg-gray-900"
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white text-center">
          {singleDoctor?.name}'s Patient Records
        </h1>
        <div className="flex items-center">
          <FaUser className="mr-2 text-teal-300" />
          <span className="text-xl font-semibold text-white">
            Total Patients: {totalPatients}
          </span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div
          className={`shadow-md rounded-lg p-6 text-center ${cardStyles.pending}`}
        >
          <h3 className="text-lg font-semibold">Pending Appointments</h3>
          <p className="text-3xl font-bold mt-2">{pendingAppointments}</p>
        </div>

        <div
          className={`shadow-md rounded-lg p-6 text-center ${cardStyles.completed}`}
        >
          <h3 className="text-lg font-semibold">Completed Appointments</h3>
          <p className="text-3xl font-bold mt-2">{completedAppointments}</p>
        </div>

        <div
          className={`shadow-md rounded-lg p-6 text-center ${cardStyles.cancelled}`}
        >
          <h3 className="text-lg font-semibold">Cancelled Appointments</h3>
          <p className="text-3xl font-bold mt-2">{cancelledAppointments}</p>
        </div>

        <div
          className={`shadow-md rounded-lg p-6 text-center ${cardStyles.accepted}`}
        >
          <h3 className="text-lg font-semibold">Accepted Appointments</h3>
          <p className="text-3xl font-bold mt-2">{acceptedAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientsRecords;
