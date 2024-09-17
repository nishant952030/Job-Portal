import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const Job = ({ job }) => {
    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300 ease-in-out">
            {/* Job Card Header */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{job.timeAgo || 'Posted 3 days ago'}</p>
                <Button className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Logo and Job Title */}
            <div className='flex items-center gap-4 my-4'>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job.companyLogo || 'https://img.freepik.com/free-vector/abstract-orange-triangle-logo_1043-120.jpg'} />
                </Avatar>
                <div className='text-start'>
                    <h2 className="text-lg font-semibold text-gray-900">{job.title || 'Software Engineer'}</h2>
                    <p className="text-sm text-gray-600">{job.company || 'Company Name'}</p>
                </div>
            </div>

            {/* Job Details (Location, Salary, Type) */}
            <div className="flex gap-4 text-sm text-gray-700 my-4 text-start">
                <p><strong>Location:</strong> {job.location || 'Gurugram, India'}</p>
                <p><strong>Salary:</strong> {job.salary || '12 LPA'}</p>
                <p><strong>Type:</strong> {job.type || 'Full-Time'}</p>
            </div>
            {/* Job Description */}
            <p className="text-sm text-gray-600 mb-4 text-start">
                {job.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac velit nec urna mollis gravida.'}
            </p>

            {/* Apply Button */}
            <div className="flex justify-end ">
                <Button variant="outline" className="px-6 py-2 border-2 border-[#f83006] text-[#f83006] bg-white hover:bg-[#f83006] hover:text-white hover:border-[#d6614c] transition duration-300 ease-in-out mr-4">
                    Details
                </Button>

                <Button variant="default" className="px-6 py-2 bg-[#f83006] text-white hover:bg-[#d6614c] transition duration-300 ease-in-out">
                    Apply Now
                </Button>
            </div>
        </div>
    )
}

export default Job
