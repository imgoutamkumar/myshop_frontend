import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ShopLayout = () => {
  return (
    <div className="min-h-screen w-full">
       <Navbar/>
      <Outlet />
    </div>
  )
}

export default ShopLayout
