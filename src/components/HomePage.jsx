import React from 'react';
import QCFLogo from './QCFLogo';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  School, 
  Globe, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users, 
  HeartHandshake, 
  Target, 
  Compass, 
  Layers, 
  CheckCircle, 
  FileCheck2,
  ChevronRight,
  GraduationCap,
  LayoutDashboard
} from 'lucide-react';

export default function HomePage({ onOpenAuth, onSelectRole }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8F5] text-gray-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* ─── STICKY NAVIGATION BAR ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#122E24]/95 backdrop-blur-md border-b border-emerald-800/60 shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <QCFLogo className="w-12 h-12" size="large" variant="light" />

          {/* Quick Nav Anchors (matching section order) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-emerald-100">
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('audience')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Audience
            </button>
            <button 
              onClick={() => scrollToSection('phases')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Phases
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A14] font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <School className="w-3.5 h-3.5" />
              <span>School Portal</span>
            </button>

            <button
              onClick={() => onOpenAuth ? onOpenAuth('partner', 'signin') : onSelectRole('inspector')}
              className="px-3.5 py-2 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/80 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">QCF Partners</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#071711] text-white py-16 sm:py-24 lg:py-28">
        {/* Full-width Background Photo of Students */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-students.jpg"
            alt="Students presenting future-ready career solutions"
            className="w-full h-full object-cover object-right md:object-[center_25%] lg:object-center brightness-[1.02]"
          />
          {/* Focused Left Scrim: Covers left 35-45% for crisp text contrast, leaving the right 55-60%+ of the photo completely clear & vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06140E]/95 via-[#071912]/80 via-35% md:via-42% to-transparent to-65%"></div>
          {/* Subtle Bottom Vignette */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#06140E]/90 to-transparent"></div>
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl lg:max-w-[580px] space-y-6 text-left">
            
            {/* Main Headline across two lines */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-[1.12] drop-shadow-md">
              Future-ready Schools.<br />
              Future Ready Students.
            </h1>

            {/* Sub-descriptor in smaller text */}
            <p className="text-emerald-100/90 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-lg drop-shadow-sm">
              The only Quality Assurance Recognition for Future Readiness and Academic Guidance.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A14] font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Access School Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenAuth ? onOpenAuth('school', 'signup') : onSelectRole('school')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-emerald-400/50 font-bold text-sm rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Your School</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ─── ABOUT QCF & CORE MISSION ─────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 font-heading">
              Why the Quality Career Framework Exists
            </h2>
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              The Quality Career Framework (QCF) exists to help schools develop future-focused learning environments that empower students with the support and guidance needed to pursue and excel in a fulfilling and impactful career.
            </p>
          </div>

          {/* Three Narrative Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Self-Evaluation & Recognition */}
            <div className="bg-[#F8FAF9] p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
                  <FileCheck2 className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">
                  Commitment at the Core
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Through performing a self-evaluation and achieving the QCF recognition, schools demonstrate their commitment to embedding Future Readiness and Academic Guidance at the core of education.
                </p>
              </div>
            </div>

            {/* Card 2: Practical Pathway for School Leaders */}
            <div className="bg-[#F8FAF9] p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
                  <Compass className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">
                  Clear Pathway for Leaders
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  For school leaders, the QCF offers both recognition and a practical framework for guiding students on the pathway of career exploring and academic guidance. QCF provides a clear pathway to assess, improve and recognize quality Future Readiness in your school.
                </p>
              </div>
            </div>

            {/* Card 3: Global Movement & Sustainable Improvement */}
            <div className="bg-[#F8FAF9] p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-heading">
                  Beyond the Credential
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Becoming a QCF partner school connects your school to a national and international network of career readiness and future planning experts. It drives sustainable improvement, builds staff confidence, and reassures stakeholders that your education approach is robust, evidence-based, and future-ready.
                </p>
              </div>
            </div>

          </div>

          {/* Banner: Global Movement Callout */}
          <div className="mt-12 bg-linear-to-r from-[#16362B] to-[#2C6450] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <p className="text-sm sm:text-base font-bold text-emerald-100 max-w-3xl">
                By launching the QCF journey at your school, you join a global movement of schools recentering education to focus on real impact. Committing to the future readiness of its students.
              </p>
            </div>

            <button
              onClick={() => onOpenAuth ? onOpenAuth('school', 'signup') : onSelectRole('school')}
              className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Begin Your School Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── WHO IS QCF RECOGNITION FOR? (Moved below Why the QCF Exists) ─── */}
      <section id="audience" className="py-16 sm:py-24 bg-[#F4F8F5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 font-heading">
              Who Is QCF Recognition For?
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
              QCF Recognition is designed for forward-thinking schools and educational institutions committed to embedding future readiness into their educational culture, strategic priorities, and student learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <School className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                All School Structures
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Public, Private and international schools and learning institutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <BookOpen className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                Diverse Curricula
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Schools offering a recognized international or national curricula.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Sparkles className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                New & Established Institutions
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                New and established schools seeking to strengthen or validate their future-readiness provision.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── PHASES & RECOGNITION ──────────────────────────────────────── */}
      <section id="phases" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 font-heading">
              QCF Phases & Recognition
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              An evidence-based, 3-phase journey that celebrates institutional commitment from initial self-reflection to verified distinguished excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Phase 1 */}
            <div className="bg-[#F8FAF9] rounded-3xl p-8 border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Phase 1
                  </span>
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-black text-gray-900 font-heading">
                    Self-Evaluation & Verification
                  </h3>
                  <div className="text-xs font-extrabold text-emerald-800 mt-1">
                    (QCF Member Schools)
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                  Recognizes schools demonstrating awareness of future-readiness priorities, institutional self-reflection, and a clear interest in developing their provision.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Foundational Self-Evaluation Stage</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#F8FAF9] rounded-3xl p-8 border-2 border-emerald-500 shadow-md relative overflow-hidden flex flex-col justify-between ring-4 ring-emerald-500/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white bg-emerald-700 px-3 py-1 rounded-full">
                    Phase 2
                  </span>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-black text-gray-900 font-heading">
                    Strengthening & Commitment
                  </h3>
                  <div className="text-xs font-extrabold text-emerald-800 mt-1">
                    (QCF Champion School)
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                  Recognizes schools demonstrating tangible commitment through strategic planning, dedicated resources, leadership ownership, and investment in future-readiness initiatives.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Active Institutional Transformation</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#16362B] text-white rounded-3xl p-8 border border-emerald-700 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-950 bg-emerald-400 font-black px-3 py-1 rounded-full">
                    Phase 3
                  </span>
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-black text-white font-heading">
                    Excellence Consistently Evidenced
                  </h3>
                  <div className="text-xs font-extrabold text-emerald-300 mt-1">
                    (QCF School of Excellence)
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed pt-2">
                  Recognizes schools consistently demonstrating exceptional, measurable, and independently verified outcomes in future-readiness education.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-800 flex items-center gap-2 text-[11px] font-bold text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Benchmark Distinction Recognition</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A1A14] text-emerald-200 border-t border-emerald-900/60 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-emerald-900/80">
            <QCFLogo className="w-14 h-14" size="large" variant="light" />

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-300 font-bold">
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
              <button onClick={() => scrollToSection('audience')} className="hover:text-white transition-colors cursor-pointer">Audience</button>
              <button onClick={() => scrollToSection('phases')} className="hover:text-white transition-colors cursor-pointer">Phases</button>
              <button onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')} className="text-emerald-400 hover:text-emerald-300 font-extrabold cursor-pointer">School Portal</button>
              <button onClick={() => onOpenAuth ? onOpenAuth('partner', 'signin') : onSelectRole('inspector')} className="text-emerald-400 hover:text-emerald-300 font-extrabold cursor-pointer">QCF Partners</button>
              <button onClick={() => onOpenAuth ? onOpenAuth('admin', 'signin') : onSelectRole('admin')} className="text-purple-300 hover:text-purple-200 font-extrabold cursor-pointer bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800/80">Admin Login</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-emerald-400/80 font-medium">
            <div>
              Quality Careers Framework (QCF) • Academic Guidance & Career Readiness Schools’ Self-Evaluation © 2026
            </div>
            <div>
              The Gulf Region Future Readiness Recognition Standard
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
