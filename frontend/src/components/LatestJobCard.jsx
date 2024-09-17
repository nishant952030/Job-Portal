import React from 'react'
import { Badge } from "@/components/ui/badge"

const LatestJobCard = ({ data }) => {
    return (
        <div className='text-start p-6 rounded-lg shadow-lg bg-white border border-slate-200 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
            {/* Wrapper for all content */}
            <div className="flex flex-col h-full">
                {/* Company Name and Location */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-800">{data.companyName || 'Company Name'}</h1>
                    <p className="text-sm text-gray-500">{data.location || 'Location'}</p>
                </div>

                {/* Job Title and Description */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#f83006]">{data.jobTitle || 'Job Title'}</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        {data.description || 'This is a brief description of the job position. The job involves tasks such as...'}
                    </p>
                </div>

                {/* Spacer/Pushes badges to the bottom */}
                <div className="mt-auto">
                    {/* Job Info Badges */}
                    <div className='flex flex-wrap gap-2'>
                        <Badge className="bg-[#f83006] text-white px-3 py-1 rounded-lg">
                            {data.positions ? `Positions: ${data.positions}` : 'Positions 12'}
                        </Badge>
                        <Badge className="bg-[#E5E7EB] text-gray-700 px-3 py-1 rounded-lg">
                            {data.location || 'Gurugram'}
                        </Badge>
                        <Badge className="bg-[#E5E7EB] text-gray-700 px-3 py-1 rounded-lg">
                            {data.salary || '13 LPA'}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCard
