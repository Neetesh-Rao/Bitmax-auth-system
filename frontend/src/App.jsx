import { useState } from 'react'

import {Toaster} from "react-hot-toast";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Index from './pages/Index';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import SetCredentials from './pages/SetCredentials';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
return(
  
  <BrowserRouter> 
  <Toaster position='top-right' reverseOrder={true}/>
  <Routes>
    <Route path="/" element={<Index/>}/>
        <Route path="/signup" element={<Signup/>}/>
            <Route path="/verify-otp" element={<VerifyOtp/>}/>
                <Route path="/set-credentials" element={<SetCredentials/>}/>
                    <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Dashboard/>
                          </ProtectedRoute>
                          }
                          />
   </Routes>
  </BrowserRouter>
); 
}

export default App
