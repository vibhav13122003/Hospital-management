import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          adhar,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdhar("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-center h-screen bg-gray-200 overflow-hidden'>
        <div className='w-full p-8 bg-white rounded-lg shadow-md ring-2 ring-gray-800/50 lg:max-w-2xl'>
          <form onSubmit={handleAppointment} className='grid grid-cols-1 gap-6'>
            <h1 className='text-3xl font-semibold text-center text-gray-900 mb-6 col-span-full'>
              Register
            </h1>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <input
                  type='text'
                  placeholder='First Name'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Last Name
                </label>
                <input
                  type='text'
                  placeholder='Last Name'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='Email'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <input
                  type='tel'
                  placeholder='Phone'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Date of Birth
                </label>
                <input
                  type='date'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Adhar card
                </label>
                <input
                  type='text'
                  placeholder='Adhar Card Number'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Department
                </label>
                <select
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departmentsArray.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Gender
                </label>
                <select
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value='' disabled>
                    Select Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Appointment Date
                </label>
                <input
                  type='date'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Address
                </label>
                <input
                  type='text'
                  placeholder='Address'
                  className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <select
                className='select select-primary w-full max-w-x'
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
              >
                <option value=''>Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div className='grid grid-cols-1'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Have you visited before?
                </label>
                <input
                  type='checkbox'
                  className='mr-2 leading-tight'
                  checked={hasVisited}
                  onChange={(e) => setHasVisited(e.target.checked)}
                />
                <span className='text-sm text-gray-700'>Yes</span>
              </div>
            </div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300'
            >
              Register
            </button>
          </form>
          <ToastContainer position='top-center' />
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
