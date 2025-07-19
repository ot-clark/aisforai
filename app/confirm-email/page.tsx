'use client';

import { EmailConfirmation } from '@/components/auth/email-confirmation';
import { useState, useEffect } from 'react';

// Force dynamic rendering to avoid prerendering issues with authentication
export const dynamic = 'force-dynamic';

export default function ConfirmEmailPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Logo/Header */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20">
          <div className="flex items-center">
            {/* Symbol part: always visible */}
            <img src="/logo-affiliate.png" alt="A is for Affiliate" className="h-10 w-auto mr-2 select-none" style={{objectFit: 'contain', maxWidth: 48}} />
            {/* Text part: hide on scroll */}
            <span className={`font-bold text-2xl font-['Montserrat'] transition-all duration-500 origin-left ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} text-gray-900`}>is for Affiliate</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Montserrat']">
            VERIFY YOUR EMAIL
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-['Montserrat'] bg-gradient-to-br from-rose-500 to-purple-700 bg-clip-text text-transparent">
            Almost there!
          </h2>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto font-['Montserrat']">
            We&apos;ve sent you a confirmation link to complete your account setup.
          </p>
        </div>

        {/* Email Confirmation Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-md mx-auto">
          <div className="px-8 py-10">
            <EmailConfirmation />
          </div>
        </div>
      </div>
    </div>
  );
} 