import React, { useState } from 'react'
import Loader from '../ui/Loader';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { sethUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const CompanyForm = ({ setCreateCompany }) => {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);
    const [companyData, setCompanyData] = useState({
        companyName: '',
        companyWebsite: '',
        companyDescription: '',
        companyLocation: '',
        companyLogo: null,
    });


    const handleCompany = (e) => {
        const { name, value } = e.target;
        setCompanyData({
            ...companyData,
            [name]: value,
        });
    };


    const handleLogo = (e) => {
        const file = e.target.files[0];
        setCompanyData({
            ...companyData,
            companyLogo: file,
        });

    };

    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        const formDatas = new FormData();

        // Append company data to formData
        formDatas.append('companyName', companyData.companyName);
        formDatas.append("companyWebsite", companyData.companyWebsite);
        formDatas.append("companyDescription", companyData.companyDescription);
        formDatas.append("companyLocation", companyData.companyLocation);
        console.log(formDatas)
        // Append the logo if it's selected
        if (companyData.companyLogo) {
            formDatas.append("file", companyData.companyLogo); // Ensure 'file' matches multer config

        }
        console.log('FormData contents:');
        for (let [key, value] of formDatas.entries()) {
            console.log(key, value);
        }
        try {
            setLoader(true);
            const res = await axios.post(`${USER_API_END_POINT}/company/register`, formDatas, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(sethUser(res.data.user));
                toast.success("Profile updated successfully!");
            } else {
                toast.error(res.data.message || "Failed to update profile");
            }
            setCreateCompany(false);
            console.log("Company data submitted:", companyData);
        } catch (error) {
            console.error("Error while registering a company", error);
            setLoader(false)
        }
    };


  return (
      <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded shadow-lg overflow-y-scroll max-h-full">
                  <h1 className="text-2xl font-bold text-black mb-4">Add Company</h1>
                  <form onSubmit={handleCompanySubmit} className="space-y-4 text-start">
                      <div>
                          <label htmlFor="companyName" className="block text-black mb-1">Company Name</label>
                          <input
                              type="text"
                              name="companyName"
                              placeholder="e.g. Tech Innovators Inc."
                              required
                              className="w-full p-2 border border-gray-300 rounded text-black"
                              value={companyData.companyName}        // controlled component
                              onChange={handleCompany}
                          />
                      </div>
                      <div>
                          <label htmlFor="companyDescription" className="block text-black mb-1">Company Description</label>
                          <textarea
                              name="companyDescription"
                              placeholder="Brief description of the company."
                              required
                              className="w-full p-2 border border-gray-300 rounded text-black"
                              rows="1"
                              value={companyData.companyDescription}  // controlled component
                              onChange={handleCompany}
                          ></textarea>
                      </div>
                      <div>
                          <label htmlFor="companyWebsite" className="block text-black mb-1">Website</label>
                          <textarea
                              name="companyWebsite"
                              placeholder="e.g. https://www.techinnovators.com"
                              required
                              className="w-full p-2 border border-gray-300 rounded text-black"
                              rows="1"
                              value={companyData.companyWebsite} // controlled component
                              onChange={handleCompany}
                          ></textarea>
                      </div>
                      <div>
                          <label htmlFor="companyLocation" className="block text-black mb-1">Location</label>
                          <input
                              type="text"
                              name="companyLocation"
                              placeholder="e.g. New York, NY"
                              required
                              className="w-full p-2 border border-gray-300 rounded text-black"
                              value={companyData.companyLocation}       // controlled component
                              onChange={handleCompany}
                          />
                      </div>
                      <div>
                          <label htmlFor="companyLogo" className="block text-black mb-1">Logo</label>
                          <input
                              type="file"
                              name="companyLogo"
                              required
                              className="w-full p-2 border border-gray-300 rounded text-black"
                              onChange={handleLogo}
                          />
                      </div>
                      <div className="flex flex-row gap-4">
                          <Button
                              onClick={() => setCreateCompany(false)}
                              variant="outline"
                          >
                              Cancel
                          </Button>
                          <button
                              type="submit"
                              className="w-full p-2 bg-[#f83006] hover:bg-[#d62905] text-white rounded"
                          >
                              {loader ? <Loader /> : "Add"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
    </div>
  )
}

export default CompanyForm