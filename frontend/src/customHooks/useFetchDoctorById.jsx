import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSingleDoctor } from '../reduxStore/doctorsSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../baseUrl.js';

const useFetchDoctorById = () => {
    const params = useParams();
    const doctorId = params.id; 
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/v1/doctors/get-doctor/${doctorId}`);
                if (res.data.success) {
                    dispatch(setSingleDoctor(res.data.doctor));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch doctor data");
            }
        };

        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId, dispatch]); 
};

export default useFetchDoctorById;
