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

          {/* Quick Nav Anchors */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-emerald-100">
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              About QCF
            </button>
            <button 
              onClick={() => scrollToSection('phases')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Phases & Recognition
            </button>
            <button 
              onClick={() => scrollToSection('principles')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Guiding Principles
            </button>
            <button 
              onClick={() => scrollToSection('audience')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Who It's For
            </button>
            <button 
              onClick={() => scrollToSection('inclusivity')} 
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Inclusivity
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A14] font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <School className="w-3.5 h-3.5" />
              <span>School Workspace</span>
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

      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative bg-linear-to-b from-[#122E24] via-[#16362B] to-[#0A1A14] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge: Welcome to QCF */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-widest shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Welcome to QCF</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-[1.15]">
            The only Quality Assurance Recognition for Future Readiness and Academic Guidance in the gulf region.
          </h1>

          {/* Region Sub-Descriptor */}
          <p className="text-emerald-100/90 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Built specifically for its unique economic landscape, diverse education and employment ecosystem.
          </p>

          {/* 3 Pillar Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 shadow-lg text-xs sm:text-sm font-extrabold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Credible Source of Truth</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 shadow-lg text-xs sm:text-sm font-extrabold text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Evidenced-backed Strategies</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 shadow-lg text-xs sm:text-sm font-extrabold text-emerald-200">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Globally Proven Framework</span>
            </div>
          </div>

          {/* Purpose Proposition Banner */}
          <div className="pt-4 max-w-3xl mx-auto">
            <p className="text-emerald-200 text-sm sm:text-lg font-bold leading-snug border-l-4 border-emerald-500 pl-4 py-1 text-left bg-emerald-950/40 rounded-r-xl">
              Supporting Institutions Build Strong Career and Academic Guidance Provisions, Ensuring Students’ Future Success and Employability.
            </p>
          </div>

          {/* CTA Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')}
              className="w-full sm:w-auto px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0A1A14] font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Access School Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenAuth ? onOpenAuth('school', 'signup') : onSelectRole('school')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white border border-emerald-400/40 font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Your School</span>
              <ChevronRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── ABOUT QCF & CORE MISSION ─────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block">
              Institutional Framework
            </span>
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
                  Through performing a self-evaluation and achieving the QCF recognition, schools demonstrate their commitment to embedding Future Readiness and Academic Guidance at the core of education. From curriculum and lesson planning to faculty development and community engagement…
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
                  Becoming a QCF partner school connects your school to a national and international network of career readiness and future planning experts, partnering to ensure quality assured future-ready provisions. The QCF excels beyond the credential. It drives sustainable improvement, builds staff confidence, and reassures stakeholders that your education approach is robust, evidence-based, and future-ready.
                </p>
              </div>
            </div>

          </div>

          {/* Banner: Global Movement Callout */}
          <div className="mt-12 bg-linear-to-r from-[#16362B] to-[#2C6450] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-400 text-emerald-950 rounded-full inline-block">
                Global Network
              </span>
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

      {/* ─── PHASES & RECOGNITION ──────────────────────────────────────── */}
      <section id="phases" className="py-16 sm:py-24 bg-[#F4F8F5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block">
              Progressive Recognition
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 font-heading">
              QCF Phases & Recognition
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              A transparent, 3-phase journey that celebrates institutional commitment from initial self-reflection to verified distinguished excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Phase 1 */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
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
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-md relative overflow-hidden flex flex-col justify-between ring-4 ring-emerald-500/10">
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
                    (QCF School of Excellence / Distinction / Distinguished)
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

      {/* ─── GUIDING PRINCIPLES ────────────────────────────────────────── */}
      <section id="principles" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block">
              Foundational Values
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 font-heading">
              The QCF Guiding Principles
            </h2>
            <p className="text-sm sm:text-lg font-bold text-emerald-800">
              Championing Future Readiness. Elevating Educational Excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Principle 1 */}
            <div className="p-8 rounded-3xl bg-[#F8FAF9] border border-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                  <Target className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading">
                  Championing Future Readiness
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-1">
                Position future readiness as a fundamental pillar of formal education, ensuring that preparing students for life beyond the classroom is central to the educational experience.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-8 rounded-3xl bg-[#F8FAF9] border border-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                  <TrendingUp className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading">
                  Elevating Institutional Commitment
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-1">
                Inspire schools to prioritize, invest in, and demonstrate a sustained commitment to preparing students for the opportunities, challenges, and demands of the future.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-8 rounded-3xl bg-[#F8FAF9] border border-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                  <GraduationCap className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading">
                  Empowering Student Potential
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-1">
                Equip every student with the self-awareness, knowledge, skills, and confidence to make informed decisions, navigate evolving career pathways, and thrive in an ever-changing world.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="p-8 rounded-3xl bg-[#F8FAF9] border border-emerald-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900">
                  <Users className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 font-heading">
                  Strengthening Educational Communities
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-1">
                Empower school leaders, educators, and wider school communities with the knowledge, capabilities, and strategic direction to respond effectively to technological advancement, workforce transformation, and the evolving global economic landscape.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── WHO IS QCF RECOGNITION FOR? ───────────────────────────────── */}
      <section id="audience" className="py-16 sm:py-24 bg-[#F4F8F5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full inline-block">
              Target Institutions
            </span>
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

      {/* ─── COMMITMENT TO INCLUSIVITY ─────────────────────────────────── */}
      <section id="inclusivity" className="py-16 sm:py-24 bg-white border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-linear-to-br from-[#122E24] via-[#16362B] to-[#0A1A14] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-emerald-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6 text-left">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3.5 py-1.5 rounded-full inline-block">
                Core Philosophy
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading">
                Our Commitment to Inclusivity
              </h2>

              <div className="text-lg sm:text-2xl font-black text-emerald-400 font-heading">
                QCF recognizes progress as well as excellence.
              </div>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                We believe future readiness is a continuous journey, not a fixed destination. Schools do not need to have perfected their practices to begin. What matters is their willingness to reflect, commit, improve, and demonstrate meaningful impact on student outcomes.
              </p>

              <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed border-l-2 border-emerald-400 pl-4 py-1">
                This philosophy allows QCF to recognize institutions at different stages of development while maintaining rigorous, transparent, and evidence-based standards.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenAuth ? onOpenAuth('school', 'signin') : onSelectRole('school')}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <School className="w-4 h-4" />
                  <span>Start Self-Evaluation in School Workspace</span>
                </button>
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
              <button onClick={() => scrollToSection('phases')} className="hover:text-white transition-colors cursor-pointer">Phases</button>
              <button onClick={() => scrollToSection('principles')} className="hover:text-white transition-colors cursor-pointer">Principles</button>
              <button onClick={() => scrollToSection('audience')} className="hover:text-white transition-colors cursor-pointer">Audience</button>
              <button onClick={() => scrollToSection('inclusivity')} className="hover:text-white transition-colors cursor-pointer">Inclusivity</button>
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
