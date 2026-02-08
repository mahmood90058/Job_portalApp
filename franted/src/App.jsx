import React from 'react'
import Navbar from './components/shared/Navbar'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import Job from './components/Job'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoutes from './components/admin/ProtectedRoutes'

const appRouter= createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/signup',
  element:<Signup/>
},
{
  path:'/jobs',
  element:<Jobs/>
},
{
  path:'/description/:id',
  element:<JobDescription/>
},
{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/profile',
  element:<Profile/>
},

 // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element:<ProtectedRoutes> <Companies/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoutes><CompanyCreate/></ProtectedRoutes> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoutes> <CompanySetup/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoutes> <AdminJobs/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/create",
    element: <ProtectedRoutes><PostJobs/></ProtectedRoutes> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoutes><Applicants/></ProtectedRoutes> 
  },

])

const App = () => {

  return (

    <div>
      <RouterProvider router={appRouter}/>
    </div>
    

  )
}

export default App