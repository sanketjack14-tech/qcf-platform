import React, { useState } from 'react';
import QCFLogo from './QCFLogo';
import { 
  School, ShieldCheck, ArrowRight, Mail, KeyRound, User, Building, MapPin, Ticket, CheckCircle2
} from 'lucide-react';
import { QCF_DOMAINS } from '../data/qcfData';

export default function RoleSelectionLanding({ onSelectRole }) {
  // Top Header Mode Toggle: 'school' | 'partner'
  const [activeTab, setActiveTab] = useState('school');

  // School Auth Mode: 'signin' | 'signup'
  const [schoolAuthMode, setSchoolAuthMode] = useState('signin');

  // Sign-In Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Sign-Up Form State (Req: Your name, School name, Location, Institute email Address, Password, Confirm Password, Invitation code)
  const [signUpData, setSignUpData] = useState({
    name: '',
    schoolName: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    invitationCode: ''
  });

  const handleSignUpChange = (field, val) => {
    setSignUpData(prev => ({ ...prev, [field]: val }));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'school') {
      onSelectRole('school');
    } else {
      onSelectRole('inspector');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (signUpData.password && signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match. Please verify your password.');
      return;
    }
    alert(`Account registration request received for ${signUpData.schoolName || 'your school'}! Access activated.`);
    onSelectRole('school');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#122E24] via-[#16362B] to-[#0A1A14] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar with Schools / QCF Team Toggle */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-800/60">
        <QCFLogo className="w-14 h-14" size="large" variant="light" />

        {/* Header Toggle: Schools vs QCF Team */}
        <div className="flex items-center gap-2 bg-emerald-950/90 border border-emerald-800/90 p-1.5 rounded-2xl shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('school')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'school'
                ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 font-black'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <School className="w-4 h-4" />
            <span>For Schools</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'partner'
                ? 'bg-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 font-black'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>For QCF Team</span>
          </button>
        </div>
      </header>

      {/* Main 2-Part Vertical Split Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SECTION (Col 1-7): QCF Logo, Descriptor & Domain Overview */}
          <div className="lg:col-span-7 space-y-6 text-left pr-0 lg:pr-6">
            
            {/* Prominent High-Res Updated QCF Logo */}
            <div className="flex items-center gap-4">
              <img
                src="/qcf_logo.jpg"
                alt="Quality Careers Framework Official Badge"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-contain ring-4 ring-emerald-500/40 shadow-2xl bg-black shrink-0"
              />
              <div className="space-y-1">
                <span className="bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                  Academic & Career Readiness
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-none">
                  Quality Careers Framework
                </h1>
                <p className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-widest">
                  Evaluation Directorate
                </p>
              </div>
            </div>

            {/* QCF Descriptor Subtext */}
            <p className="text-emerald-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl border-l-4 border-emerald-500 pl-4 py-1">
              The school improvement and quality-assurance framework designed to strengthen academic career readiness and future-readiness provision across schools.
            </p>

            {/* Clean 1-Liner Subtext */}
            <p className="text-emerald-200/90 text-xs sm:text-sm font-semibold">
              Sign-in to begin your school's self-evaluations across 5 academic guidance and career readiness domains.
            </p>

            {/* 5 Academic Domains Preview Badges */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">
                Evaluation Domains Framework:
              </div>
              <div className="flex flex-wrap gap-2">
                {QCF_DOMAINS.map(d => (
                  <span key={d.id} className="bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Domain {d.id}: {d.title}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (Col 8-12): Form Box (Sign-In / Sign-Up) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none"></div>

              {/* Form Workspace Header */}
              <div className="space-y-3 mb-6 text-left relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 inline-block">
                    {activeTab === 'school' ? 'School Workspace' : 'QCF Partner Workspace'}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">Secure Portal</span>
                </div>
                
                <h2 className="text-2xl font-black text-gray-900 font-heading">
                  {activeTab === 'school' ? 'School Workspace' : 'QCF Partner Workspace'}
                </h2>

                {/* If activeTab === 'school', render Sign-in / Sign-up Sub-Toggle */}
                {activeTab === 'school' && (
                  <div className="flex bg-gray-100 p-1 rounded-xl gap-1 mt-2">
                    <button
                      type="button"
                      onClick={() => setSchoolAuthMode('signin')}
                      className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        schoolAuthMode === 'signin'
                          ? 'bg-[#16362B] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchoolAuthMode('signup')}
                      className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        schoolAuthMode === 'signup'
                          ? 'bg-[#16362B] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign-Up
                    </button>
                  </div>
                )}
              </div>

              {/* SIGN IN FORM */}
              {(activeTab === 'partner' || schoolAuthMode === 'signin') && (
                <form onSubmit={handleSignInSubmit} className="space-y-4 text-left relative z-10">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={activeTab === 'school' ? 'careers@school.edu' : 'partner@qualitycareersframework.com'}
                        className="w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Agree to Terms Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 text-emerald-700 rounded border-gray-300 focus:ring-emerald-600 cursor-pointer"
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-gray-600 font-medium cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>

                  {/* Submit Action Button */}
                  <button
                    type="submit"
                    disabled={!agreedToTerms}
                    className="w-full py-3.5 bg-[#16362B] hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer mt-2"
                  >
                    <span>Sign-in</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* SIGN UP FORM FOR SCHOOLS */}
              {activeTab === 'school' && schoolAuthMode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-3 text-left relative z-10 max-h-[440px] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={signUpData.name}
                        onChange={(e) => handleSignUpChange('name', e.target.value)}
                        placeholder="Dr. Jane Smith"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                      School Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={signUpData.schoolName}
                        onChange={(e) => handleSignUpChange('schoolName', e.target.value)}
                        placeholder="Dubai International Academy"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={signUpData.location}
                        onChange={(e) => handleSignUpChange('location', e.target.value)}
                        placeholder="Al Barsha 1, Dubai"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                      Institute Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={signUpData.email}
                        onChange={(e) => handleSignUpChange('email', e.target.value)}
                        placeholder="j.smith@school.edu"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                          type="password"
                          required
                          value={signUpData.password}
                          onChange={(e) => handleSignUpChange('password', e.target.value)}
                          placeholder="••••••••"
                          className="w-full text-xs font-semibold pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                          type="password"
                          required
                          value={signUpData.confirmPassword}
                          onChange={(e) => handleSignUpChange('confirmPassword', e.target.value)}
                          placeholder="••••••••"
                          className="w-full text-xs font-semibold pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                      Invitation Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Ticket className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={signUpData.invitationCode}
                        onChange={(e) => handleSignUpChange('invitationCode', e.target.value)}
                        placeholder="e.g. QCF-SCHOOL-2026"
                        className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-gray-50/50 uppercase"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#16362B] hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer mt-3"
                  >
                    <span>Complete School Registration</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Sign Up Contact Link - ONLY shown for Schools tab when in signin mode */}
              {activeTab === 'school' && schoolAuthMode === 'signin' && (
                <div className="mt-6 pt-5 border-t border-gray-100 text-center relative z-10">
                  <p className="text-xs text-gray-600 font-medium">
                    Don't have an account?{' '}
                    <a
                      href="mailto:mail@qualitycareersframework.com"
                      className="text-emerald-800 font-extrabold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Get in touch with us at mail@qualitycareersframework.com</span>
                    </a>
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-emerald-800/60 text-center text-xs text-emerald-300/80">
        Quality Careers Framework (QCF) • Academic & Career Readiness Directorate © 2026
      </footer>

    </div>
  );
}
