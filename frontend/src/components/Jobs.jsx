import React, { useEffect, useState } from 'react'
import Navbar from './ui/shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const forquery = () => {
        setQuery(value);
        setIsSearching(true);
        setPage(1);
    };

    const fetchJobs = async (searchQuery, currentPage) => {
        try {
            setLoading(true);
            const res = await axios.get(`${USER_API_END_POINT}/jobs/search-jobs`, {
                params: { keyword: searchQuery, page: currentPage, pageSize },
                withCredentials: true,
            });
            setJobs(res.data.jobs);
            setTotalJobs(res.data.totalJobs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(isSearching ? query : '', page);
    }, [query, page, isSearching]);

    const handlePreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prev) => (jobs.length < pageSize ? prev : prev + 1));
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-6'>
                <div className='flex gap-5'>
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>
                    <div className='w-4/5'>
                        <div className='flex flex-row gap-4 justify-start'>
                            <Input
                                type='text'
                                placeholder='Search for a job'
                                className="w-80"
                                value={value}
                                onChange={handleChange}
                            />
                            <Button className="hover:bg-slate-100" onClick={forquery}>
                                <Search /> Search
                            </Button>
                        </div>
                        {totalJobs > 0 && (
                            <h1 className='text-start mt-4'>
                                {totalJobs} Jobs found {isSearching ? `for "${query}"` : ''}
                            </h1>
                        )}
                        {loading ? (
                            <div>Loading...</div>
                        ) : jobs.length === 0 ? (
                            <span>Sorry, could not find any jobs</span>
                        ) : (
                            <div className='flex-1 h-[90vh] overflow-x-auto pb-5 mt-6'>
                                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                                    {jobs.map((job, index) => (
                                        <div key={index}>
                                            <Job job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between mt-4">
                            <Button
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <span>Page {page}</span>
                            <Button
                                onClick={handleNextPage}
                                disabled={jobs.length < pageSize}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;