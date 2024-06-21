import Biography from "../components/Biography";
import Department from "../components/Department";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";
import heroImage from "../images/hero.png";
import aboutImage from "../images/about.png";

import "../style/Home.css";



const Home = () => {
  return (
    <div className='bg-slate-200 '>
     
      <Hero
        title={"Welcome to our medical institute | Your trusted health care"}
        imageUrl={heroImage}
      />
      <Biography imageUrl={aboutImage} />
      <Department />
      <MessageForm />
    </div>
  );
};

export default Home;
