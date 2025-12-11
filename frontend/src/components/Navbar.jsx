import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { CiCircleQuestion, CiSettings } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const[text, setText] = useState("");
  const user = useSelector(store => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async (req, res) => {
    try{
      const res = await axios.get('http://localhost:8080/api/v1/user/logout')
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      navigate('/login');
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    dispatch(setSearchText(text));
  },[text])

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-18">
        <div className="flex items-center gap-2">
          <div className="hover:bg-gray-200 rounded-full p-3 cursor-pointer">
            <GiHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo.png"
            alt="logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      {user && (
        <>
          <div className="w-[50%] mr-60">
            <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
              <FaSearch size={"24px"} className="text-gray-700" />
              <input
                className="rounded-full w-full bg-transparent outline-none px-1"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search Mail"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <CiSettings size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>

            <span onClick={logouthandler} className='underline text-blue-600 font-bold cursor-pointer'>Logout</span>
            <Avatar
              src={user.profilePhoto}
              size="40"
              round={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
