import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, UserRoundPen } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sethUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/components/utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user } = useSelector(store => store.auth)//
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlProfile = () => {
        navigate("/profile")
    }
    const logout =async () => {
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
            const firstNameInitial = nameParts[0][0].toUpperCase();
            const lastNameInitial = nameParts[1][0].toUpperCase();

            return firstNameInitial + lastNameInitial;
        } else {
            return nameParts[0][0].toUpperCase();
        }
    };

    return (
        <div className='bg-white flex flex-row justify-between px-3 w-full'>
            <div>
                <h1 className='text-2xl font-bold'>
                    Job<span className='text-[#F83002]'>Portal</span>
                </h1>
            </div>
            <ul className='flex  items-center gap-5 font-bold'>
                <li className='mx-3'><Link to="/" className='hover:text-[#f83006]'>Home</Link></li>
                <li className='mx-3'><Link to="/Jobs" className='hover:text-[#f83006]'>Job</Link></li>
                <li className='mx-3'><Link to="/Browse" className='hover:text-[#f83006]'>Browse</Link></li>
                {!user ? < div className='flex items-center gap-2'>
                    <Link to="/login">  <Button variant="outline">Login</Button></Link>
                    <Link to="/signup"> <Button className="bg-[#F83002] hover:bg-[#ac3a20] rounded-xl text-white" >Signup</Button></Link>
                </div> :
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src={user.profile.profile} />
                                <AvatarFallback>
                                    {getInitials(user.fullname)}
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-white border border-gray-200 shadow-lg rounded-xl">
                            <div className="p-4 flex gap-4 space-x-2 items-center">
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
               hover:bg-slate-100 pl-3 rounded-lg transition duration-300 ease-in-out mr-4' onClick={handlProfile}>
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
}
            </ul>

        </div >
    );
};

export default Navbar;
