import React from 'react'
import Navbar from './ui/shared/Navbar'
import HeroSections from './HeroSections'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSections />
      <CategoryCarousel />
      <LatestJobs />
      <Footer/>
    </div>
  )
}

export default Home