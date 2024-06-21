import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "../departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "../departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "../departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "../departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "../departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "../departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "../departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "../departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "../departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className='p-2 m-4 '>
      <h2 className='text-center text-4xl font-bold mb-10 '>Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={[
          // "superLargeDesktop",
          // "desktop",
          "tablet",
          "mobile",
        ]}
        containerClass='carousel-container'
        itemClass='carousel-item'
      >
        {departmentsArray.map((depart, index) => (
          <div key={index} className='card-title relative overflow-hidden'>
            <div className='card relative h-[250px] w-[350px]'>
              <div className='overlay absolute inset-0 bg-black opacity-50 transition-opacity hover:opacity-0'></div>
              <img
                src={depart.imageUrl}
                alt='Department'
                className=' department-image object-cover w-full h-full '
              />
              <div className='absolute inset-0 bg-transparent  flex justify-center items-center text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100'>
                <div className='text-center'>
                  <p className='text-3xl font-semibold'>{depart.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Department;
