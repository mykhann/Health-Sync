import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../layout/Footer";
import { baseUrl } from "../../baseUrl.js";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: null,
  });

  const onchangeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onchangeFileHandler = (e) => {
    const avatar = e.target.files[0];
    setInput((prevInput) => ({ ...prevInput, avatar }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    if (input.avatar) formData.append("avatar", input.avatar);

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/users/register`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

   <div className="flex justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
  <div className="relative mt-20 bg-white/90 backdrop-blur-md shadow-xl rounded-3xl max-w-md w-full py-8 px-6 md:px-8 border border-white/30">
    
    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
      Sign Up
    </h2>

    <form onSubmit={submitHandler} className="space-y-4">
      {/* Avatar */}
      <div className="flex justify-center">
        <label className="relative cursor-pointer">
          <input
            type="file"
            name="avatar"
            onChange={onchangeFileHandler}
            accept="image/*"
            className="sr-only"
          />
          <div className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-blue-300 rounded-full hover:border-blue-500 transition-colors">
            {input.avatar ? (
              <img
                src={URL.createObjectURL(input.avatar)}
                alt="avatar preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              <>
                <PhotoIcon className="h-6 w-6 text-blue-500 mb-1" />
                <p className="text-xs text-blue-500">Upload Avatar</p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Inputs */}
      {["name", "email", "password", "phone"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : field === "phone" ? "tel" : "text"}
          name={field}
          value={input[field]}
          onChange={onchangeInputHandler}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 md:p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all text-sm md:text-base"
          required
        />
      ))}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 md:py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 text-sm md:text-base"
      >
        Sign Up
      </button>
    </form>

    {/* Login Link */}
    <div className="text-center mt-4">
      <Link to="/login" className="text-blue-800 hover:text-blue-600 font-medium text-sm md:text-base transition-colors">
        Already have an account? Log In
      </Link>
    </div>
  </div>
</div>

      <Footer />
    </>
  );
};

export default Signup;
