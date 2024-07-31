import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    try {
      await axios("http://localhost:8000/api/v1/user/patient/logout", {
        withCredentials: true,
      }).then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  const handleLogIn = () => {
    navigate("/login");
  };
  return (
    <nav className='navbar bg-gray-800 text-white h-4 '>
      <div className=' mx-auto flex items-center justify-between  px-6'>
        
        <div
          className={`md:flex ${
            show ? "block" : "hidden"
          } flex justify-center items-center flex-1 gap`}
        >
          <div className='flex gap-4 text-xl'>
            <Link
              to={"/"}
              className='py-2 px-3 hover:bg-gray-700 rounded-md'
              onClick={() => setShow(!show)}
            >
              Home
            </Link>
            <Link
              to={"/appointment"}
              className='py-2 px-3 hover:bg-gray-700 rounded-md'
              onClick={() => setShow(!show)}
            >
              Appointment
            </Link>
            <Link
              to={"/about"}
              className='py-2 px-3 hover:bg-gray-700 rounded-md'
              onClick={() => setShow(!show)}
              >
              About Us
            </Link>
          </div>
        </div>
        <div className='m-2 mx-4'>
          {isAuthenticated ? (
            <button
              className='btn btn-neutral  py-2  bg-blue-500 hover:bg-blue-600 rounded-full'
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <button className='btn btn-neutralbtn btn-neutral  py-2  bg-blue-500 hover:bg-blue-600 rounded-full'
            onClick={handleLogIn}>
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
