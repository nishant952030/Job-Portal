import React from 'react'
import Navbar from './ui/shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'

const Jobs = () => {
    const jobs = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-6'>
                <div className='flex gap-5'>
                    {/* Filter Card */}
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>

                    {/* Job List */}
                    <div className='w-4/5'>
                        {jobs.length === 0 ? (
                            <span>Sorry, Couldn't find a job for you</span>
                        ) : (
                            <div className='flex-1 h-[90vh] overflow-x-auto pb-5'>
                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                                    {jobs.map((job, index) => (
                                        <div key={index}>
                                            <Job job={job} /></div>
                                    ))}
                                </div>
                            </div>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
