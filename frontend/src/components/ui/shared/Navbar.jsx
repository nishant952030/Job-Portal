import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserRoundPen, Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sethUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/components/utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import JobForm from '@/components/forms/JobForm';
import CompanyForm from '@/components/forms/CompanyForm';
import { setAllCompanies, setLoader } from '@/redux/adminCompanySlice';
import { setAllJobs } from '@/redux/jobslice';
import { setAppliedJobs } from '@/redux/userAppliedJobs';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const { loader } = useSelector(store => store.company)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [createCompany, setCreateCompany] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Adjust this value as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const makeJob = () => {
        setOpen(true);
    }
    const makeCompany = () => {
        setCreateCompany(true);
    }


    const handleProfile = async () => {

        navigate("/profile")
        
        if (user.role === 'recruiter') {
            try {
                dispatch(setLoader(true));
                const res = await axios.get(`${USER_API_END_POINT}/company/getCompany`, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    console.log(res);
                    dispatch(setAllCompanies(res.data.companies))
                } else {
                    console.error(`Unexpected response status: ${res.status}`);
                }
            } catch (error) {
                console.error('Error fetching company data:', error.message);
            } finally {
                dispatch(setLoader(false));
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
        }
        else {
            try {
                dispatch(setLoader(true));
                const res = await axios.get(`${USER_API_END_POINT}/application/applied-jobs`, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    console.log(res.data.applications);
                    dispatch(setAppliedJobs(res.data.applications))
                } else {
                    console.error(`Unexpected response status: ${res.status}`);
                }
            } catch (error) {
                console.error('Error fetching company data:', error.message);
            } finally {
                dispatch(setLoader(false));
            }
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/user/logout`)
            if (!res) {
                toast.error("Couldn't Log Out");
                return;
            }

            toast.success(res.data.message);
            navigate("/")
            dispatch(sethUser(null));
        }
        catch (error) {
            console.log(error);
        }
    }

    const getInitials = (name) => {
        const nameParts = name.trim().split(" ");
        if (nameParts.length >= 2) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        } else {
            return nameParts[0][0].toUpperCase();
        }
    };


    const NavItems = () => (
        <>
            <li><Link to="/" className='hover:text-[#f83006]'>Home</Link></li>
            <li><Link to="/Jobs" className='hover:text-[#f83006]'>Job</Link></li>
            <li><Link to="/Browse" className='hover:text-[#f83006]'>Browse</Link></li>
        </>
    );

    return (
        <div className='bg-white flex flex-row justify-between items-center px-3 w-full py-2'>
            <div>
                <h1 className='text-2xl font-bold'>
                    Job<span className='text-[#F83002]'>Portal</span>
                </h1>
            </div>
            {isSmallScreen ? (
                <Popover>
                    <PopoverTrigger>
                        {user ? (
                            <Avatar>
                                <AvatarImage src={user.profile.profile} />
                                <AvatarFallback>{getInitials(user.fullname)}</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </PopoverTrigger>
                    <PopoverContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-xl">
                        <ul className='flex flex-col gap-3 font-bold mb-4'>
                            <NavItems />
                        </ul>
                        {user ? (
                            <>
                                <div className="border-t border-gray-200 pt-2">
                                    <p className='flex items-center justify-start cursor-pointer text-slate-700 h-10 w-full 
                                    hover:bg-slate-100 px-2 rounded-lg transition duration-300 ease-in-out' onClick={handleProfile}>
                                        <UserRoundPen size={20} className='mr-2' /> Profile
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="flex items-center justify-start w-full text-slate-700 hover:bg-slate-100 transition duration-300 ease-in-out mt-2"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>Logout</span>
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className='flex flex-col gap-2 mt-2'>
                                <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                                <Link to="/signup"><Button className="w-full bg-[#F83002] hover:bg-[#ac3a20] text-white">Signup</Button></Link>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            ) : (
                <ul className='flex items-center gap-5 font-bold'>
                    {user && user.role === "recruiter" ? <Button variant="outline" onClick={makeJob} >Post Job</Button> : ""}
                    {user && user.role === "recruiter" ? <Button variant="outline" onClick={makeCompany} >Add Company</Button> : ""}
                    <NavItems />
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#F83002] hover:bg-[#ac3a20] rounded-xl text-white">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src={user.profile.profile} />
                                    <AvatarFallback>{getInitials(user.fullname)}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white border border-gray-200 shadow-lg rounded-xl">
                                <div className="p-4 flex gap-4 space-x-2 items-center uppercase">
                                    <Avatar>
                                        <AvatarImage src={user.profile.profile} />
                                        <AvatarFallback>{getInitials(user.fullname)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold ml-4">{user.fullname}</h4>
                                        <p className="ml-4">
                                            {user.profile.bio?.split(" ").slice(0, 5).join(" ")}...
                                        </p>
                                    </div>
                                </div>
                                <div className="py-3 flex flex-row">
                                    <p className='flex items-center justify-start cursor-pointer text-slate-700 h-10 w-full 
                                    hover:bg-slate-100 pl-3 rounded-lg transition duration-300 ease-in-out mr-4' onClick={handleProfile}>
                                        <UserRoundPen size={20} className='mr-3' /> Profile
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="flex items-center space-x-2 text-slate-700 hover:bg-slate-100 transition duration-300 ease-in-out"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </ul>
            )}
            {open&& <JobForm setOpen={setOpen} />}
            {createCompany && <CompanyForm setCreateCompany={setCreateCompany} />}





        </div>
    );
};

export default Navbar;