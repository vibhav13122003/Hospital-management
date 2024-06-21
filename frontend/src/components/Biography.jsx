
const Biography = ({ imageUrl }) => {
  return (
    <div className='biography-container flex flex-col md:flex-row mx-4 p-4 h-full '>
      <div className='image-container w-full md:w-1/2 h-full flex justify-center items-center'>
        <img src={imageUrl} alt='about' className='w-full h-1/2 max-w-md' />
      </div>
      <div className='text-container w-full md:w-1/2 h-full flex flex-col justify-center p-4'>
        <p className='text-3xl font-bold'>Biography</p>
        <h3 className='text-4xl font-semibold mt-2 mb-4'>Who we are</h3>
        <p className='mb-4 text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quaerat
          officia provident dolore nobis quasi molestias. Ab accusantium dicta
          harum repudiandae cumque vitae animi eveniet velit. Expedita quaerat
          reprehenderit eligendi.
        </p>
        <p className='mb-4 text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
          repudiandae.
        </p>
        <p className='mb-4 text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odit
          incidunt enim!
        </p>
        <p className='mb-4 text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In unde nam
          deserunt, excepturi consectetur laboriosam. Laudantium veniam eos
          deleniti eaque veritatis quasi culpa reprehenderit quas necessitatibus
          quo, saepe quia.
        </p>
      </div>
    </div>
  );
};

export default Biography;
