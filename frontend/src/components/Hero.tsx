import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <div >
      {/* object-cover: keep its aspect ratio */}
      <img className="w-full max-h-[600px] object-cover" src={hero} alt="hero image" />
    </div>
  );
};

export default Hero;