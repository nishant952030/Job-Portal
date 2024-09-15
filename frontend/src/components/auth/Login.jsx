import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'react-hot-toast'; // Import toast
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login= () => {
    // State for form datac
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    const handleRadioChange = (value) => {
        setFormData({
            ...formData,
            userType: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('role', formData.role);
        console.log(formDataToSend)
        try {
            const response = await axios.post(`${USER_API_END_POINT}/user/login`, formDataToSend);

            console.log(response)
            if (response.status === 201 || response.status === 200) {
                toast.success(response.data.message);
                console.log(response.data);
                navigate("/")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
            toast.error('An error occurred during signup.');
        } 
    };

    return (
        <div>
            <Navbar signup={true} />
            <div className='flex items justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-lg p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-gray-700'>Log In</h1>
                    {/* E-mail */}
                    <div className='my-2'>
                        <Label className="flex justify-start my-3 font-semibold">E-mail</Label>
                        <Input
                            className="rounded-lg"
                            type="email"
                            placeholder="JohhDoe@gmail.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password and Confirm Password */}
                    <div className='my-2'>
                        <Label className="flex justify-start my-3 font-semibold">Password</Label>
                        <div className='flex flex-row gap-3'>
                            <Input
                                className="rounded-lg"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Radio Group */}
                    <div className='my-2'>
                        <Label className="flex justify-start my-3 font-semibold">Select an option</Label>
                        <RadioGroup
                            className="flex flex-row gap-4"
                            value={formData.role}
                            onValueChange={handleRadioChange}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="option-one" />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recruiter" id="option-two" />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>


                    {/* Submit Button */}
                    <div className='mt-5'>
                        <button type="submit" className='bg-[#F83002] hover:bg-[#ac3a20] text-white px-4 py-2 rounded-lg'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
