import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import AddDoctors from "./components/AddDoctors";
import AddNewAdmin from "./components/AddNewAdmin";
import Message from "./components/Message";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setAdmin]);

  const isAuthenticate=true
  return (
    <Router>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 ml-64 p-4'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/messages' element={<Message />} />
            <Route path='/doctor/addnew' element={<AddDoctors/>} />
            <Route path='/admin/addnew' element={<AddNewAdmin />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;




//  <Router>
//    {isAuthenticate && (
//      <div className='flex h-screen'>
//        <Sidebar />
//        <div className='flex-grow'>
//          <Routes>
//            <Route
//              path='/'
//              element={isAuthenticated ? <Dashboard /> : <Login />}
//            />
//            <Route path='/login' element={<Login />} />
//            <Route
//              path='/doctor/addnew'
//              element={
//                isAuthenticated ? <AddDoctors /> : <Navigate to='/login' />
//              }
//            />
//            <Route
//              path='/admin/addnew'
//              element={
//                isAuthenticated ? <AddNewAdmin /> : <Navigate to='/login' />
//              }
//            />
//            <Route
//              path='/messages'
//              element={isAuthenticated ? <Message /> : <Navigate to='/login' />}
//            />
//            <Route
//              path='/doctors'
//              element={isAuthenticated ? <Doctors /> : <Navigate to='/login' />}
//            />
//          </Routes>
//        </div>
//      </div>
//    )}
//    {/* {!isAuthenticated && (
//         <Routes>
//           <Route path='/' element={<Login />} />
//           <Route path='/login' element={<Login />} />
//         </Routes>
//       )} */}
//    <ToastContainer position='top-center' />
//  </Router>;