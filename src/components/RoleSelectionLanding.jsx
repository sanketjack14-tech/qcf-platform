import React from 'react';
import QCFLogo from './QCFLogo';
import { School, ShieldCheck, LayoutDashboard, ArrowRight, Sparkles, CheckCircle2, Award, Users, Lock, Smartphone, X } from 'lucide-react';

export default function RoleSelectionLanding({ onSelectRole }) {
  const [isUAEPassModalOpen, setIsUAEPassModalOpen] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const handleSimulateUAEPass = (role) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsUAEPassModalOpen(false);
      onSelectRole(role);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#16362B] via-[#1A4235] to-[#0F261E] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Logo & UAE PASS Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-emerald-800/60">
        <QCFLogo className="w-14 h-14" size="large" variant="light" />
        
        <div className="flex items-center gap-3">
          {/* UAE PASS Button Header Badge */}
          <button
            onClick={() => setIsUAEPassModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white border border-red-500/50 px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sign in with UAE PASS</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/80 border border-emerald-800 px-4 py-2 rounded-full text-xs text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dubai Education 2033 Standards</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 py-8 sm:py-12">
        <div className="inline-flex items-center gap-2 bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
          <span>Official KHDA Quality Careers System</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
          Quality Careers Framework (QCF)
        </h1>
        
        <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The future-ready career guidance evaluation platform for Dubai schools. Authenticate via UAE PASS or select your workspace portal below.
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

      {/* UAE PASS AUTHENTICATION MODAL */}
      {isUAEPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white text-gray-900 rounded-3xl shadow-2xl border border-red-200 w-full max-w-md overflow-hidden">
            
            {/* UAE PASS Brand Header */}
            <div className="bg-linear-to-r from-red-700 via-red-600 to-red-800 text-white p-5 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3 font-extrabold text-base">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span>UAE PASS Digital Identity</span>
              </div>
              <button
                onClick={() => setIsUAEPassModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-center">
              
              {isAuthenticating ? (
                <div className="py-8 space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    <Smartphone className="w-7 h-7 text-red-600 absolute inset-0 m-auto" />
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 font-heading">
                    Verifying UAE PASS Smartphone App...
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Face ID verification approved. Authenticating Emirates ID payload with KHDA directory...
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-left space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-red-900">
                      <span>Emirates ID Verification</span>
                      <span className="bg-red-200 text-red-900 text-[10px] px-2 py-0.5 rounded-md font-extrabold">Active Session</span>
                    </div>
                    <div className="text-xs text-gray-700">
                      <div>Name: <strong className="text-gray-900">Dr. Sarah Al Mansoori</strong></div>
                      <div>Emirates ID: <strong className="text-gray-900">784-1988-1234567-1</strong></div>
                      <div>User Type: <strong className="text-gray-900">GOV (Government Official)</strong></div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-medium">
                    Simulate UAE PASS Single Sign-On (OIDC) authentication into target portal:
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleSimulateUAEPass('inspector')}
                      className="w-full py-3 bg-[#16362B] hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Authenticate as KHDA Senior Inspector</span>
                    </button>

                    <button
                      onClick={() => handleSimulateUAEPass('school')}
                      className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <School className="w-4 h-4 text-emerald-300" />
                      <span>Authenticate as Dubai School Leader</span>
                    </button>

                    <button
                      onClick={() => handleSimulateUAEPass('admin')}
                      className="w-full py-3 bg-purple-950 hover:bg-purple-900 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-300" />
                      <span>Authenticate as Admin Directorate</span>
                    </button>
                  </div>
                </>
              )}

            </div>

            <div className="bg-gray-50 border-t border-gray-100 p-3 text-center text-[10px] text-gray-500 font-medium flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>OIDC 2.0 Encrypted Endpoint • UAE Digital ID Hub</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
