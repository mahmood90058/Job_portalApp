import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCrousel from './CategoryCrousel'
import LatestJob from './LatestJob'
import LatestJobCards from './LatestJobCards'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  useGetAllJobs()
    const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCrousel/>
        <LatestJob/>
        <Footer/>
        
        

    </div>
  )
}

export default Home