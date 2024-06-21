import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";

const Sidebar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/admin/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHomePage = () => {
    navigateTo("/");
    setShowLinks(false);
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShowLinks(false);
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShowLinks(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShowLinks(false);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShowLinks(false);
  };

  return (
    <>
    {isAuthenticated &&
      <div className='fixed top-0 left-0 h-full bg-gray-800 text-gray-300  shadow-md'>
        <div className='flex flex-col h-full p-3'>
          <div className='space-y-10'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl transition-opacity duration-300'>
                {showLinks ? "Dashboard" : ""}
              </h2>
              <button className='p-2' onClick={() => setShowLinks(!showLinks)}>
                <GiHamburgerMenu className='w-6 h-6 fill-current text-gray-300' />
              </button>
            </div>

            <div className={`flex-1 mb-4 ${showLinks ? "block" : "hidden"}`}>
              <ul className='pt-2 pb-4 space-y-1 text-sm'>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={gotoHomePage}
                  >
                    <TiHome />
                    <span className='transition-opacity duration-300'>
                      Home
                    </span>
                  </button>
                </li>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={gotoAddNewDoctor}
                  >
                    <IoPersonAddSharp />
                    <span className='transition-opacity duration-300'>
                      Add new doctor
                    </span>
                  </button>
                </li>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={gotoAddNewAdmin}
                  >
                    <MdAddModerator />
                    <span className='transition-opacity duration-300'>
                      Add admin
                    </span>
                  </button>
                </li>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={gotoMessagesPage}
                  >
                    <AiFillMessage />
                    <span className='transition-opacity duration-300'>
                      Message
                    </span>
                  </button>
                </li>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={gotoDoctorsPage}
                  >
                    <FaUserDoctor />
                    <span className='transition-opacity duration-300'>
                      Doctor page
                    </span>
                  </button>
                </li>
                <li className='rounded-sm text-2xl'>
                  <button
                    className='flex items-center p-2 space-x-3 rounded-md w-full'
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxFill />
                    <span className='transition-opacity duration-300'>
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default Sidebar;
