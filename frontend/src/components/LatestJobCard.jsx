import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { USER_API_END_POINT } from '../components/utils/constant.js';
import { useCheckApplied } from './utils/functions';

const LatestJobCard = ({ data }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    console.log(data);
    const handleCompanyClick = (e) => {
        e.preventDefault();
        if (data.company.website) {
            let url = data.company.website;
            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const showDetails = (id) => {
        navigate(`/jobs/description/${id}`);
    };

    const handleApply = async (id) => {
        if (!user) {
            toast.error("Please login before applying");
            return;
        }

        if (user._id === data.created_by) {
            toast.error("You created this job");
            return;
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/application/apply-to/${id}`, {}, { withCredentials: true });
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message);
                useCheckApplied(data._id,id)
            } else {
                toast.error("Couldn't apply. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred while applying.");
            console.log(error);
        }
    };
    const [applied, setApplied] = useState(false);
    useCheckApplied(data._id, setApplied);
    console.log(applied)
    return (
        <div className='text-start p-6 rounded-lg shadow-lg bg-white border border-slate-200 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
            <div className="flex flex-col h-full">
                <div className='flex flex-row gap-4 items-center mb-4'>
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={data.company.logo} alt={`${data.company.name} logo`} />
                        <AvatarFallback>{data.company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            <button
                                onClick={handleCompanyClick}
                                className='hover:underline flex items-center gap-1 cursor-pointer'
                                aria-label={`Visit ${data.company.name}'s website`}
                            >
                                {data.company.name || 'Company Name'}
                                <ExternalLink size={16} />
                            </button>
                        </h1>
                        <p className="text-sm text-gray-500">{data.location || 'Location'}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#f83006]">{data.title || 'Job Title'}</h2>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                        {data.description || 'This is a brief description of the job position. The job involves tasks such as...'}
                    </p>
                </div>
                <div className="mt-auto">
                    <div className='flex flex-wrap gap-2'>
                        <Badge className="px-3 py-1 rounded-lg bg-purple-900 hover:bg-purple-800 text-white">
                            {data.position ? `Positions: ${data.position}` : 'Positions: 12'}
                        </Badge>
                        <Badge className="px-3 py-1 rounded-lg bg-teal-900 hover:bg-teal-800 text-white">
                            {data.jobType || 'Full-time'} 
                        </Badge>
                        <Badge className="px-3 py-1 rounded-lg bg-amber-900 hover:bg-amber-800 text-white">
                            {((data.salary) / 100000).toFixed(1) || '13 LPA'} LPA
                        </Badge>
                    </div>
                    <div className='flex justify-end pt-3 gap-3' >
                        <Button
                            variant="outline"
                            onClick={() => showDetails(data._id)}>Details
                        </Button>

                        <Button
                            onClick={() => handleApply(data._id)}
                            className={`${applied ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "hover:bg-[#c74c33]"} bg-[#f83006] text-white text-md`}
                            disabled={applied|| data?.status==='Closed'}
                        >
                            {data?.status === 'Closed' ? "Closed" : applied ? 'Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestJobCard;
