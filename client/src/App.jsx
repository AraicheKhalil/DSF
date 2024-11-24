


import './App.css'

import React, { useEffect, useState } from 'react'
import { Route , RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SideBarContext from '@/hooks/context/SideBarContext';
import DashLayout from './components/DashLayout';
import Dashboard from './Pages/Dashboard';
import Tasks from './Pages/Tasks';
import GenAi from './Pages/GenAi';
import ChatDocs from './Pages/ChatDocs';
import SmartDoc from './Pages/SmartDoc';
import Settings from './Pages/Settings';
import CustomView from './Pages/CustomView';
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from './Pages/LandingPage';
import Tools from './Pages/Tools';
import ToolsTypes from './Pages/ToolsType';
import SignOut from './Pages/SignOut';
import Login from './auth/login';
import Register from './auth/register';
import DemoForm from './Pages/DemoForm';
import Playground from './components/LandingPage/Playground/PlayGround';
import PrivacyPolicy from './components/LandingPage/PrivacyPolicy';
import TermsOfService from './components/LandingPage/TermsOfServices';
import FAQ from './components/LandingPage/FAQ';
import GenAiTool from './GenAiTool';
import PrivateRoute from './context/PrivateRoute';
import RequestPasswordReset from './auth/RequestPasswordReset';
import ResetPassword from './auth/ResetPassword';
import PreferenceForm from './Pages/Prefrences';
import LoginPage from './test';
import UserProfilePage from './Pages/Profile';
import WelcomePage from './components/Welcome';
import Prefrences from './Pages/Prefrences';



export default function App() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route index element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/prefrences' element={<Prefrences /> } />
      <Route path='/pro' element={<LoginPage /> } />
      <Route path='/request-password-reset' element={<RequestPasswordReset />} />
      <Route path='/auth/us/reset-password/:token' element={<ResetPassword />} />
      <Route path='welcome' element={<WelcomePage /> } />
      <Route path='/demo-form' element={<DemoForm />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-of-service' element={<TermsOfService />} />
      <Route path='/frequently-asked-questions' element={<FAQ />} />
      
      <Route path='dashboard' element={<PrivateRoute> <DashLayout /> </PrivateRoute>} >
        <Route index element={<Dashboard />} />
        <Route path='smart-doc' element={<SmartDoc />} />
        <Route path='tasks' element={<Tasks/>} />
        <Route path='tools' element={<Tools/>} />
        <Route path='tools/:type'>
          <Route index element={<ToolsTypes />} />
        </Route>
        <Route path='gen_ai' element={<GenAi/>} />
        <Route path='gen_ai/:type'  >
          <Route index element={<GenAiTool />} />
        </Route>
        <Route path='chat-doc' element={<ChatDocs/>} />
        <Route path='settings' element={<UserProfilePage />} />
        {/* <Route path='profile' element={<UserProfilePage />} /> */}
        <Route path='custom-view' element={<CustomView/>} />
        <Route path='sign-out' element={<SignOut/>} />
      </Route>
    </Route>
  ))
  return (
    
      <div className='font-Poppins' >
        <RouterProvider router={router} />
      </div>
     
  )
}















