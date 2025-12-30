import React from 'react';
import { Helmet } from 'react-helmet';

import SidebarNav from '@/pages/SidebarNav';
import ProfileCard from '@/components/ProfileCard';

import GetVerified from '@/pages/GetVerified';
import GetCertified from '@/pages/GetCertified';
import LearnMore from '@/pages/LearnMore';
const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gig Worker Portal | Government of India</title>
      </Helmet>

      <div className="flex min-h-screen gradient-hero">
        {/* LEFT SIDEBAR */}
        <SidebarNav />

        {/* MAIN CONTENT */}
        <main className="ml-64 flex-1 px-8 py-10 space-y-20">
          
          {/* PROFILE SECTION */}
          <section id="profile" className="space-y-6 w-full">
            <h1 className="text-2xl font-bold">Welcome to the Portal</h1>
            <ProfileCard />
          </section>

          {/* GET VERIFIED SECTION */}
          <section id="verified" className="scroll-mt-20 w-full">
            <GetVerified />
          </section>

          {/* GET CERTIFIED SECTION */}
          <section id="certified" className="scroll-mt-20 w-full">
            <GetCertified />
          </section>

          {/* LEARN MORE SECTION */}
          <section id="learn" className="bg-card rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold mb-3">Benefits</h2>
            <LearnMore/>
          </section>

        </main>
      </div>
    </>
  );
};

export default Index;
