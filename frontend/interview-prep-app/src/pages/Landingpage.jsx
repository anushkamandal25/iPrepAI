import React, { useState } from 'react'


import HERO_IMG from '../assets/hero-img.png';
import {APP_FEATURES} from "../utils/data";
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Modal from "../components/Modal"
import { ProfileInfoCard } from '../components/Cards/ProfileInfoCard';

import { useContext } from 'react';
import { UserContext } from '../context/usercontext';



const Landingpage = () => {
  const { user }= useContext(UserContext);
  const navigate= useNavigate();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('login');
 
  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
      
    }
    else{
      navigate("/dashboard");
    }
  };


  return (
    <>
    <div className="w-full min-h-full bg-[#FDF7FF]">
  <div className="w-[500px] h-[500px] bg-pink-300/20 blur-[65px] absolute top-0 left-0" />

  <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
    {/* Hero Section */}
    <header className="flex justify-between items-center mb-16">
      <div className="text-xl text-gray-900 font-bold">
        AI Interview Prep
      </div>
      {user ? (
        <ProfileInfoCard />
      ) : (
        <button
          className="bg-gradient-to-r from-pink-500 to-violet-500 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:from-violet-600 hover:to-pink-600 border border-white transition-colors cursor-pointer"
          onClick={() => setOpenAuthModal(true)}
        >
          Login / Sign Up
        </button>
      )}
    </header>

    {/* Hero Content */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
        <div className="flex items-center justify-left mb-2">
          <div className="flex items-center gap-2 text-[13px] text-pink-700 font-semibold bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            <LuSparkles /> AI Powered
          </div>
        </div>

        <h1 className="text-5xl text-gray-900 font-medium mb-6 leading-tight">
          Ace Your Interviews with <br />
          <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#D946EF_0%,_#9333EA_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
            AI Powered
          </span>{" "}
          Learning
        </h1>
      </div>

      <div className="w-full md:w-1/2 ">
        <p className="text-[17px] text-gray-700 mr-0 md:mr-20 mb-6">
          Get role-specific interview questions, expand answers when you need
          more context, and organize everything your way. From preparation to
          mastery — your ultimate tool for interview success.
        </p>

        <button
          className="bg-violet-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-pink-200 hover:text-violet-900 border border-pink-200 transition-colors cursor-pointer"
          onClick={handleCTA}
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</div>

<div className="w-full min-h-full relative z-10">
  <div>
    <section className="flex items-center justify-center -mt-36">
      <img src={HERO_IMG} alt="Hero Image" className="w-[80vw] rounded-lg" />
    </section>
  </div>

  <div className="w-full min-h-full bg-[#FDF7FF] mt-10">
    <div className="container mx-auto px-4 pt-10 pb-20">
      <section className="mt-5">
        <h2 className="text-2xl font-medium text-center mb-12 text-black-900">
          Features That Make You Shine
        </h2>

        <div className="flex flex-col gap-8 items-center">
          {/* First 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FEF9FF] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-violet-100 transition border border-violet-100"
              >
                <h3 className="text-base font-semibold mb-3 text-black-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Remaining 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FEF9FF] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-violet-100 transition border border-violet-100"
              >
                <h3 className="text-base font-semibold mb-3 text-black-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>

  <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
    Made with ❤️ by Anushka Mandal. Copyright © 2025. All rights
    reserved.
  </div>
</div>

<Modal
  isOpen={openAuthModal}
  onClose={() => {
    setOpenAuthModal(false);
    setCurrentPage("login");
  }}
  hideHeader
>
  <div>
    {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
    {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
  </div>
</Modal>


</>
  );
};

export default Landingpage