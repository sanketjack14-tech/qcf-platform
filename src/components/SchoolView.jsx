import React, { useState } from 'react';
import { 
  Crown, BookOpen, Users, Sparkles, TrendingUp, ChevronRight, ChevronLeft, 
  CheckCircle2, Plus, Info, FileCheck, Mic, Video, Image as ImageIcon, 
  FileText, Globe, MessageSquare, AlertCircle, Save, Send 
} from 'lucide-react';
import { QCF_DOMAINS, RATING_SCALE, QCF_STATEMENTS } from '../data/qcfData';

export default function SchoolView({ 
  school, 
  userRatings, 
  setUserRatings, 
  evidenceList, 
  openEvidenceModal,
  onSubmitSEF 
}) {
  const [activeDomainId, setActiveDomainId] = useState(1);
  const [expandedGuidance, setExpandedGuidance] = useState({});

  const domainIcons = {
    1: Crown,
    2: BookOpen,
    3: Users,
    4: Sparkles,
    5: TrendingUp
  };

  const currentDomain = QCF_DOMAINS.find(d => d.id === activeDomainId);
  const domainStatements = QCF_STATEMENTS.filter(s => s.domainNumber === activeDomainId);

  // Calculate completion statistics
  const totalStatementsCount = QCF_STATEMENTS.length;
  const ratedCount = Object.keys(userRatings).length;
  const overallProgress = Math.round((ratedCount / totalStatementsCount) * 100);

  const toggleGuidance = (stmtId) => {
    setExpandedGuidance(prev => ({
      ...prev,
      [stmtId]: !prev[stmtId]
    }));
  };

  const handleRatingSelect = (statementId, level) => {
    setUserRatings(prev => ({
      ...prev,
      [statementId]: level
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* School Information Banner & Overall SEF Progress */}
      <div className="bg-[#16362B] text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-700/80 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Dubai School SEF Submission
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-semibold">
                Status: {school.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-heading">
              {school.name}
            </h1>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Curriculum: <span className="font-semibold text-white">{school.curriculum}</span> • KHDA Rating: <span className="font-semibold text-white">{school.khdaRating}</span> • District: <span className="text-white">{school.district}</span>
            </p>
          </div>

          {/* Progress Circle & Submit */}
          <div className="flex items-center gap-6 bg-emerald-950/80 border border-emerald-800/80 p-4 rounded-2xl shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400 font-heading">{overallProgress}%</div>
              <div className="text-[10px] text-emerald-200 font-medium uppercase tracking-wider">SEF Completed</div>
            </div>
            <div className="h-10 w-px bg-emerald-800"></div>
            <div className="text-xs text-emerald-100">
              <div className="font-bold text-white">{ratedCount} / {totalStatementsCount} Standards</div>
              <div className="text-[11px] text-emerald-300 mt-0.5">{evidenceList.length} Evidence Uploads</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-800/60">
          <div className="flex justify-between text-xs text-emerald-200 mb-2 font-medium">
            <span>Quality Careers Framework Evaluation Completion</span>
            <span>{ratedCount} of {totalStatementsCount} evaluated</span>
          </div>
          <div className="w-full h-3 bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-800/50">
            <div
              className="h-full bg-linear-to-r from-emerald-500 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stepwise 5-Domain Navigation Pills */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {QCF_DOMAINS.map(domain => {
            const Icon = domainIcons[domain.id];
            const isActive = activeDomainId === domain.id;
            
            // Calculate domain completion
            const stmts = QCF_STATEMENTS.filter(s => s.domainNumber === domain.id);
            const domainRated = stmts.filter(s => userRatings[s.id]).length;
            const domainPercent = Math.round((domainRated / stmts.length) * 100);

            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id)}
                className={`p-3.5 rounded-xl text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#16362B] text-white shadow-md ring-2 ring-emerald-600'
                    : 'bg-emerald-50/50 text-emerald-950 hover:bg-emerald-100/80 border border-emerald-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-700/60 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    domainPercent === 100 
                      ? (isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-200 text-emerald-900')
                      : (isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-200 text-gray-700')
                  }`}>
                    {domainPercent}%
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-[10px] font-bold opacity-75 uppercase tracking-wider">
                    {domain.code} • Step {domain.id}
                  </div>
                  <div className="text-xs font-bold leading-tight mt-0.5 line-clamp-1">
                    {domain.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Domain Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <span>Domain {currentDomain.id} of 5</span>
            <span>•</span>
            <span>{domainStatements.length} Core Standards</span>
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1 font-heading">
            {currentDomain.title}
          </h2>
          <p className="text-xs text-gray-600 mt-1 max-w-3xl">
            {currentDomain.subtitle}
          </p>
        </div>
      </div>

      {/* Domain Statements Form List */}
      <div className="space-y-6">
        {domainStatements.map((stmt, idx) => {
          const currentRating = userRatings[stmt.id];
          const stmtEvidences = evidenceList.filter(e => e.statementId === stmt.id);
          const isGuidanceOpen = expandedGuidance[stmt.id];

          return (
            <div
              key={stmt.id}
              className={`bg-white rounded-2xl border transition-all shadow-xs ${
                currentRating 
                  ? 'border-emerald-200 ring-1 ring-emerald-500/20' 
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#16362B] text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shrink-0 mt-0.5">
                      Standard {stmt.code}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {stmt.statement}
                      </h3>
                      <button
                        onClick={() => toggleGuidance(stmt.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 mt-1.5 transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>{isGuidanceOpen ? 'Hide KHDA Guidance & Rubric' : 'View KHDA Evaluation Rubric'}</span>
                      </button>
                    </div>
                  </div>

                  {currentRating && (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Self-Evaluated
                    </span>
                  )}
                </div>

                {/* KHDA Guidance Dropdown Box */}
                {isGuidanceOpen && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-2 animate-in fade-in duration-150">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-emerald-700" />
                      <span>Self-Evaluation Guidance Questions (QCF Spec):</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-emerald-900 pl-1 text-[11.5px]">
                      <li>What are we doing regarding this standard and how are we doing it?</li>
                      <li>Is the current approach successful and what makes it so?</li>
                      <li>How would improving this approach better careers guidance for students and parents?</li>
                      <li><strong>Central Question:</strong> How is success evidenced in documentation or visit?</li>
                    </ul>
                  </div>
                )}

                {/* 5-Level Rating Selector matching Glide App prototype */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                    School Self-Evaluation Rating Level <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {RATING_SCALE.map(r => {
                      const isSelected = currentRating === r.level;
                      return (
                        <button
                          key={r.level}
                          type="button"
                          onClick={() => handleRatingSelect(stmt.id, r.level)}
                          className={`p-3 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#2C6450] text-white border-[#16362B] shadow-sm ring-2 ring-emerald-500/40 font-bold'
                              : 'bg-gray-50/60 hover:bg-emerald-50/60 text-gray-700 border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold ${
                              isSelected ? 'bg-emerald-900 text-white' : 'bg-gray-200 text-gray-800'
                            }`}>
                              Level {r.level}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                          </div>
                          <div className="text-[11px] leading-tight line-clamp-3">
                            {r.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evidence Section */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Evidence Attached:
                    </span>

                    {stmtEvidences.length === 0 ? (
                      <span className="text-xs text-gray-400 italic">No evidence uploaded yet</span>
                    ) : (
                      stmtEvidences.map(ev => (
                        <span
                          key={ev.id}
                          className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium"
                        >
                          {ev.type === 'audio' && <Mic className="w-3.5 h-3.5 text-purple-600" />}
                          {ev.type === 'video' && <Video className="w-3.5 h-3.5 text-blue-600" />}
                          {ev.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />}
                          {ev.type === 'file' && <FileText className="w-3.5 h-3.5 text-red-600" />}
                          {ev.type === 'link' && <Globe className="w-3.5 h-3.5 text-teal-600" />}
                          {ev.type === 'text' && <MessageSquare className="w-3.5 h-3.5 text-amber-600" />}
                          <span className="max-w-[120px] truncate">{ev.title}</span>
                        </span>
                      ))
                    )}
                  </div>

                  <button
                    onClick={() => openEvidenceModal(stmt)}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4 text-emerald-700" />
                    <span>Attach Evidence (Audio/Video/Doc)</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Step Control Actions */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-emerald-100 shadow-xl flex items-center justify-between gap-4">
        <button
          disabled={activeDomainId === 1}
          onClick={() => setActiveDomainId(prev => Math.max(1, prev - 1))}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Domain
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Draft saved successfully!")}
            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> Save Progress Draft
          </button>

          {activeDomainId < 5 ? (
            <button
              onClick={() => setActiveDomainId(prev => Math.min(5, prev + 1))}
              className="px-6 py-2.5 bg-[#16362B] hover:bg-[#2C6450] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>Next Domain</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSubmitSEF}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-md animate-pulse"
            >
              <Send className="w-4 h-4" />
              <span>Submit SEF to Inspector</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
