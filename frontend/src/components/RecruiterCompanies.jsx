import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import JobForm from './forms/JobForm';

const RecruiterCompanies = () => {
    // Sample company data - replace with your actual data source
    const { allCompanies } = useSelector(store => store.company)
     
    // State to manage the selected company for posting a job
    const [currentCompany, setCurrentCompany] = useState(null);
    const [open, setOpen] = useState(false);


    // Function to handle opening the dialog
    const handlePostJob = (company) => {
        setCurrentCompany(company)
        setOpen(true);
    };
    return (
        <div className="container mx-auto p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Companies List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {allCompanies.map((company, index) => (
                            <tr key={company._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{company.name}</td>
                                <td className="py-3 px-6 text-left">{company.location}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handlePostJob(company)}
                                        className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 text-sm"
                                    >
                                        Post Job
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { open && <JobForm company={currentCompany} setOpen={setOpen} />}
        </div>
    );
};

export default RecruiterCompanies;
