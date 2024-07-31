import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 overflow-hidden'>
      <div className='w-full p-8 bg-white rounded-lg shadow-md ring-2 ring-gray-800/50 lg:max-w-xl mt-[-20vh]'>
        <h1 className='text-3xl font-semibold text-center text-gray-900 mb-6'>
          Log In
        </h1>
        <p className="font-bold text-center">Only admins are allowed</p>
        <form onSubmit={handleLogIn} className='space-y-6'>
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
              Confirm Password
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-300'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300'
          >
            Log In
          </button>
          
        </form>
        <ToastContainer position='top-center' />
      </div>
    </div>
  );
};

export default Login;
