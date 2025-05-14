import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddStudent = () => {
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [previewImage, setPreviewImage] = useState("");
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
  });
  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBranchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("enrollmentNo", data.enrollmentNo);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("semester", data.semester);
    formData.append("branch", data.branch);
    formData.append("gender", data.gender);
    formData.append("type", "profile");
    formData.append("profile", file);
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(`${baseApiURL()}/student/auth/register`, {
              loginid: data.enrollmentNo,
              password: data.enrollmentNo,
            })
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
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
                setPreviewImage();
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <form
      onSubmit={addStudentProfile}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="firstname" className="leading-7 text-sm ">
          Enter First Name
        </label>
        <input
          type="text"
          id="firstname"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="middlename" className="leading-7 text-sm ">
          Enter Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          value={data.middleName}
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className="w-full bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="lastname" className="leading-7 text-sm ">
          Enter Last Name
        </label>
        <input
          type="text"
          id="lastname"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
          Enter Enrollment No
        </label>
        <input
          type="number"
          id="enrollmentNo"
          value={data.enrollmentNo}
          onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="email" className="leading-7 text-sm ">
          Enter Email Address
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="phoneNumber" className="leading-7 text-sm ">
          Enter Phone Number
        </label>
        <input
          type="number"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>
      <div className="w-[40%]">
        <label htmlFor="semester" className="leading-7 text-sm ">
          Select Semester
        </label>
        <select
          id="semester"
          className="w-full mt-4 font-light bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
          value={data.semester}
          onChange={(e) => setData({ ...data, semester: e.target.value })}
        >
          <option defaultValue>Select</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          <option value="3">3rd Semester</option>
          <option value="4">4th Semester</option>
          <option value="5">5th Semester</option>
          <option value="6">6th Semester</option>
          <option value="7">7th Semester</option>
          <option value="8">8th Semester</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="branch" className="leading-7 text-sm ">
          Select Branch
        </label>
        <select
          id="branch"
          className="w-full mt-4 font-light bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
          value={data.branch}
          onChange={(e) => setData({ ...data, branch: e.target.value })}
        >
          <option defaultValue>Select</option>
          {branch?.map((branch) => {
            return (
              <option value={branch.name} key={branch.name}>
                {branch.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="gender" className="leading-7 text-sm ">
          Select Gender
        </label>
        <select
          id="gender"
          className="w-full mt-4 font-light bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option defaultValue>Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="file" className="leading-7 text-sm ">
          Select Profile
        </label>
        <label
          htmlFor="file"
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-slate-700 border border-gray-300 rounded-md font-medium text-sm sm:text-base cursor-pointer hover:bg-slate-300 hover:text-slate-800 transition duration-200"
        >
          <FiUpload className="text-lg" />
          Upload File
        </label>
        <input
          hidden
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {previewImage && (
        <div className="w-full flex justify-center items-center">
          <img src={previewImage} alt="student" className="h-36" />
        </div>
      )}
      <button
        type="submit"
        className="bg-slate-500 mt-5 text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-md hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
      >
        Add New Student
      </button>
    </form>
  );
};

export default AddStudent;
