import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobslice';
const JobForm = ({ setOpen, company }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: company?.name || '',
        description: '',
        requirements: '',
        salary: '',
        location: company?.location || '',
        jobType: '',
        position: '', // Change to number if it should be a number
        company: company?._id || '',
        designation,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const processedValue = type === 'number' ? Number(value) : value;
        setFormData({ ...formData, [name]: processedValue });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${USER_API_END_POINT}/jobs/create-job`, formData, {
                withCredentials: true
            }); // Replace 
            if (response.status === 200) {
                console.log('Form submitted successfully:', response.data);
                toast.success("Job created successfully")

            } else {
                console.error('Unexpected response status:', response.status);
                setOpen(false);
            }
        } catch (error) {
            toast.error("Sorry, we couldn't submit your form")
            console.error('Error submitting the form:', error.message);
        }


        try {
            const res = await axios.get(`${USER_API_END_POINT}/jobs/admin-jobs`, {
                withCredentials: true
            });

            if (res.status === 200) {
                console.log("this is from handleprofile", res);
                dispatch(setAllJobs(res.data.created_jobs))
            } else {
                console.error(`Unexpected response status: ${res.status}`);
            }

        } catch (error) {
            console.log(error)
        }
    };
    const handleCancel = () => {
        setOpen(false);
    }
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded shadow-lg  overflow-y-scroll max-h-full">
                    <h1 className="text-2xl font-bold text-black mb-4">Post a New Job</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 text-start">
                        <div>
                            <label htmlFor="title" className="block text-black mb-1">Job Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="e.g. Machine Learning Engineer"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.title}        // controlled component
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* <div>
                            <label htmlFor="designation" className="block text-black mb-1">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                placeholder="e.g. Machine Learning Engineer"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.designation}        // controlled component
                                onChange={handleChange}
                            />
                        </div> */}

                        <div>
                            <label htmlFor="description" className="block text-black mb-1">Job Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="We are looking for an experienced software engineer to join our team."
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                rows="1"
                                value={formData.description}  // controlled component
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="requirements" className="block text-black mb-1">Requirements</label>
                            <textarea
                                id="requirements"
                                name="requirements"
                                placeholder="e.g. 5+ years of experience with JavaScript, React, Node.js, and MongoDB."
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                rows="1"
                                value={formData.requirements} // controlled component
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="salary" className="block text-black mb-1">Salary (USD)</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                placeholder="e.g. 140000"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.salary}       // controlled component
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-black mb-1">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="e.g. New York, NY"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.location}     // controlled component
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="jobType" className="block text-black mb-1">Job Type</label>
                            <select
                                id="jobType"
                                name="jobType"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.jobType}      // controlled component
                                onChange={handleChange}
                            >
                                <option value="">Select job type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="position" className="block text-black mb-1">Number of Positions</label>
                            <input
                                type="number"
                                id="position"
                                name="position"
                                placeholder="e.g. 2"
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                value={formData.position}     // controlled component
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-row gap-4">
                            <Button onClick={handleCancel} variant="outline">Cancel</Button>
                            <button type="submit" className="w-full p-2 bg-[#f83006] hover:bg-[#d62905] text-white rounded">Post Job</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobForm