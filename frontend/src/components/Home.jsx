import React, { useEffect, useState } from 'react'
import Navbar from './ui/shared/Navbar'
import HeroSections from './HeroSections'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { USER_API_END_POINT } from './utils/constant'
import axios from 'axios'
import { setAllLatestJobs } from '@/redux/latestJobSlice'

const Home = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      console.log("Initiating job fetch in Home component...");
      try {
        setLoading(true);
        const res = await axios.get(`${USER_API_END_POINT}/jobs/search-jobs`, { withCredentials: true });
        console.log("API Response: ", res.data);
        if (res.data.success) {
          // Sort jobs by createdAt in descending order
          const sortedJobs = res.data.jobs.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setJobs(sortedJobs);
          dispatch(setAllLatestJobs(sortedJobs));
          console.log("Sorted jobs successfully dispatched to Redux");
        } else {
          console.log("No success in fetching jobs:", res.data.message);
        }
      } catch (error) {
        console.error("Error while fetching jobs:", error);
      } finally {
        setLoading(false);
        console.log("Job fetch and sort completed");
      }
    };
    fetchAllJobs();
  }, [dispatch]);

  console.log("Home component rendered");

  return (
    <div>
      <Navbar />
      <HeroSections />
      <CategoryCarousel />
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <LatestJobs latestjobs={jobs} />
      )}
      <Footer />
    </div>
  )
}

export default Home