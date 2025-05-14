import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
const Timetable = () => {
  const [addselected, setAddSelected] = useState({
    branch: "",
    semester: "",
  });
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    getBranchData();
  }, []);

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
        toast.error(error.message);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageUrl);
  };

  const addTimetableHandler = () => {
    toast.loading("Adding Timetable");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("branch", addselected.branch);
    formData.append("semester", addselected.semester);
    formData.append("type", "timetable");
    formData.append("timetable", file);
    axios
      .post(`${baseApiURL()}/timetable/addTimetable`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({
            branch: "",
            semester: "",
          });
          setFile("");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log("FIle error", error);

        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Timetable`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Add Timetable</p>
          <select
            id="branch"
            className="w-full mt-4 font-light bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
            value={addselected.branch}
            onChange={(e) =>
              setAddSelected({ ...addselected, branch: e.target.value })
            }
          >
            <option defaultValue>Select Branch</option>
            {branch &&
              branch.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
          </select>
          <select
            onChange={(e) =>
              setAddSelected({ ...addselected, semester: e.target.value })
            }
            value={addselected.semester}
            name="branch"
            id="branch"
            className="w-full mt-4 font-light bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
          >
            <option defaultValue>Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>
          {!addselected.link && (
            <label
              htmlFor="upload"
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-slate-700 border border-gray-300 rounded-md font-medium text-sm sm:text-base cursor-pointer hover:bg-slate-300 hover:text-slate-800 transition duration-200"
            >
              Select Timetable
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
          )}
          {previewUrl && (
            <p
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 border border-gray-300 rounded-md font-medium text-sm sm:text-base cursor-pointer hover:bg-red-100 hover:text-red-500 hover:border-red-300 transition duration-200"
              onClick={() => {
                setFile("");
                setPreviewUrl("");
              }}
            >
              Remove Selected Timetable
              <span className="ml-2">
                <AiOutlineClose />
              </span>
            </p>
          )}
          <input
            type="file"
            name="upload"
            id="upload"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <button
            className="bg-slate-500 mt-5 w-full text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-md hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
            onClick={addTimetableHandler}
          >
            Add Timetable
          </button>
          {previewUrl && (
            <img className="mt-6" src={previewUrl} alt="timetable" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
