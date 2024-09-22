import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { sethUser } from '@/redux/authSlice';
import { toast } from 'react-hot-toast';

const EditProfileModal = ({ onClose }) => {
    // Get user data from Redux store
    const { user } = useSelector(store => store.auth);

    // State for form inputs, initialized with existing user data
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills || [],
    });

    const dispatch = useDispatch(); // To dispatch actions to the Redux store

    // Handle changes in text inputs
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // Handle skill input changes by index
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...input.skills];
        updatedSkills[index] = value;
        setInput({ ...input, skills: updatedSkills });
    };

    // Add a new skill to the list
    const addSkill = () => {
        setInput({ ...input, skills: [...input.skills, ""] });
    };

    // Remove a skill from the list by index
    const removeSkill = (index) => {
        const updatedSkills = input.skills.filter((_, i) => i !== index);
        setInput({ ...input, skills: updatedSkills });
    };

    // Handle form submission to update profile
    const handleSave = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior

        // Data to be sent for updating the profile
        const updateData = {
            fullname: input.fullname,
            email: input.email,
            phoneNumber: input.phoneNumber,
            bio: input.bio,
            skills: input.skills.join(','), // Joining skills array into a comma-separated string
        };

        try {
            // Making a PUT request to update the user profile
            const res = await axios.put(`${USER_API_END_POINT}/user/profile/update`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            // If the update is successful
            if (res.data.success) {
                console.log('Updated User:', res.data.user);
                dispatch(sethUser(res.data.user)); // Update the Redux store with the new user data
                toast.success("Profile updated successfully!"); // Show success toast
                onClose(); // Close the modal
            } else {
                console.error('Update failed:', res.data.message);
                toast.error(res.data.message || "Failed to update profile"); // Show error toast
            }
        } catch (error) {
            // Handle errors from the request
            console.error('Error:', error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={handleSave}>
                    {/* Full Name input field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Email input field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Phone Number input field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Bio input field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Bio</label>
                        <textarea
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Skills input field, allowing dynamic skill additions */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Skills</label>
                        {input.skills.map((skill, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                                <button type="button" onClick={() => removeSkill(index)} className="text-red-600">Remove</button>
                            </div>
                        ))}
                        {/* Button to add a new skill */}
                        <button type="button" onClick={addSkill} className="bg-blue-500 text-white px-4 py-2 rounded">Add Skill</button>
                    </div>

                    {/* Buttons to save or cancel changes */}
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
