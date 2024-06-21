import express from "express";
import { bookAppointment, deleteAppointment, getAllAppointments, updateAppointments } from "../controller/appointmentController.js";
import { isPatientAuthenticated, isAdminAuthenticated } from "../middleware/auth.js";


const router = express.Router();
router.post("/post", isPatientAuthenticated, bookAppointment)
router.get("/getall", isAdminAuthenticated, getAllAppointments)
router.put("/update/:id", isAdminAuthenticated, updateAppointments)
router.delete("/delete/:id", isPatientAuthenticated, deleteAppointment)

export default router