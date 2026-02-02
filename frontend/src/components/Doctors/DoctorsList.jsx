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
        const res = await axios.get(
          `${baseUrl}/api/v1/doctors/get-all`
        );
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setDoctors(res.data.doctors));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, [dispatch]);

  const { doctors = [] } = useSelector((store) => store.doctors);
  const filteredDoctors = [
    ...doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...doctors.filter((doctor) =>
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  ];

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="py-10 max-w-5xl mx-auto">
        <div className="flex max-w-2xl flex-col sm:flex-row justify-center sm:justify-start mb-4 ml-0 sm:ml-10">
          <div className="flex items-center w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Doctors By Name & Specialization..."
              className="p-4 rounded-full border h-10 border-gray-300 focus:outline-none focus:border-blue-500 flex-grow sm:max-w-xs md:max-w-md" // Adjusted max-width for different screen sizes
            />
            <FaSearch className="w-6 h-6 text-blue-900 ml-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredDoctors.length === 0 ? (
            <p className="text-red-900 text-center">No Doctors available.</p>
          ) : (
            filteredDoctors.map((doctor, index) => (
              <Card
                key={index}
                className="max-w-[28rem] overflow-hidden shadow-lg"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={doctor.avatar}
                    alt="Doctor Avatar"
                    className="w-60 h-60 object-cover object-top mx-auto"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h4" color="blue-gray">
                    <div className="flex">
                      {doctor.name.toUpperCase()}{" "}
                      <Verified className="mt-1 ml-3" />
                    </div>
                  </Typography>
                  <Typography variant="p" color="blue-gray">
                    {doctor.specialization}
                  </Typography>

                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-1 font-normal"
                  >
                    Appointment Fee :{" "}
                    <span className="font-bold text-green-800">{`${doctor.fees} $ `}</span>
                  </Typography>
                </CardBody>

                <Button
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Book Appointment
                </Button>
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
