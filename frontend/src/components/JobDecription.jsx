import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied = true;

  return (
    <div className='text-start max-w-2xl mx-auto pt-12'>
      <hr></hr>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='font-bold text-xl'>
            Software Developer
          </h1>
          <div className='flex flex-row text-xl gap-4'>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white'>12 Positions</Badge>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white' variant="ghost">12 LPA</Badge>
            <Badge className='bg-[#F83006] font-bold rounded-full text-white' variant="ghost">Part Time</Badge>
          </div>
        </div>
        <div className='flex justify-end'>
          <Button disabled={isApplied} className={`mx-auto mt-4 rounded-full shadow-xl ${isApplied ? "bg-gray-500 text-white cursor-not-allowed transition-all duration-500 ease-in-out hover:bg-gray-500" : "transition-all duration-500 ease-in-out hover:bg-gray-200"}`}>
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      <h1 className='font-bold text-xl text-gray-700 mt-6'>Job Description</h1>
      <hr className='bg-slate-600 mb-4'></hr>

      <div className='grid grid-cols-2 gap-4 text-gray-800'>
        <div>
          <span className='font-bold'>Company Name: </span>
          <span>Awesome Tech Pvt. Ltd.</span>
        </div>
        <div>
          <span className='font-bold'>Company Bio: </span>
          <span>A leading tech company focused on AI and ML innovation.</span>
        </div>
        <div>
          <span className='font-bold'>Role: </span>
          <span>Software Developer</span>
        </div>
        <div>
          <span className='font-bold'>Salary: </span>
          <span>12 LPA</span>
        </div>
        <div>
          <span className='font-bold'>Type: </span>
          <span>Part Time</span>
        </div>
        <div>
          <span className='font-bold'>Duration (Internship): </span>
          <span>6 months</span>
        </div>
        <div>
          <span className='font-bold'>Position: </span>
          <span>12 Positions</span>
        </div>
        <div>
          <span className='font-bold'>Experience: </span>
          <span>Fresher</span>
        </div>
        <div>
          <span className='font-bold'>Bond: </span>
          <span>Yes, 2 years</span>
        </div>
        <div>
          <span className='font-bold'>Location: </span>
          <span>Gurugram.India</span>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
