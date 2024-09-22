import React, { useState } from 'react';
import Navbar from './ui/shared/Navbar';
import { useSelector } from 'react-redux';
import AppliedTables from './AppliedTables';
import EditProfileModal from './EditPofile.jsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  console.log(user)
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen text-start">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white border border-gray-300 shadow-xl rounded-lg mt-10 p-10 text-start">
        {/* Profile Picture and Basic Info */}
        <div className="flex flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={user.profile.profile || "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              className="w-40 h-40 rounded-full border-4 border-gray-200 object-cover"
              alt="User Profile"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 uppercase">{user.fullname}</h2>
            <p className="text-lg text-gray-500 mt-1 uppercase">{user.role}</p>
            <p className="text-md text-gray-600 mt-2 uppercase">{user.email}</p>
            <p className="text-md text-gray-600 mt-1 uppercase">{user.phoneNumber || "No phone number provided"}</p>
          </div>
        </div>
        {/* Edit Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
        {/* Bio Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Bio</h3>
          <p className="text-gray-700 mt-3 leading-relaxed">
            {user.profile.bio || "Add your bio here..."}
          </p>
        </div>
        {/* Skills Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Skills</h3>
          <ul className="list-disc pl-5 mt-3">
            {user.profile.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <li key={index} className="text-gray-700 text-lg">{skill}</li>
              ))
            ) : (
              <p className="text-gray-500">Add your skills here...</p>
            )}
          </ul>
        </div>
        {/* Resume Upload Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Resume</h3>
          <p className="text-gray-500 mb-2">Upload your resume (PDF):</p>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="application/pdf"
              className="border rounded p-2 text-gray-700"
            />
            <button
              className="bg-[#f83006] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-[#cc2704]"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {/* Applied Tables */}
      <div className='p-7'>
        <AppliedTables />
      </div>
      {/* Edit Profile Modal */}
      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Profile;