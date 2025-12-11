import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Inbox from './components/Inbox'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Inbox />
      },
      {
        path: '/mail/:id',
        element: <Mail />
      }
    ]
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element: <Signup />
  }
])



function App() {

  return (
      <div className='bg-[#F6F8FC] h-screen'>
          
          <RouterProvider router={appRouter}/>
          <div className='absolute w-[30%] bottom-0 right-20 z-10'>
            <SendEmail />
            <Toaster />
          </div>
      </div>
  )
}

export default App
