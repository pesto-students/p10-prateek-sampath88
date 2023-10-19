import Navbar from "components/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div  className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1 no-scrollbar max-w-7xl w-full mx-auto antialiased overflow-hidden h-full scroll-smooth">
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
