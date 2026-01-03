"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Submitted", formData);
    
    // Simulate login success
    // router.push("/dashboard"); 
  };

  return (
    // 1. BACKGROUND: Same Spotight Gradient as Signup
    <div className="min-h-screen flex items-center justify-center bg-[#050505] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#050505] to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient glow circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-zinc-800/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      {/* 2. CARD: Glassmorphism */}
      <div className="max-w-md w-full space-y-8 bg-zinc-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          <div className="space-y-4">
            
         

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

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="#" className="font-medium text-zinc-400 hover:text-white transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Sign In
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-zinc-500">Don't have an account? </span>
            <Link href="/signup" className="font-semibold text-white hover:text-zinc-300 transition-colors">
              Create one &rarr;
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}