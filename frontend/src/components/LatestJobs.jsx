import React from 'react'
import LatestJobCard from './LatestJobCard'

const LatestJobs = () => {
    const Jobs=[1,2,3,4,5,6,7,8,]
  return (
      <div>
          <h1 className='text-4xl font-bold'>
              Latest & Top <span className='text-[#f83006]'>Job openings</span></h1>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-5 flex-wrap'>
              {
              Jobs.slice(0,6).map((job, index) => (
                  <LatestJobCard data={job} key={index}/>
              ))
          }
          </div>
          
    </div>
  )
}

export default LatestJobs