import React from 'react';
import QCFLogo from './QCFLogo';
import { School, ShieldCheck, LayoutDashboard, ArrowRight, Sparkles, CheckCircle2, Award, Users } from 'lucide-react';

export default function RoleSelectionLanding({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#16362B] via-[#1A4235] to-[#0F261E] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Logo */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pb-8 border-b border-emerald-800/60">
        <QCFLogo className="w-14 h-14" size="large" variant="light" />
        <div className="hidden sm:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800 px-4 py-1.5 rounded-full text-xs text-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dubai Education 2033 Standards Initiative</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 py-12">
        <span className="bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-xs">
          Official KHDA Evaluation System
        </span>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
          Quality Careers Framework (QCF)
        </h1>
        
        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The future-ready career guidance evaluation platform for Dubai schools. Select your portal to proceed to your dedicated workspace.
        </p>
      </div>

      {/* 3 Portal Selection Cards */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        
        {/* Card 1: School Portal */}
        <div 
          onClick={() => onSelectRole('school')}
          className="bg-white/95 text-gray-900 rounded-3xl p-8 shadow-2xl border border-emerald-100 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl group-hover:bg-emerald-200/60 transition-all"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#16362B] text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <School className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2.5 py-1 rounded-full">
                For Dubai Schools
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-2 font-heading">
                School Evaluation Portal
              </h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Step-by-step self-evaluation across 5 QCF domains. Attach audio voice notes, video clips, photo evidence, and policies.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5-Domain Stepwise Evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-modal evidence uploads</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 relative z-10 flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-500">
              Demo: <span className="text-emerald-900">Dubai International Academy</span>
            </div>
            <button className="px-4 py-2.5 bg-[#16362B] group-hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors shadow-md">
              <span>Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Inspector Portal */}
        <div 
          onClick={() => onSelectRole('inspector')}
          className="bg-white/95 text-gray-900 rounded-3xl p-8 shadow-2xl border border-blue-100 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl group-hover:bg-blue-200/60 transition-all"></div>

          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-blue-300 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-blue-800 uppercase tracking-widest bg-blue-100 px-2.5 py-1 rounded-full">
                For KHDA Inspectors
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-2 font-heading">
                Inspector Verification Portal
              </h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Review submitted school evidence, inspect audio/video testimonials, score standards, and generate printable PDF audit reports.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Evidence verification player</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Downloadable official PDF report</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 relative z-10 flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-500">
              Logged as: <span className="text-blue-900">Dr. Sarah Al Mansoori</span>
            </div>
            <button className="px-4 py-2.5 bg-blue-900 group-hover:bg-blue-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors shadow-md">
              <span>Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 3: Executive Admin Directorate */}
        <div 
          onClick={() => onSelectRole('admin')}
          className="bg-white/95 text-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-100 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl group-hover:bg-purple-200/60 transition-all"></div>

          <div className="space-y-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-purple-950 text-purple-300 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-purple-800 uppercase tracking-widest bg-purple-100 px-2.5 py-1 rounded-full">
                For QCF Governing Board
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-2 font-heading">
                Admin Directorate
              </h2>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Dubai-wide career guidance analytics dashboard, inspector assignment matrix, and full KHDA 42 standards management.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Sector performance analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Manage & edit 42 KHDA standards</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 relative z-10 flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-500">
              Console: <span className="text-purple-900">Executive Admin</span>
            </div>
            <button className="px-4 py-2.5 bg-purple-950 group-hover:bg-purple-900 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-colors shadow-md">
              <span>Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-emerald-800/60 text-center text-xs text-emerald-300/80">
        Quality Careers Framework (QCF) • Beta Edition 2026 © KHDA & QCF Governing Directorate
      </div>

    </div>
  );
}
