import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAppointments } from '../reduxStore/appointmentsSlice'
import { toast } from 'react-toastify'
import { baseUrl } from '../baseUrl.js'


const useFetchAllAppointments = () => {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchAllAppointments=async()=>{
        try {
            const res=await axios.get(`${baseUrl}/api/v1/appointments/get`,{withCredentials:true})
            if (res.data.success){
                dispatch(setAppointments(res.data.appointments))
                
            }
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }
    fetchAllAppointments()

  },[])
}

export default useFetchAllAppointments