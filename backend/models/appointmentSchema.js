import mongoose, { mongo } from "mongoose";
import validator from "validator";


const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 letters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 letters"]
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Enter a valid email"
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Phone number must contain exactly 10 digits"
        }
    },
    adhar: {
        type: String,
        required: true,
        minLength: [12, "Adhar must contain at least 12 characters"],
        maxLength: [12, "Adhar must contain at least 12 characters"]
    },
    dob: {
        type: Date,
        require: [true, "DOB is Required"]
    },
    gender: {
        type: String,
        required: [true],
        enum: ["male", "female"],
    },
  appointment_date:{
    type:String,
    required:true,
  },
  department:{
      type: String,
      required: true,
  },
  doctor:{
    firstName:{
          type: String,
          required: true,
    },
    lastName:{
        type: String,
        required: true,
    }
  },
  hasVisited:{
    type:Boolean,
    required:true,
    default:false
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  patientId:{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
  },
  address:{
      type: String,
      required: true,
  },
  status:{
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"
  }
    
})

export const Appointment=mongoose.model("Appointment",appointmentSchema)