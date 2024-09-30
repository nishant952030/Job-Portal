import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { USER_API_END_POINT } from './utils/constant'
import { useCheckApplied } from './utils/functions'
import toast from 'react-hot-toast'
import axios from 'axios'
import { data } from 'autoprefixer'

const Job = ({ job }) => {
    const { user } = useSelector(store => store.auth)
    const getTime = (createdAt) => {
        const createdTime = new Date(createdAt);
        const timeAgo = formatDistanceToNow(createdTime, { addSuffix: true });
        return timeAgo;
    }
    const navigate = useNavigate();
    const showDetails = (id) => {
        navigate(`/jobs/description/${id}`);
    };

    const handleApply = async (id) => {
        if (!user) {
            toast.error("Please login before applying");
            return;
        }

        if (user._id === job.created_by) {
            toast.error("You created this job");
            return;
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/application/apply-to/${id}`, {}, { withCredentials: true });
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message);
                setApplied(true);
            } else {
                toast.error("Couldn't apply. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while applying.");
            console.log(error);
        }

    };
    const [applied, setApplied] = useState(false);
    useCheckApplied(job._id, setApplied);
    return (
        <div className="p-6 h-80 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300 ease-in-out flex flex-col">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{getTime(job.createdAt) || 'Posted 3 days ago'}</p>
                <Button className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-4 my-4'>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job.company.logo || 'https://img.freepik.com/free-vector/abstract-orange-triangle-logo_1043-120.jpg'} />
                </Avatar>
                <div className='text-start'>
                    <h2 className="text-lg font-semibold text-gray-900">{job.title || 'Software Engineer'}</h2>
                    <p className="text-sm text-gray-600">{job.company.name || 'Company Name'}</p>
                </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-700 my-4 text-start">
                <p><strong>Location:</strong> {job.location || 'Gurugram, India'}</p>
                <p><strong>Salary:</strong> {job.salary || '12 LPA'}</p>
                <p><strong>Type:</strong> {job.jobType || 'Full-Time'}</p>
            </div>
            <div className="flex-grow overflow-hidden">
                <p className="text-sm text-gray-600 mb-4 text-start line-clamp-2">
                    {job.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac velit nec urna mollis gravida.'}
                </p>
            </div>
            <div className="flex justify-end mt-auto">
                <Button variant="outline" className="px-6 py-2 border-2 border-[#f83006] text-[#f83006] bg-white hover:bg-[#f83006] hover:text-white hover:border-[#d6614c] transition duration-300 ease-in-out mr-4" onClick={() => showDetails(job._id)}>
                    Details
                </Button>
                <Button
                    onClick={() => handleApply(job._id)}
                    className={`${applied  ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "hover:bg-[#c74c33]"} bg-[#f83006] text-white text-md`}
                    disabled={applied || job?.status==='Closed'}
                >
                    {job?.status==='Closed'?"Closed":applied ? 'Applied' : 'Apply Now'}
                </Button>
            </div>
        </div>
    )
}

export default Job