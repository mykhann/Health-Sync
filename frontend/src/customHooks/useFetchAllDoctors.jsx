import axios from 'axios';
import React, { useEffect } from 'react';
import { setDoctors } from '../reduxStore/doctorsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { baseUrl } from '../baseUrl';

const useFetchAllDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/doctors/get-all`);
        if (res.data.success) {
          dispatch(setDoctors(res.data.doctors));  
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };

    fetchDoctors();
  }, [dispatch]);  
};

export default useFetchAllDoctors;
