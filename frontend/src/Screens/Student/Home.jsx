import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section className="relative min-h-screen">
      {load && (
        <div className="relative z-10">
          <Navbar />
          <div className="max-w-6xl mx-auto">
            <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
              {["My Profile", "Timetable", "Marks", "Material", "Notice"].map(
                (item) => (
                  <li
                    key={item}
                    className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 transition-all ${
                      selectedMenu === item
                        ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                        : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                    }`}
                    onClick={() => setSelectedMenu(item)}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>

            {/* Conditional rendering of content */}
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
          </div>
        </div>
      )}

      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
