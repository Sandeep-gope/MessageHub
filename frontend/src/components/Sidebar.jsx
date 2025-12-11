import React from 'react'
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { TbSend2 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    {
    icon: <MdInbox size={"24px"}/>,
    text: "Inbox"
    },
    {
    icon: <FaRegStar size={"24px"}/>,
    text: "Starred"
    },
    {
    icon: <MdOutlineWatchLater size={"24px"}/>,
    text: "Snoozed"
    },
    {
    icon: <TbSend2 size={"24px"}/>,
    text: "Sent"
    },
    {
    icon: <MdOutlineDrafts size={"24px"}/>,
    text: "Drafts"
    },
    {
    icon: <MdOutlineKeyboardArrowDown size={"24px"}/>,
    text: "More"
    },
]

const Sidebar = () => {

    const dispatch = useDispatch();

  return (
    <div className='w-[15%]'>
      <div className='p-3'>
        <button onClick={()=> dispatch(setOpen(true))} className='flex items-center gap-4 bg-[#C2E2FF] rounded-2xl p-3 px-5 hover:shadow-md'>
            <LuPencil size={"22px"}/>
            Compose
        </button>
      </div>

      <div className='text-gray-500'>
        {
            sidebarItems.map((item,index) => {
                return (
                    <div key={index} className='flex items-center gap-4 pl-6 py-1 rounded-r-full my-2 hover:cursor-pointer hover:bg-gray-200'>
                        {item.icon}
                        <p>{item.text}</p>
                    </div>
                )
            })
        }
        {/* <div className='flex items-center gap-4 pl-6 py-1 rounded-r-full my-2 hover:cursor-pointer hover:bg-gray-200'>
            <MdInbox size={"24px"}/>
            <p>Inbox</p>
        </div> */}
      </div>
    </div>
  )
}

export default Sidebar
