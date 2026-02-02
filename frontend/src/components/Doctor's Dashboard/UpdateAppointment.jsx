import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../baseUrl.js";

const UpdateAppointment = () => {
  const [input, setInput] = useState({
    status: "",
  });

  const navigate = useNavigate();
  const { id: appointmentId } = useParams();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${baseUrl}/api/v1/appointments/update/${appointmentId}`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Appointment updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
          Edit Appointment
        </h1>

        <form onSubmit={submitHandler}>
          {/* Status Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block mb-2 font-semibold text-gray-700"
            >
              Appointment Status
            </label>
            <select
              id="status"
              name="status"
              value={input.status}
              onChange={changeHandler}
              required
              className="w-full p-3 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
            >
              Update
            </button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded transition duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointment;
