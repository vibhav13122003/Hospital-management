import { catchAsyncErrors } from '../middleware/catchErrors.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import { User } from '../models/userSchema.js';
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, gender, phone, adhar, dob, password, role } = req.body;
    if (!firstName || !lastName || !email || !gender || !phone || !adhar || !dob || !password || !role) {
        return next(new ErrorHandler("Please fill in all required fields", 400));
    }

    let user = await User.findOne({ adhar });
    if (user) {
        return next(new ErrorHandler("User already registered", 400));
    }

    user = await User.create({ firstName, lastName, email, gender, phone, adhar, dob, password, role: "Patient" });

    generateToken(user, "User created", 200, res)

});
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
        return next(
            new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
        );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    generateToken(user, "Login Successfully!", 201, res);
});

export const newAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, gender, phone, adhar, dob, password, role } = req.body;
    if (!firstName || !lastName || !email || !gender || !phone || !adhar || !dob || !password || !role) {
        return next(new ErrorHandler("Please fill in all required fields", 400));
    }
    let user = await User.findOne({ adhar });
    if (user) {
        return next(new ErrorHandler("Admin already registered", 400));
    }
    const admin = await User.create({ firstName, lastName, email, gender, phone, adhar, dob, password, role: "Admin" })
    res.status(200).json({
        success: true,
        message: "New Admin registered"
    })
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user,
    })
}
)

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Admin logged out"
    })
})
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Patient logged out"
    })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Check if file is present
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar required", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    // Check file type
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported, use png, jpeg or webp", 400));
    }

    const { firstName, lastName, email, gender, phone, adhar, dob, password, doctorDepartment } = req.body;

    // Check for required fields
    if (!firstName || !lastName || !email || !gender || !phone || !adhar || !dob || !password || !doctorDepartment) {
        return next(new ErrorHandler("Please fill in all required fields", 400));
    }

    // Check if user already exists
    let user = await User.findOne({ adhar });
    if (user) {
        return next(new ErrorHandler(`${user.role} already registered with this adhar`, 400));
    }

    // Upload avatar to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse) {
        return next(new ErrorHandler("Doctor avatar not uploaded", 400));
    }


    const doctor = await User.create({
        firstName,
        lastName,
        email,
        gender,
        phone,
        adhar,
        dob,
        password,
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
            url: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id,
        },
    });

    res.status(200).json({
        success: true,
        message: "Doctor added successfully",
    });
});