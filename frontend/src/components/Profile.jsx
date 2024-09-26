import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Camera, Mail, Phone, FileText, Edit3, Award, Briefcase } from 'lucide-react';
import Navbar from './ui/shared/Navbar';
import AppliedTables from './AppliedTables';
import EditProfileModal from './EditPofile';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { sethUser } from '@/redux/authSlice';
import Loader from './ui/Loader';
import AdminPostedJobs from './AdminPostedJobs';
import RecruiterCompanies from './RecruiterCompanies';
const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const { loader } = useSelector(store => store.company);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    // Check file type
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error("Only JPEG and PNG images are allowed");
      return;
    }

    // Check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      console.log(formData)
      const res = await axios.put(`${USER_API_END_POINT}/user/profile/profile-pic`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message || "Profile picture updated successfully");

        // Update Redux store with the new user data
        dispatch(sethUser(res.data.user));
      } else {
        toast.error(res.data.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Navbar />
      <input
        ref={fileInputRef}
        className='hidden'
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="max-w-4xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className=" flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white px-6 py-2 rounded-lg rounded-bl-3xl font-semibold transition-all duration-200 hover:bg-gray-100 flex items-center"
              >
                <Edit3 size={18} className="mr-2 text-indigo-600" />
              </button>
            </div>
            <div className="absolute -bottom-10 left-10">
              <img
                src={user.profile.profile || "/api/placeholder/150/150"}
                className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                alt="User Profile"
              />
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {loading ? <Loader /> : <Camera size={20} className="text-gray-600" />}
              </button>

            </div>
            <div className='absolute top-36 left-32 sm:top-36 sm:left-48 flex flex-col text-start'>
              <h2 className=" sm:text-3xl text-2xl sm:mt-0 mt-3 font-bold text-white uppercase">{user.fullname}</h2>
              <p className=" text-md sm:text-lg text-indigo-600 sm:mt-5 mt-2 uppercase">{user.role}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-20 px-10 pb-10">
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center text-gray-700">
              <div className="flex items-center mr-6 mb-2 sm:mb-0">
                <Mail size={18} className="mr-2 text-indigo-500" />
                {user.email}
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-indigo-500" />
                {user.phone || "No phone number provided"}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FileText size={24} className="mr-2 text-indigo-500" />
                Bio
              </h3>
              <p className="text-gray-700 text-start -ml-10 md:mt-0 -mt-4 pl-8">
                {user.profile.bio || "Add your bio here..."}
              </p>
            </div>


            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Award size={24} className="mr-2 text-indigo-500" />
                Skills
              </h3>
              {user.profile.skills && user.profile.skills.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2 pl-8">
                  {user.profile.skills.map((skill, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-3 pl-8">Add your skills here...</p>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Briefcase size={24} className="mr-2 text-indigo-500" />
                Resume
              </h3>
              {user.profile.resume ? (
                <div className="mt-3 pl-8">
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 underline flex items-center"
                  >
                    <FileText size={18} className="mr-2" />
                    {user.profile.resumeOriginalName || "View Resume"}
                  </a>
                </div>
              ) : (
                <p className="text-gray-500 mt-3 pl-8">No resume uploaded.</p>
              )}
            </div>
          </div>
        </div>

        <div className='mt-10'>
          {user.role === 'student' ? <AppliedTables /> : <div>
            <AdminPostedJobs/>
            {!loader?<RecruiterCompanies />:<Loader/>}
          </div>}
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;