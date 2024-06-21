const Hero = ({ title, imageUrl }) => {
  return (
    <div className='hero-container flex flex-col md:flex-row mx-4 p-4 h-full relative'>
      <div className='w-full md:w-1/2 h-full'>
        <h1 className='font-bold text-5xl mt-48'>{title}</h1>
        <p className='mt-4 p-2 font-normal text-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          laboriosam, reiciendis quo possimus officiis fugiat minima maiores
          earum perspiciatis magnam dicta veritatis pariatur voluptatem
          architecto optio hic ducimus harum. Magni!
        </p>
      </div>
      <div className='banner w-full md:w-1/2 h-full flex justify-center items-center'>
        <img
          src={imageUrl}
          alt='hero'
          className='animated-image w-1/2 max-w-xs relative z-10'
        />
        <span className='absolute top-[12%] left-[55%] '>
          <img src='/src/images/Vector.png' alt='vector' className='object-cover' />
        </span>
      </div>
    </div>
  );
};

export default Hero;
