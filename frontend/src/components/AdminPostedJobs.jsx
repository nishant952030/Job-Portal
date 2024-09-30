import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from './utils/constant';
import ApplicantsList from './ApplicantsList';
import { toast } from 'react-hot-toast';

const AdminPostedJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [applicants, setApplicants] = useState([]);
    const [expandedJobId, setExpandedJobId] = useState(null);
    const [editingJobId, setEditingJobId] = useState(null);

    useEffect(() => {
        if (expandedJobId) {
            fetchApplicants(expandedJobId);
        }
    }, [expandedJobId]);

    const fetchApplicants = async (jobId) => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/application/get-all-applicants/${jobId}`, { withCredentials: true });
            setApplicants(res.data.job.applications);
        } catch (error) {
            toast.error("Failed to fetch applicants");
        }
    };


    
    
    
    const handleViewApplicants = (jobId) => {
        setExpandedJobId(expandedJobId === jobId ? null : jobId);
    };
    const handleApplicantStatus = async (applicationId, status) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/application/update-status/${applicationId}`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success("Applicant status updated successfully");
                setApplicants(prevApplicants =>
                    prevApplicants.map(app =>
                        app._id === applicationId ? { ...app, status } : app
                    )
                );
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to update applicant status");
        }
    };
     
    const handleEditJob = (jobId) => {
        setEditingJobId(jobId);
    };

    const handleUpdateJobStatus = async (jobId, newStatus) => {
        try {
            const res = await axios.put(`${USER_API_END_POINT}/jobs/update-status/${jobId}`, { status: newStatus }, { withCredentials: true });
            if (res.data.success) {
                toast.success("Job status updated successfully");
            } else {
                toast.error("Failed to update job status");
            }
            setEditingJobId(null);
        } catch (error) {
            toast.error("Error updating job status");
        }
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
                        {allJobs.length !== 0 ? (
                            allJobs.map((job, index) => (
                                <React.Fragment key={job._id}>
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                        <td className="py-3 px-6 text-left">{job.title}</td>
                                        <td className="py-3 px-6 text-left">{job.location}</td>
                                        <td className="py-3 px-6 text-center">
                                            {editingJobId === job._id ? (
                                                <select
                                                    value={job.status}
                                                    onChange={(e) => handleUpdateJobStatus(job._id, e.target.value)}
                                                    className="bg-white border border-gray-300 rounded px-2 py-1"
                                                >
                                                    <option value="Open">Open</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            ) : (
                                                <span className={`${job.status === 'Open' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'} py-1 px-3 rounded-full text-xs`}>
                                                    {job.status === 'Open' ? 'Open' : 'Closed'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs">
                                                {job.applications.length}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleViewApplicants(job._id)}
                                                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 text-sm mr-2"
                                            >
                                                {expandedJobId === job._id ? 'Hide Applicants' : 'View Applicants'}
                                            </button>
                                            <button
                                                onClick={() => handleEditJob(job._id)}
                                                className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 text-sm"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedJobId === job._id && (
                                        <tr>
                                            <td colSpan="6" className="py-4">
                                                <ApplicantsList
                                                    applicants={applicants}
                                                    onAccept={(id) => handleApplicantStatus(id, "accepted")}
                                                    onReject={(id) => handleApplicantStatus(id, "rejected")}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-3 px-6 text-center">
                                    <h2>You have not posted any jobs</h2>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPostedJobs;
