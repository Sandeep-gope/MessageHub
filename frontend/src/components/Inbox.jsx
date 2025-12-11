import React, { useState } from 'react'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {FaCaretDown} from 'react-icons/fa'
import { IoMdMore, IoMdPeople, IoMdRefresh } from "react-icons/io";
import { GoTag } from "react-icons/go";
import Emails from './Emails';

const mailType = [
    {
        icon: <MdInbox size={"20px"}/>,
        text: "Primary"
    },
    {
        icon: <GoTag size={"20px"}/>,
        text: "Promotions"
    },
    {
        icon: <IoMdPeople size={"20px"}/>,
        text: "Social"
    },
]

const Inbox = () => {
    const [selected, setSelected] = useState(0);
  return (
    <div className='flex-1 bg-white mx-5 rounded-xl'>
      <div className='flex items-center justify-between px-4 my-2'>
        <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
                <MdCropSquare size={"20px"}/>
                <FaCaretDown size={"20px"}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoMdRefresh size={"20px"}/>
            </div>
            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoMdMore size={"20px"}/>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <span>1 to 50</span>
            <MdKeyboardArrowLeft size={"24px"}/>
            <MdKeyboardArrowRight size={"24px"}/>
        </div>
      </div>
      <div className='h-90vh overflow-y-auto'>
        <div className='flex items-center gap-1'>
            {
                mailType.map((item,index) => {
                    return (
                        <button key={index} onClick={() => setSelected(index)} className={` ${selected === index ? "border-b-4 border-b-blue-600 text-blue-600" : "border-b-4 border-b-transparent"} flex items-center w-52 gap-5 p-4`}>
                            {item.icon}
                            <span>{item.text}</span>
                        </button>
                    )
                })
            }
        </div>
        <Emails />
      </div>
    </div>
  )
}

export default Inbox
