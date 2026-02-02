
import express, { urlencoded } from "express";
import connectToDatabase from "./database/index.js";
const app=express();
connectToDatabase()
import userRoutes from "./routes/user.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser";


const _dirname=path.resolve()

// middlewares 
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors({
    // origin:"https://healthcare-version-1.onrender.com",
    origin:"http://localhost:5173",
    credentials:true
}))
// routers
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/doctors",doctorRoutes)
app.use("/api/v1/appointments",appointmentRoutes)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(_,res)=>{
    res.sendFile(path.join(_dirname, "frontend","dist","index.html"))

})





export default app