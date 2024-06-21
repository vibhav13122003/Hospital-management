import { catchAsyncErrors } from '../middleware/catchErrors.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js';

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    console.log("Admin Token:", token); // Log token for debugging
    if (!token) {
        console.log("No admin token found in cookies");
        return next(new ErrorHandler("Admin not authenticated", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded admin token:", decodedData); // Log decoded data
        req.user = await User.findById(decodedData.id);

        if (!req.user || req.user.role !== "Admin") {
            console.log("User not found or role is not Admin");
            return next(new ErrorHandler("Admin not authorized", 403));
        }

        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return next(new ErrorHandler("Invalid token, please login again", 401));
    }
});

export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    console.log("Patient Token:", token); // Log token for debugging
    if (!token) {
        console.log("No patient token found in cookies");
        return next(new ErrorHandler("Patient not authenticated", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded patient token:", decodedData); // Log decoded data
        req.user = await User.findById(decodedData.id);

        if (!req.user || req.user.role !== "Patient") {
            console.log("User not found or role is not Patient");
            return next(new ErrorHandler("Patient not authorized", 403));
        }

        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return next(new ErrorHandler("Invalid token, please login again", 401));
    }
});
