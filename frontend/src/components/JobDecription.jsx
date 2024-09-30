import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { USER_API_END_POINT } from './utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDescriptionLoader } from '@/redux/latestJobSlice';

const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const { descriptionLoader } = useSelector(store => store.latestjob);
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async (id) => {
      try {
        dispatch(setDescriptionLoader(true));
        const res = await axios.get(`${USER_API_END_POINT}/jobs/get-job/${id}`, { withCredentials: true });
        console.log(res);
        setJob(res.data.jobs);
        setIsApplied(res.data.jobs?.hasApplied || false); // Example
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setDescriptionLoader(false));
      }
    }
    fetchJobDetails(id);
  }, [id, dispatch]);

  return (
    <div className='text-start max-w-2xl mx-auto pt-12'>
      <hr></hr>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{job.title || "Job Title"}</h1>
          <div className='flex flex-row text-xl gap-4'>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white'>{job.position} Positions</Badge>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white' variant="ghost">{job.salary ? ((job.salary) / 100000).toFixed(1) : "N/A"} LPA</Badge>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white' variant="ghost">{job.jobType || "Job Type"}</Badge>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button disabled={isApplied} className={`mx-auto mt-4 rounded-full shadow-xl ${isApplied ? "bg-gray-500 text-white cursor-not-allowed" : "transition-all hover:bg-gray-200"}`}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      <h1 className='font-bold text-xl text-gray-700 mt-6'>Job Description</h1>
      <hr className='bg-slate-600 mb-4'></hr>

      <div className='grid grid-cols-2 gap-4 text-gray-800'>
        <div>
          <span className='font-bold'>Company Name: </span>
          <span>{job.company?.name || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Company Bio: </span>
          <span>{job.company?.description || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Role: </span>
          <span>{job.title || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Salary: </span>
          <span>{job.salary ? ((job.salary) / 100000).toFixed(1) : "N/A"} LPA</span>
        </div>
        <div>
          <span className='font-bold'>Type: </span>
          <span>{job.jobType || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Duration (Internship): </span>
          <span>{job.duration || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Position: </span>
          <span>{job.position || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Experience: </span>
          <span>{job.requirements || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Bond: </span>
          <span>{job.bond || "N/A"}</span>
        </div>
        <div>
          <span className='font-bold'>Location: </span>
          <span>{job.location || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
