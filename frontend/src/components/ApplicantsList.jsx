import React from 'react';

const ApplicantsList = ({ applicants, onAccept, onReject }) => {
    console.log("applicant from applicants list", applicants);
    return (
        <div className="mt-4 bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-semibold mb-4">Applicants</h3>
            {applicants.length === 0 ? (
                <p>No applicants for this job yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">S.No</th>
                                <th className="py-2 px-4 border-b text-left">Full Name</th>
                                <th className="py-2 px-4 border-b text-left">Resume</th>
                                <th className="py-2 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((applicant, index) => (
                                <tr key={applicant._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b text-start">{applicant.applicant.fullname}</td>
                                    <td className="py-2 px-4 border-b text-start">
                                        <a
                                            href={applicant.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {applicant.applicant.profile.resumeOriginalName}
                                        </a>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => onAccept(applicant._id)}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => onReject(applicant._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicantsList;