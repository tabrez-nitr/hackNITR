// app/page.js
"use client";

import dynamic from "next/dynamic";


// IMPORT THE MAP DYNAMICALLY
// This tells Next.js: "Don't try to render this on the server"
const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading Map...</p> // Optional loading text
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Live Logistics Tracker</h1>
      </div>

      {/* Map Container */}
      <div className="w-[50vw] h-125 border-2 border-black rounded-xl overflow-hidden">
        <Map />
      </div>
    </main>
  );
}