import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const HeroSections = () => {
    return (
        <div className="bg-gray-50 py-20">
            <div className='text-center max-w-2xl mx-auto'>
                <span className='inline-block px-6 py-3 rounded-full bg-gray-200 text-[#F83002] text-lg md:text-xl'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='mt-6 text-4xl md:text-6xl font-bold leading-tight'>
                    Search, Apply & <br />
                    Get Your <span className='text-[#F83002]'>Dream Jobs</span>
                </h1>
                <p className='mt-6 text-lg text-gray-700 max-w-lg mx-auto'>
                    Discover thousands of job opportunities across industries. Whether you're just starting out or looking for a career change, we are here to help you find your ideal position quickly and easily.
                </p>
                <div className='mt-8 flex justify-center'>
                    <div className="flex items-center max-w-lg w-full">
                        <Input
                            type="text"
                            placeholder="Search for your dream job"
                            className="flex-grow h-12 px-4 py-2 border border-gray-300 focus:border-gray-800 rounded-l-full"
                        />
                        <button className='bg-[#F83002] h-12 w-12 flex items-center justify-center text-white rounded-r-full hover:bg-[#D92D00] transition duration-300'>
                            <Search />
                        </button>
                    </div>
                </div>
                <button className='mt-6 px-8 py-3 rounded-full bg-[#F83002] text-white text-lg font-semibold hover:bg-[#D92D00] transition duration-300'>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default HeroSections
