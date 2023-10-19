import dumbbells from "assets/dumbbells.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navigateToGenerateWorkout = () => {
    navigate("/generate-workout");
  };
  return (
    <nav className="bg-white dark:bg-gray-800 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="home" className="flex items-center">
          <img src={dumbbells} className="h-12 mr-0" alt="Be Fit logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-[#CB2042]">
            BeFit
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={navigateToGenerateWorkout}
            type="button"
            className={`${
              pathname.includes("generate-workout") ? "hidden" : ""
            } text-white bg-[#c12342] capitalize hover:bg-[#d52145] focus:ring-4 focus:ring-[#6b3743] focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0`}>
            Generate workout plan
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
            <li>
              <NavLink
                to="home"
                className={({ isActive, isPending }) =>
                  `${
                    isActive ? "text-[#ff2a55]" : "text-white"
                  } block py-2 pl-3 pr-4 md:p-0`
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="history"
                className={({ isActive, isPending }) =>
                  `${
                    isActive ? "text-[#ff2a55]" : "text-white"
                  } block py-2 pl-3 pr-4 md:p-0`
                }>
                History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
