import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from 'react-redux';


import { IoIosSearch } from "react-icons/io";
import { useEffect } from 'react';
import { setAuthUser, setSearchText } from '../redux/appSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [text, setText] = useState("");
  const { user } = useSelector(store => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get('https://gmail-clone-m0qq.onrender.com/api/v1/user/logout', { withCredentials: true });
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
      navigate("/login");


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);

  return (
    <div className="flex justify-between items-center mx-3 h-16 ">
      <div className="flex items-center gap-10 ">
        <div className="flex items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <GiHamburgerMenu />
          </div>
          <img className="w-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png?_=20221017173631" alt="logo" />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>

      {
        user && (
          <>
            <div className="w-[50%] mr-50 " >
              <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
                <IoIosSearch size={"24px"} className="text-gray-700" />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Search Mail"
                  className="rounded-full w-full bg-transparent outline-none px-1" />
              </div>

            </div>
            <div className="flex items-center gap-1">
              <div className='p-3 rounded-full hover:bg-gray-200 cursor-pointer '>
                <CiCircleQuestion size={'24px'} />
              </div>

              <div className='p-3 rounded-full hover:bg-gray-200 cursor-pointer '>
                <IoIosSettings size={'24px'} />
              </div>

              <div className='p-3 rounded-full hover:bg-gray-200 cursor-pointer '>
                <TbGridDots size={'24px'} />
              </div>
              <span onClick={logoutHandler} className="underline cursor-pointer">Logout</span>
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyHC9h4miHDT7SeZIs03UdztEnbNELc9GkxQ&s" size="30" round={true} />

            </div>
          </>
        )
      }

    </div>
  )
}

export default Navbar