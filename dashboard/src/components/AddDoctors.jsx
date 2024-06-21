import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDoctors = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const navigate = useNavigate();
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

  const handleDocAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDocAvatar(file);
      setDocAvatarPreview(reader.result);
    };
  };

  const handleDocRegister = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !dob ||
      !gender
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("adhar", adhar);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/admin/addAdmin",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdhar("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <section className='container'>
      <div className='flex items-center justify-center h-screen bg-gray-200 overflow-hidden'>
        <div className='w-full p-8 bg-white rounded-lg shadow-md ring-2 ring-gray-800/50 lg:max-w-4xl'>
          <form
            onSubmit={handleDocRegister}
            className='grid grid-cols-1 lg:grid-cols-2 gap-6'
          >
            <div className='flex flex-col items-center'>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt='Doctor Avatar'
                className='w-48 h-48 rounded-full mb-4'
              />
              <div className='relative'>
                <input
                  type='file'
                  id='docAvatar'
                  onChange={handleDocAvatarChange}
                  className='hidden'
                />
                <label
                  htmlFor='docAvatar'
                  className='cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                >
                  Choose Avatar
                </label>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-6'>
              <h1 className='text-3xl font-semibold text-center text-gray-900 mb-6'>
                Register Doctor
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
                    Password
                  </label>
                  <input
                    type='password'
                    placeholder='Password'
                    className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>
                    Adhar card
                  </label>
                  <input
                    type='text'
                    placeholder='Adhar card'
                    className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
                    value={adhar}
                    onChange={(e) => setAdhar(e.target.value)}
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
              <button
                type='submit'
                className='w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300'
              >
                Register
              </button>
              <p className='text-sm text-center text-gray-500 col-span-full'>
                Already have an account?{" "}
                <a
                  href='#'
                  className='text-indigo-600 hover:underline'
                  onClick={() => navigate("/login")}
                >
                  Log In
                </a>
              </p>
            </div>
          </form>
          <ToastContainer position='top-center' />
        </div>
      </div>
    </section>
  );
};

export default AddDoctors;
