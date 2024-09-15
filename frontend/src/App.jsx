
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';

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
    }

  ]);

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
