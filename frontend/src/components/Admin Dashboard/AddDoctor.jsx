import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDoctors } from "../../reduxStore/doctorsSlice";
import { toast } from "react-toastify";
import { baseUrl } from "../../baseUrl.js";

const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    fees: "",
    experience: "",
    description: "",
    specialization: "",
    avatar: null,
  });

  const onChangeFileHandler = (e) => {
    setInput({ ...input, avatar: e.target.files[0] });
  };

  const onChangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in input) {
      if (input[key]) formData.append(key, input[key]);
    }

    try {
      const res = await axios.post(`${baseUrl}/api/v1/doctors/create-doctor`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setDoctors(res.data.doctor));
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error creating doctor");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Add a New Doctor
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={onChangeInputHandler}
              placeholder="Doctor's Name"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={onChangeInputHandler}
              placeholder="Doctor's Email"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={onChangeInputHandler}
              placeholder="Doctor's Password"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="number"
              name="experience"
              value={input.experience}
              onChange={onChangeInputHandler}
              placeholder="Experience (years)"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="specialization"
              value={input.specialization}
              onChange={onChangeInputHandler}
              placeholder="Specialization"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="number"
              name="fees"
              value={input.fees}
              onChange={onChangeInputHandler}
              placeholder="Fees ($)"
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <textarea
            name="description"
            value={input.description}
            onChange={onChangeInputHandler}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <label className="block w-full text-center p-3 border border-gray-300 rounded-md cursor-pointer bg-blue-100 hover:bg-blue-200 transition">
            Upload Doctor's Picture
            <input type="file" onChange={onChangeFileHandler} accept="image/*" className="hidden" />
          </label>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button type="submit" className="bg-blue-900 h-12 hover:bg-blue-800 w-full rounded-lg py-2">
              Register Doctor
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-red-700 hover:bg-red-800 w-full rounded-lg py-2"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
