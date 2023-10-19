import equipmentImg from "assets/equipment.svg";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const navigateToGenerateWorkout = () => {
    console.log("generate workout")
    navigate("/generate-workout");
  };
  return (
    <div className="landing-page">
      <div className="no-scrollbar max-w-7xl mx-auto bg-transparent antialiased overflow-auto h-full scroll-smooth">
        <div className="hero-section backdrop-blur-sm">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:pt-52 lg:flex-row lg:justify-between">
            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h1 className="text-5xl font-bold leadi sm:text-6xl  uppercase">
                Nothing will work
                <br />
                <span className="text-white">unless you do</span>
              </h1>
              <p className="mt-6 mb-8 text-lg sm:mb-12 text-gray-200">
                All progress takes place outside the comfort zone
              </p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <button
                  onClick={navigateToGenerateWorkout}
                  className="px-8 py-3 text-lg text-gray-300 font-semibold rounded dark:bg-[#CB2042] capitalize">
                  Generate workout plan
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center pt-12 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <div className="equipment lg:w-[480px] sm:w-[450px] p-8">
                <img src={equipmentImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
