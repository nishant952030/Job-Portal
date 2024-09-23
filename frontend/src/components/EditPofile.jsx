import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { sethUser } from '../redux/authSlice.js';
import { USER_API_END_POINT } from '../components/utils/constant.js';
import Loader from './ui/Loader.jsx';

const EditProfileModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [loader, setLoader] = useState(false);
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        resume: null,
    });

    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, resume: file });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phone', input.phone);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.resume) formData.append('file', input.resume);
     
        try {
            setLoader(true);
            console.log(formData)
            const res = await axios.put(`${USER_API_END_POINT}/user/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
             
            if (res.data.success) {
                dispatch(sethUser(res.data.user));
                toast.success("Profile updated successfully!");
                onClose();
            } else {
                toast.error(res.data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while updating profile");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Full Name:</label>
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={input.phone}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Bio:</label>
                        <textarea
                            name="bio"
                            value={input.bio}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Skills:</label>
                        <input
                            type="text"
                            name="skills"
                            value={input.skills}
                            onChange={handleInputChange}
                            placeholder="Comma-separated values (e.g., React, Node, MongoDB)"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Upload Resume (PDF):</label>
                        <input
                            type="file"
                            name="resume"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            {loader?<Loader/>:"Save Changes"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
