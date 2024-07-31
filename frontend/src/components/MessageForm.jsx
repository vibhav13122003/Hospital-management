import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

    const handleMessage = async (e) => {
      e.preventDefault();
      if (!firstName || !lastName || !email || !phone || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
      try {
        await axios
          .post(
            "http://localhost:8000/api/v1/message/send",
            { firstName, lastName, email, phone, message },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
          });
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      }
    };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-gray-700 p-8 m-4 md:mx-20 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2'>
        <h2 className='text-center text-4xl mb-10 font-bold text-white'>
          Send us a message
        </h2>
        <form onSubmit={handleMessage} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-white text-lg mb-2'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none'
              />
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-white mb-2 text-lg'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label htmlFor='email' className='block text-white mb-2 text-lg'>
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none'
              />
            </div>
            <div>
              <label htmlFor='phone' className='block text-white mb-2 text-lg'>
                Phone
              </label>
              <input
                type='tel'
                id='phone'
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none'
              />
            </div>
          </div>
          <div>
            <label htmlFor='message' className='block text-white mb-2 text-lg'>
              Message
            </label>
            <textarea
              id='message'
              rows={6}
              placeholder='Enter your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none'
            ></textarea>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-neutral btn-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 transition transform hover:scale-105'
            >
              Submit
            </button>
           
          </div>
          <ToastContainer position="top-center"/>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;
