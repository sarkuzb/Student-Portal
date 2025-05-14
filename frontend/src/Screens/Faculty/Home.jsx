import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";
const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  return (
    <section>
      {load && (
        <>
          <Navbar />
          <div className="max-w-6xl mx-auto">
            <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "My Profile"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("My Profile")}
              >
                My Profile
              </li>
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Student Info"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("Student Info")}
              >
                Student Info
              </li>
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Upload Marks"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("Upload Marks")}
              >
                Upload Marks
              </li>
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Timetable"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("Timetable")}
              >
                Timetable
              </li>
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Notice"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("Notice")}
              >
                Notice
              </li>
              <li
                className={`text-center rounded-md px-5 py-2 w-1/5 cursor-pointer ease-in-out duration-300 hover:ease-in-out hover:duration-300 hover:transition-all transition-all ${
                  selectedMenu === "Material"
                    ? "border-b-4 pb-2 border-brown-500 bg-beige-200 text-brown-800 shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-beige-100 hover:text-brown-700 hover:shadow-md border-b-2 border-transparent"
                }`}
                onClick={() => setSelectedMenu("Material")}
              >
                Material
              </li>
            </ul>
            {selectedMenu === "Timetable" && <Timetable />}
            {selectedMenu === "Upload Marks" && <Marks />}
            {selectedMenu === "Material" && <Material />}
            {selectedMenu === "Notice" && <Notice />}
            {selectedMenu === "My Profile" && <Profile />}
            {selectedMenu === "Student Info" && <Student />}
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
