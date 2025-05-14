import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiSearch, FiUpload, FiX } from "react-icons/fi";

const EditAdmin = () => {
  const [file, setFile] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    console.log("Search:", search);
    console.log("Admin ID:", id);
  }, [search, id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const updateAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Admin");

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

    if (file) {
      formData.append("type", "profile");
      formData.append("profile", file);
    }

    axios
      .put(`${baseApiURL()}/admin/details/updateDetails/${id}`, formData, {
        headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          clearSearchHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error?.response?.data?.message || "Update failed");
      });
  };

  const searchAdminHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Admin");

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        `${baseApiURL()}/admin/details/getDetails`,
        { employeeId: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();

        if (response.data.success && response.data.user.length > 0) {
          const user = response.data.user[0];
          setSearchActive(true);
          setId(user._id);
          setData({
            employeeId: user.employeeId,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            profile: user.profile,
          });
          toast.success(response.data.message);
        } else {
          toast.error("No Admin Found With ID");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  const clearSearchHandler = () => {
    setSearchActive(false);
    setSearch("");
    setId("");
    setPreviewImage("");
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
  };

  return (
    <div className="my-6 mx-auto w-full">
      {/* Search Form */}
      <form
        onSubmit={searchAdminHandler}
        className="flex justify-center items-center border-2 border-slate-500 rounded w-[40%] mx-auto"
      >
        <input
          type="text"
          className="px-6 py-3 w-full outline-none"
          placeholder="Employee Id."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {!searchActive ? (
          <button className="px-4 text-2xl hover:text-slate-500" type="submit">
            <FiSearch />
          </button>
        ) : (
          <button
            className="px-4 text-2xl hover:text-slate-500"
            type="button"
            onClick={clearSearchHandler}
          >
            <FiX />
          </button>
        )}
      </form>

      {/* Update Form */}
      {id && (
        <form
          onSubmit={updateAdminProfile}
          className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
        >
          {/* Input Fields */}
          {[
            { label: "First Name", id: "firstname", key: "firstName" },
            { label: "Middle Name", id: "middlename", key: "middleName" },
            { label: "Last Name", id: "lastname", key: "lastName" },
            {
              label: "Employee Id",
              id: "employeeId",
              key: "employeeId",
              type: "number",
            },
            {
              label: "Email Address",
              id: "email",
              key: "email",
              type: "email",
            },
            {
              label: "Phone Number",
              id: "phoneNumber",
              key: "phoneNumber",
              type: "number",
            },
          ].map((field) => (
            <div className="w-[40%]" key={field.id}>
              <label htmlFor={field.id} className="leading-7 text-sm">
                {`Enter ${field.label}`}
              </label>
              <input
                type={field.type || "text"}
                id={field.id}
                value={data[field.key]}
                onChange={(e) =>
                  setData({ ...data, [field.key]: e.target.value })
                }
                className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          ))}

          {/* Gender Select */}
          <div className="w-[40%]">
            <label htmlFor="gender" className="leading-7 text-sm">
              Select Gender
            </label>
            <select
              id="gender"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full mt-1"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="w-[40%]">
            <label htmlFor="file" className="leading-7 text-sm">
              Select Profile
            </label>
            <label
              htmlFor="file"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
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

          {/* Profile Preview */}
          <div className="w-full flex justify-center items-center">
            {previewImage ? (
              <img src={previewImage} alt="admin" className="h-36" />
            ) : data.profile ? (
              <img
                src={`${process.env.REACT_APP_MEDIA_LINK}/${data.profile}`}
                alt="admin"
                className="h-36"
              />
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
          >
            Update Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default EditAdmin;
