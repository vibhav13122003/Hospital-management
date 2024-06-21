import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (e) {
        console.log("error");
        toast.error(e.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  // if (!isAuthenticated) {
  //   return <Navigate to='/login' />;
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {doctors && doctors.length > 0 ? (
        doctors.map((element) => {
          return (
            <div key={element.id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={element.docAvatar && element.docAvatar.url}
                alt="doctor avatar"
                className="w-full h-52 object-cover border rounded-lg"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2 text-center">{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details text-gray-700">
                  <p className="mb-1">
                    Email: <span className="font-medium">{element.email}</span>
                  </p>
                  <p className="mb-1">
                    Phone: <span className="font-medium">{element.phone}</span>
                  </p>
                  <p className="mb-1">
                    DOB: <span className="font-medium">{element.dob.substring(0, 10)}</span>
                  </p>
                  <p className="mb-1">
                    Department: <span className="font-medium">{element.doctorDepartment}</span>
                  </p>
                  <p className="mb-1">
                    Adhar: <span className="font-medium">{element.adhar}</span>
                  </p>
                  <p className="mb-1">
                    Gender: <span className="font-medium">{element.gender}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-2xl font-semibold text-center col-span-full">No Registered Doctors Found!</h1>
      )}
    </div>
  );
};

export default Doctors;
