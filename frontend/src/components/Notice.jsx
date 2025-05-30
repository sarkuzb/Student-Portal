import React, { useEffect } from "react";
import { useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
const Notice = () => {
  const router = useLocation();
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
  });

  const getNoticeHandler = () => {
    let data = {};
    if (router.pathname.replace("/", "") === "student") {
      data = {
        type: ["student", "both"],
      };
    } else {
      data = {
        type: ["student", "both", "faculty"],
      };
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/notice/getNotice`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setNotice(response.data.notice);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    let data = {};
    if (router.pathname.replace("/", "") === "student") {
      data = {
        type: ["student", "both"],
      };
    } else {
      data = {
        type: ["student", "both", "faculty"],
      };
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/notice/getNotice`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setNotice(response.data.notice);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [router.pathname]);

  const addNoticehandler = (e) => {
    e.preventDefault();
    toast.loading("Adding Notice");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/notice/addNotice`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getNoticeHandler();
          setOpen(!open);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteNoticehandler = (id) => {
    toast.loading("Deleting Notice");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/notice/deleteNotice/${id}`, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getNoticeHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const updateNoticehandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(`${baseApiURL()}/notice/updateNotice/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getNoticeHandler();
          setOpen(!open);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const setOpenEditSectionHandler = (index) => {
    setEdit(true);
    setOpen(!open);
    setData({
      title: notice[index].title,
      description: notice[index].description,
      type: notice[index].type,
      link: notice[index].link,
    });
    setId(notice[index]._id);
  };

  const openHandler = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", type: "student", link: "" });
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Notices" />
        {(router.pathname === "/faculty" || router.pathname === "/admin") &&
          (open ? (
            <button
              className="absolute right-2 flex justify-center items-center border-2 border-gray-200 px-3 py-2 rounded text-gray-600"
              onClick={openHandler}
            >
              <span className="mr-2">
                <BiArrowBack className="text-gray-600" />
              </span>
              Close
            </button>
          ) : (
            <button
              className="absolute right-2 flex justify-center items-center border-2 border-gray-200 px-3 py-2 rounded text-gray-600"
              onClick={openHandler}
            >
              Add Notice
              <span className="ml-2">
                <IoAddOutline className="text-gray-600 text-xl" />
              </span>
            </button>
          ))}
      </div>
      {!open && (
        <div className="mt-8 w-full">
          {notice &&
            notice.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className="border-slate-500 border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4 relative"
                >
                  {(router.pathname === "/faculty" ||
                    router.pathname === "/admin") && (
                    <div className="absolute flex justify-center items-center right-4 bottom-3">
                      <span className="text-sm bg-slate-500 px-4 py-1 text-white rounded-full">
                        {item.type}
                      </span>
                      <span
                        className="text-2xl group-hover:text-slate-500 ml-2 cursor-pointer hover:text-red-500"
                        onClick={() => deleteNoticehandler(item._id)}
                      >
                        <MdDeleteOutline />
                      </span>
                      <span
                        className="text-2xl group-hover:text-slate-500 ml-2 cursor-pointer hover:text-slate-500"
                        onClick={() => setOpenEditSectionHandler(index)}
                      >
                        <MdEditNote />
                      </span>
                    </div>
                  )}
                  <p
                    className={`text-xl font-medium flex justify-start items-center ${
                      item.link && "cursor-pointer"
                    } group`}
                    onClick={() => item.link && window.open(item.link)}
                  >
                    {item.title}
                    {item.link && (
                      <span className="text-2xl group-hover:text-slate-500 ml-1">
                        <IoMdLink />
                      </span>
                    )}
                  </p>
                  <p className="text-base font-normal mt-1">
                    {item.description}
                  </p>
                  <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                    <span className="text-base mr-1">
                      <HiOutlineCalendar />
                    </span>
                    {item.createdAt.split("T")[0].split("-")[2] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[1] +
                      "/" +
                      item.createdAt.split("T")[0].split("-")[0] +
                      " " +
                      item.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>
              );
            })}
        </div>
      )}
      {open && (
        <form className="mt-8 w-full">
          <div className="w-[40%] mt-2">
            <label htmlFor="title">Notice Title</label>
            <input
              type="text"
              id="title"
              className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="title">Notice Description</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Write a short description..."
              className="w-full bg-slate-100 text-slate-700 text-sm sm:text-base border border-white focus:border-slate-500 focus:ring-2 focus:ring-slate-300 rounded-lg shadow-sm p-3 resize-none outline-none transition duration-300"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="link">Notice Link (If any else leave blank)</label>
            <input
              type="text"
              id="link"
              value={data.link}
              className="bg-slate-100 text-sm text-slate-600 font-semibold h-12 outline-none border-2 border-white py-2 px-4 rounded-md w-full focus:border-2 focus:border-slate-400 transition-all duration-200"
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="type">Type Of Notice</label>
            <select
              id="type"
              className="w-4/5 mt-4 bg-slate-50 border border-slate-200 text-slate-700 text-sm sm:text-base py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition duration-200"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="both">Both</option>
            </select>
          </div>
          {edit && (
            <button
              onClick={updateNoticehandler}
              className="bg-slate-500 mt-5 text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-md hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
            >
              Update Notice
            </button>
          )}
          {!edit && (
            <button
              onClick={addNoticehandler}
              className="bg-slate-500 mt-5 text-slate-200 hover:text-sla text-sm px-14 py-4 rounded-md hover:bg-slate-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
            >
              Add Notice
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Notice;
