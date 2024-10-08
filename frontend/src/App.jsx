
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDecription from './components/JobDecription';
function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element:<Home/>
    },
    {
      path: '/login',
      element:<Login/>
    },
    {
      path: '/signup',
      element:<Signup/>
    },
    {
      path: '/jobs',
      element:<Jobs/>
    },
    {
      path: '/jobs/description/:id',
      element:<JobDecription/>
    },
    {
      path: "/browse",
      element:<Browse/>
    },
    {
      path: "/profile",
      element:<Profile/>
    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster/>
    </>
  )
}

export default App
