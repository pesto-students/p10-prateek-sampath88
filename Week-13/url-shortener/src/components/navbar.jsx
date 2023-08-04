import LinkIcon from "components/icons/short-link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="bg-gray-800 border-b-[1px] border-solid border-gray-600 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold underline underline-offset-4 flex items-center gap-[6px] cursor-pointer">
                <span>Short</span>
                <span className="w-6 h-6 flex justify-center items-center">
                  <LinkIcon />
                </span>
                <span>URL</span>
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent  md:p-0 text-white md:text-blue-400"
                aria-current="page">
                Home
              </a>
              <a
                href="#"
                className="block py-2 pl-3 pr-4  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">
                Pricing
              </a>
              <a
                href="#"
                className="block py-2 pl-3 pr-4  rounded   md:border-0  md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">
                Docs
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="  border  focus:outline-none  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
                Login
              </button>
              <button
                type="button"
                className=" focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-gray-900 bg-white hover:bg-gray-700 focus:ring-gray-700 border-gray-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
