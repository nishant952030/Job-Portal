import React from 'react';
import { useSelector } from 'react-redux';

const AdminPostedJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    

    const handleViewApplicants = (jobId) => {
        console.log(`Fetching applicants for job ID: ${jobId}`);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Posted Jobs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-center">Open for Recruitment</th>
                            <th className="py-3 px-6 text-center">No. of Applicants</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        { allJobs.length!==0?
                            allJobs.map((job, index) => (
                            <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{job.title}</td>
                                <td className="py-3 px-6 text-left">{job.location}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`${job.isOpen ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} py-1 px-3 rounded-full text-xs`}>
                                        {job.isOpen ? 'Open' : 'Closed'}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs">
                                        {job.applicants}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleViewApplicants(job.id)}
                                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 text-sm"
                                    >
                                        View Applicants
                                    </button>
                                </td>
                            </tr>
                        )):<h2>You have not posted any jobs</h2>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPostedJobs;
