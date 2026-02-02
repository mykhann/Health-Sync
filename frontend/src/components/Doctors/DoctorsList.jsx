import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { setDoctors } from "../../reduxStore/doctorsSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Verified } from "lucide-react";
import Footer from "../layout/Footer";
import { FaSearch } from "react-icons/fa";
import { baseUrl } from "../../baseUrl.js";

const DoctorsList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/doctors/get-all`);
        if (res.data.success) {
          dispatch(setDoctors(res.data.doctors));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchDoctors();
  }, [dispatch]);

  const { doctors = [] } = useSelector((store) => store.doctors);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="py-10 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
        {/* Search */}
        <div className="flex mt-10 justify-center mb-8">
          <div className="flex items-center w-full max-w-lg bg-white/90 backdrop-blur-md border border-white/30 rounded-full shadow-md p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Doctors by Name or Specialization..."
              className="flex-grow bg-transparent p-3 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400"
            />
            <FaSearch className="w-5 h-5 text-blue-900 ml-2" />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredDoctors.length === 0 ? (
            <p className="text-red-900 text-center col-span-full">
              No doctors available.
            </p>
          ) : (
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="max-w-sm bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-white/30 hover:scale-105 transition-transform"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-t-2xl overflow-hidden"
                >
                  <img
                    src={doctor.avatar}
                    alt="Doctor Avatar"
                    className="w-full h-60 object-cover"
                  />
                </CardHeader>

                <CardBody className="text-center">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="flex justify-center items-center gap-2 font-bold"
                  >
                    {doctor.name.toUpperCase()} <Verified className="text-blue-500" />
                  </Typography>

                  <Typography
                    variant="small"
                    color="gray"
                    className="block mt-1 text-blue-900 font-medium"
                  >
                    {doctor.specialization}
                  </Typography>

                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="mt-2 text-sm font-medium"
                  >
                    Fee:{" "}
                    <span className="text-green-800 font-semibold">
                      {doctor.fees} $
                    </span>
                  </Typography>

                  <Button
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                    className="mt-4 bg-blue-900 hover:bg-blue-800 w-full rounded-xl shadow-lg transition-transform hover:scale-105"
                  >
                    Book Appointment
                  </Button>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DoctorsList;
