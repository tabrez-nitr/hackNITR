"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submit logic here
    const dataToSend = new FormData();
    dataToSend.append("username", formData.username);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    if (imageFile) dataToSend.append("profileImage", imageFile);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/user';
  
    try{
    const response = await fetch(`${apiUrl}/register`,{
      method: "POST",
      body: dataToSend,
    })

    if(response.ok){
      const result = await response.json();
      console.log("Signup successful:", result);
      // Optionally, redirect the user or show a success message
    }

  }catch(error)
  {
    console.log("Error during form submission:", error);
  }
    console.log("Form Submitted");
    console.log(formData);
  };

  return (
    // 1. BACKGROUND: Radial gradient "Spotlight" effect
    <div className="min-h-screen flex items-center justify-center bg-[#050505] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Optional: Background ambient glow circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-zinc-800/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* 2. CARD: Glassmorphism (blur) + Subtle border */}
      <div className="max-w-md w-full space-y-8 bg-zinc-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Create account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Start your real-time tracking journey today.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Profile Picture Upload - Refined */}
          <div className="flex flex-col items-center justify-center group">
            <label 
              htmlFor="profile-upload" 
              className="relative cursor-pointer w-24 h-24 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/50 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center justify-center"
            >
              {previewUrl ? (
                <Image 
                  src={previewUrl} 
                  alt="Profile preview" 
                  fill 
                  className="object-cover transition-opacity duration-300 group-hover:opacity-75"
                />
              ) : (
                <div className="text-zinc-500 group-hover:text-white transition-colors duration-300">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
              
              {/* Overlay text on hover */}
              {previewUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-white drop-shadow-md">Change</span>
                </div>
              )}

              <input
                id="profile-upload"
                name="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <p className="text-xs text-zinc-500 mt-3 font-medium tracking-wide">UPLOAD PHOTO</p>
          </div>

          {/* Form Fields with Icons */}
          <div className="space-y-4">
            
            {/* Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg placeholder-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all duration-200 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg placeholder-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all duration-200 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-zinc-500 group-focus-within:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg placeholder-zinc-600 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all duration-200 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Create Account
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-zinc-500">Already have an account? </span>
            <Link href="/signin" className="font-semibold text-white hover:text-zinc-300 transition-colors">
              Sign in &rarr;
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}