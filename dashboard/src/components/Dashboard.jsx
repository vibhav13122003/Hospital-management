import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const { isAuthenticated, admin } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdate = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((item) =>
          item._id === appointmentId ? { ...item, status: data.status } : item
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <div className='container mx-auto p-4'>
        <h1 className='text-4xl font-bold mb-4 text-center'>Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-purple-600 text-white flex flex-col items-center justify-center rounded-md p-4 h-48'>
            <div className='flex items-center'>
              <p className='text-lg'>Hello</p>
              <h2 className='text-red-600 text-lg ml-2'>
                {admin && `Welcome ${admin.firstName} ${admin.lastName}`}
              </h2>
            </div>
            <p className='text-center mt-2'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
              nam molestias. Eaque molestiae ipsam commodi neque. Assumenda
              repellendus necessitatibus itaque.
            </p>
          </div>
          <div className='bg-pink-600 shadow-lg rounded-md p-4 flex flex-col items-center justify-center'>
            <p className='text-lg font-semibold'>Total Appointments</p>
            <h3 className='text-2xl font-bold'>1500</h3>
          </div>
          <div className='bg-blue-700 shadow-md rounded-md p-4 flex flex-col items-center justify-center'>
            <p className='text-lg font-semibold'>Registered Doctors</p>
            <h3 className='text-2xl font-bold'>10</h3>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold mb-4'>Appointments</h1>
          <table className='table-auto w-full bg-white shadow-md rounded-md'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-4 py-2 text-left'>Appointment Id</th>
                <th className='px-4 py-2 text-left'>Patient Name</th>
                <th className='px-4 py-2 text-left'>Appointment Date</th>
                <th className='px-4 py-2 text-left'>Doctor</th>
                <th className='px-4 py-2 text-left'>Department</th>
                <th className='px-4 py-2 text-left'>Status</th>
                <th className='px-4 py-2 text-left'>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments &&
                appointments.map((appointment) => (
                  <tr key={appointment._id} className='border-t'>
                    <td className='px-4 py-2'>{appointment._id}</td>
                    <td className='px-4 py-2'>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className='px-4 py-2'>
                      {appointment.appointment_date.substring(0, 16)}
                    </td>
                    <td className='px-4 py-2'>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td className='px-4 py-2'>{appointment.department}</td>
                    <td className='px-4 py-2'>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdate(appointment._id, e.target.value)
                        }
                      >
                        <option value='Pending' className='value-pending'>
                          Pending
                        </option>
                        <option value='Accepted' className='value-accepted'>
                          Accepted
                        </option>
                        <option value='Rejected' className='value-rejected'>
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className='px-4 py-2 '>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className='text-green-500' />
                      ) : (
                        <AiFillCloseCircle className='text-red-500' />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
