import React from "react";
import useFetchDoctorById from "../../customHooks/useFetchDoctorById";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const DoctorInfo = () => {
  const navigate = useNavigate();
  useFetchDoctorById();
  const { singleDoctor } = useSelector((store) => store.doctors);

  if (!singleDoctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-900" />
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-start p-6">
      <Button
        className="self-start mb-6 bg-blue-900 hover:bg-blue-800 text-white rounded-lg"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Doctor Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={singleDoctor.avatar}
            alt={singleDoctor.name}
            className="w-full h-64 lg:h-full object-cover object-top"
          />
        </div>

        {/* Doctor Info Box */}
        <div className="flex flex-col justify-center p-6 lg:p-8 w-full">
          <h3 className="text-2xl font-bold text-blue-900">{singleDoctor?.name}</h3>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Email:</span> {singleDoctor?.email}</p>
          <p className="text-gray-700 mt-1"><span className="font-semibold">Specialization:</span> {singleDoctor?.specialization}</p>
          <p className="text-gray-600 mt-3">{singleDoctor?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
