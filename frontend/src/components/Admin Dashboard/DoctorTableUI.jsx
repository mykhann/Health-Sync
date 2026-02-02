import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllDoctors from "../../customHooks/useFetchAllDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import { setDoctors } from "../../reduxStore/doctorsSlice";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "../../baseUrl.js";

const DoctorTableUI = () => {
  const [showMore, setShowMore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetchAllDoctors();

  const { doctors = [] } = useSelector((store) => store.doctors);
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMore = (index) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  const handleDelete = async (doctorId) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/v1/doctors/delete/${doctorId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setDoctors(doctors.filter((doctor) => doctor._id !== doctorId))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6">
      <div className="container p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-white shadow-lg rounded-lg">
        {/* Header + Search */}
        <div className="flex flex-wrap items-center mb-6 gap-2">
          <Button
            onClick={() => navigate(-1)}
            className="bg-blue-800 hover:bg-blue-900 text-white rounded-full"
          >
            Back
          </Button>
          <Button
            onClick={() => navigate("/admin/add-doctor")}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full ml-2"
          >
            Add Doctor
          </Button>
          <div className="ml-auto flex items-center w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Doctors..."
              className="flex-grow md:flex-none p-2 md:p-3 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="text-gray-600 ml-2 w-5 h-5" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor, index) => (
                <React.Fragment key={doctor._id}>
                  <tr className="border-t hover:bg-blue-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/doctor-info/${doctor._id}`}
                        className="flex items-center"
                      >
                        <img
                          className="w-16 h-16 rounded-full object-cover object-top"
                          src={doctor.avatar}
                          alt={doctor.name}
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-between">
                      {doctor.name}
                      {/* Mobile toggle */}
                      <button
                        aria-label="Toggle more information"
                        className="ml-4 text-blue-500 hover:text-blue-600 md:hidden flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMore(index);
                        }}
                      >
                        {showMore === index ? (
                          <>
                            <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">{doctor.specialization}</td>
                    <td className="px-6 py-4 hidden md:table-cell">{doctor.email}</td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="flex items-center text-red-600 hover:text-red-700 rounded-full px-2 py-1 border border-red-600 hover:bg-red-50 transition"
                        aria-label="Delete doctor"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Mobile more info */}
                  {showMore === index && (
                    <tr className="md:hidden bg-gray-50">
                      <td colSpan={2} className="px-6 py-3">
                        <p>
                          <strong>Specialization:</strong> {doctor.specialization}
                        </p>
                        <p>
                          <strong>Contact:</strong> {doctor.email}
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorTableUI;
