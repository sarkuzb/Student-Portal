import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddAdmin = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const addAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Admin");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("employeeId", data.employeeId);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("gender", data.gender);
    formData.append("type", "profile");
    formData.append("profile", file);
    axios
      .post(`${baseApiURL()}/admin/details/addDetails`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          axios
            .post(`${baseApiURL()}/Admin/auth/register`, {
              loginid: data.employeeId,
              password: data.employeeId,
            })
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  employeeId: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  gender: "",
                  profile: "",
                });
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
      onSubmit={addAdminProfile}
      className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
    >
      <div className="w-[40%]">
        <label htmlFor="firstname" className="leading-7 text-sm text-brown-700">
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
        <label
          htmlFor="middlename"
          className="leading-7 text-sm text-brown-700"
        >
          Enter Middle Name
        </label>
        <input
          type="text"
          id="middlename"
          value={data.middleName}
          onChange={(e) => setData({ ...data, middleName: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>

      <div className="w-[40%]">
        <label htmlFor="lastname" className="leading-7 text-sm text-brown-700">
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
        <label
          htmlFor="employeeId"
          className="leading-7 text-sm text-brown-700"
        >
          Enter Employee Id
        </label>
        <input
          type="number"
          id="employeeId"
          value={data.employeeId}
          onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
        />
      </div>

      <div className="w-[40%]">
        <label htmlFor="email" className="leading-7 text-sm text-brown-700">
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
        <label
          htmlFor="phoneNumber"
          className="leading-7 text-sm text-brown-700"
        >
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
        <label htmlFor="gender" className="leading-7 text-sm text-brown-700">
          Select Gender
        </label>
        <select
          id="gender"
          className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-light sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option defaultValue>Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="w-[40%]">
        <label htmlFor="file" className="leading-7 text-sm text-brown-700">
          Select Profile
        </label>
        <label
          htmlFor="file"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-slate-700 border border-gray-300 rounded-md font-medium text-sm sm:text-base cursor-pointer hover:bg-slate-300 hover:text-slate-800 transition duration-200"
        >
          Upload
          <span className="ml-2">
            <FiUpload />
          </span>
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
          <img src={previewImage} alt="admin" className="h-36" />
        </div>
      )}
      <button
        type="submit"
        className="bg-slate-500 mt-5 text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-md hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
      >
        Add New Admin
      </button>
    </form>
  );
};

export default AddAdmin;
