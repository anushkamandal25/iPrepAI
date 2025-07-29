import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Landingpage from './pages/Landingpage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
// import User from '../../../backend/models/User';
import UserProvider from './context/usercontext';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        
        <Routes>
          <Route path="/" element={<Landingpage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </Router>
      <Toaster
      toastOptions={{
        className: '',
        style: {
          fontSize: '13px',
      }}}
      />
    </div>
    </UserProvider>
  )
}

export default App