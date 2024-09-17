import React from 'react'
import Navbar from './ui/shared/Navbar';
import Job from './Job.jsx';

const Browse = () => {
    const jobs = [1, 2, 3, 456, 5];
  return (
      <div>
          <Navbar />
          <div className='max-w-7xl mx-auto my-10'>
              <h1 className='text-start mb-4  text-2xl font-bold text-gray-500'>Search results ({jobs.length})</h1>
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                  {
                      jobs.map((job, ind) => (
                          <Job job={jobs} key={ind}/>
                      ))
                  }
              </div>
              
          </div>
    </div>
  )
}

export default Browse