import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../baseUrl.js";

const UpdateAppointment = () => {
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const [input, setInput] = useState({
    status: "",
  });
  
  const params = useParams();
  const appointmentId = params.id;
  
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `${baseUrl}/api/v1/appointments/update/${appointmentId}`,
        input
      );
   
      if (res.data.success) {
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-900 to-gray-900 min-h-screen">
      <div className="flex-grow p-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
          <h1 className="text-3xl text-center text-black font-bold mb-6">
            Edit Appointment
          </h1>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Status */}
              <div>
                <select
                  id="status"
                  name="status"
                  className="w-full p-2 bg-gray-200 text-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeHandler}
                  value={input.status}
                  required
                >
                  <option value="" disabled>
                    Update Status
                  </option>
                  <option value="accepted">accepted</option>
                  <option value="pending">pending</option>
                  <option value="cancelled">cancelled</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition duration-200 w-full"
              >
                Update
              </button>
              <Button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAppointment;
