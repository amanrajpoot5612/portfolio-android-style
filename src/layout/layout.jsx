import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen h-screen flex flex-col justify-center items-center bg-green-600">
      {/* <Navbar /> */}
      <main className="max-w-[375px] w-9/10 screen-container max-h-screen h-9/10 bg-white rounded-4xl">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
