import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
const Student = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState();

  const searchStudentHandler = (e) => {
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      semester: "",
      branch: "",
      gender: "",
      profile: "",
    });
    e.preventDefault();
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.dismiss();
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              semester: response.data.user[0].semester,
              branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
          }
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
      </div>
      <div className="my-6 mx-auto w-full">
        <form
          onSubmit={searchStudentHandler}
          className="flex justify-center w-full sm:w-[40%] bg-slate-50 border border-slate-200 text-slate-700 font-light sm:text-base rounded-md shadow-sm focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-slate-400 transition duration-200 overflow-hidden"
        >
          <input
            type="text"
            placeholder="Enrollment No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-slate-700 font-light py-3 px-4 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 text-white py-3 px-4 text-2xl h-full"
          >
            <FiSearch />
          </button>
        </form>

        {id && (
          <div className="mx-auto w-full bg-slate-100 hover:bg-slate-200 mt-10 flex justify-between items-center p-10 rounded-md shadow-md transition-all duration-200">
            <div>
              <p className="text-2xl font-semibold">
                {data.firstName} {data.middleName} {data.lastName}
              </p>
              <div className="mt-3">
                <p className="text-lg font-normal mb-2">
                  Enrollment No: {data.enrollmentNo}
                </p>
                <p className="text-lg font-normal mb-2">
                  Phone Number: +91 {data.phoneNumber}
                </p>
                <p className="text-lg font-normal mb-2">
                  Email Address: {data.email}
                </p>
                <p className="text-lg font-normal mb-2">
                  Branch: {data.branch}
                </p>
                <p className="text-lg font-normal mb-2">
                  Semester: {data.semester}
                </p>
              </div>
            </div>
            <img
              src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
              alt="student profile"
              className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
