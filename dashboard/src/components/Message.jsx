import axios from "axios"
import { Navigate } from "react-router-dom"
import { useContext, useState,useEffect } from "react"
import { Context } from "../main"
const Message = () => {
  const { isAuthenticated } = useContext(Context);
  const [messages,setMessages]=useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);
  
  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }

  return (
    <section className=' bg-gray-100 min-h-screen py-10'>
      <h1 className='text-4xl font-bold text-center mb-10'>MESSAGE</h1>
      <div className='banner container mx-auto'>
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div
                className='card bg-white shadow-lg rounded-lg p-6 mb-6'
                key={element._id}
              >
                <div className='details'>
                  <p className='mb-2'>
                    <span className='font-semibold'>First Name:</span>{" "}
                    {element.firstName}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Last Name:</span>{" "}
                    {element.lastName}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Email:</span>{" "}
                    {element.email}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Phone:</span>{" "}
                    {element.phone}
                  </p>
                  <p className='mb-2'>
                    <span className='font-semibold'>Message:</span>{" "}
                    {element.message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className='text-2xl font-semibold text-center text-gray-500'>
            No Messages!
          </h1>
        )}
      </div>
    </section>
  );
}

export default Message
