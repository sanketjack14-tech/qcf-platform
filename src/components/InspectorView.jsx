import React, { useState } from 'react';
import { 
  ShieldCheck, School, CheckCircle2, AlertTriangle, FileText, 
  Mic, Video, Image as ImageIcon, Globe, MessageSquare, ExternalLink, 
  Star, Award, Download, Check, RefreshCw 
} from 'lucide-react';
import { QCF_STATEMENTS, QCF_DOMAINS, RATING_SCALE } from '../data/qcfData';

export default function InspectorView({ schools, evidenceList, userRatings }) {
  const [selectedSchoolId, setSelectedSchoolId] = useState('sch-101');
  const [selectedDomainId, setSelectedDomainId] = useState(1);
  const [selectedStmtId, setSelectedStmtId] = useState('stmt-1_1');

  // Inspector ratings & notes state
  const [inspectorRatings, setInspectorRatings] = useState({
    'stmt-1_1': 4,
    'stmt-1_2': 4,
    'stmt-1_3': 3,
    'stmt-2_1': 5
  });

  const [inspectorVerdicts, setInspectorVerdicts] = useState({
    'stmt-1_1': 'Approved',
    'stmt-1_2': 'Approved',
    'stmt-1_3': 'Needs Revision'
  });

  const [inspectorNotes, setInspectorNotes] = useState({
    'stmt-1_1': 'Strong evidence of leadership involvement. Voice note from Principal confirmed 4-year strategy.'
  });

  const selectedSchool = schools.find(s => s.id === selectedSchoolId) || schools[0];
  const activeStatement = QCF_STATEMENTS.find(s => s.id === selectedStmtId) || QCF_STATEMENTS[0];
  const statementEvidences = evidenceList.filter(e => e.statementId === activeStatement.id);

  const handleInspectorRating = (stmtId, score) => {
    setInspectorRatings(prev => ({ ...prev, [stmtId]: score }));
  };

  const handleVerdictChange = (stmtId, verdict) => {
    setInspectorVerdicts(prev => ({ ...prev, [stmtId]: verdict }));
  };

  const handleNotesChange = (stmtId, notes) => {
    setInspectorNotes(prev => ({ ...prev, [stmtId]: notes }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Inspector Top Banner */}
      <div className="bg-[#16362B] text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-700/60 rounded-2xl border border-emerald-600/50">
            <ShieldCheck className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                KHDA Quality Careers Auditor
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-heading">
              Inspector Verification Workspace
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Inspector: <span className="font-semibold text-white">Dr. Sarah Al Mansoori</span> • KHDA Quality Assurance Division
            </p>
          </div>
        </div>

        {/* Assigned School Selector Dropdown */}
        <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-2xl w-full md:w-auto">
          <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
            Select Assigned School To Audit:
          </label>
          <select
            value={selectedSchoolId}
            onChange={(e) => setSelectedSchoolId(e.target.value)}
            className="bg-emerald-900 border border-emerald-700 text-white font-bold text-xs rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          >
            {schools.map(s => (
              <option key={s.id} value={s.id}>
                🏫 {s.name} — ({s.completionPercentage}% SEF Done)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Inspection Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Domain & Statement Navigation Tree (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
              1. Filter By Core Domain
            </h3>
            <div className="space-y-1.5">
              {QCF_DOMAINS.map(d => {
                const isActive = selectedDomainId === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDomainId(d.id);
                      const firstStmt = QCF_STATEMENTS.find(s => s.domainNumber === d.id);
                      if (firstStmt) setSelectedStmtId(firstStmt.id);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive 
                        ? 'bg-[#16362B] text-white shadow-xs' 
                        : 'bg-gray-50 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    <span>{d.code} • {d.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {QCF_STATEMENTS.filter(s => s.domainNumber === d.id).length} stds
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Statement List inside domain */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
              2. Domain {selectedDomainId} Standards List
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {QCF_STATEMENTS.filter(s => s.domainNumber === selectedDomainId).map(stmt => {
                const isSelected = selectedStmtId === stmt.id;
                const schoolRating = userRatings[stmt.id] || 3;
                const inspectorRating = inspectorRatings[stmt.id];
                const verdict = inspectorVerdicts[stmt.id];

                return (
                  <button
                    key={stmt.id}
                    onClick={() => setSelectedStmtId(stmt.id)}
                    className={`w-full p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-emerald-950">
                        Std {stmt.code}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                          School: L{schoolRating}
                        </span>
                        {verdict && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            verdict === 'Approved' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {verdict}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 line-clamp-2 leading-tight">
                      {stmt.statement}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Statement Evidence Audit Workspace (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Statement Header Card */}
          <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#16362B] text-white text-xs font-extrabold px-3 py-1 rounded-lg">
                Standard {activeStatement.code} Audit
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">School Self-Rating:</span>
                <span className="bg-blue-600 text-white font-black text-xs px-3 py-1 rounded-full">
                  Level {userRatings[activeStatement.id] || 3} — {RATING_SCALE.find(r => r.level === (userRatings[activeStatement.id] || 3))?.title}
                </span>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-heading">
              {activeStatement.statement}
            </h2>

            {/* Evidence Viewer Panel */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center justify-between">
                <span>School Submitted Evidence ({statementEvidences.length} files)</span>
              </h4>

              {statementEvidences.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>No digital evidence uploaded for this standard by the school. Onsite inspection required.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {statementEvidences.map(ev => (
                    <div key={ev.id} className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-white border border-emerald-200 text-emerald-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          {ev.type === 'audio' && <Mic className="w-3 h-3 text-purple-600" />}
                          {ev.type === 'video' && <Video className="w-3 h-3 text-blue-600" />}
                          {ev.type === 'image' && <ImageIcon className="w-3 h-3 text-emerald-600" />}
                          {ev.type === 'file' && <FileText className="w-3 h-3 text-red-600" />}
                          {ev.type === 'link' && <Globe className="w-3 h-3 text-teal-600" />}
                          <span>{ev.type} Evidence</span>
                        </span>
                        <span className="text-[10px] text-gray-400">{ev.date}</span>
                      </div>

                      <div className="text-xs font-bold text-gray-900">{ev.title}</div>

                      {/* Interactive Audio Player Simulation */}
                      {ev.type === 'audio' && (
                        <div className="bg-white p-3 rounded-lg border border-purple-200 space-y-2">
                          <audio controls className="w-full h-8">
                            <source src={ev.url} type="audio/mp3" />
                            Your browser does not support audio element.
                          </audio>
                          <p className="text-[11px] text-gray-500 italic">"Voice interview note from head of careers"</p>
                        </div>
                      )}

                      {/* Video Player Preview Simulation */}
                      {ev.type === 'video' && (
                        <div className="bg-black rounded-lg overflow-hidden relative group">
                          <video controls className="w-full h-36 object-cover">
                            <source src={ev.url} type="video/mp4" />
                          </video>
                        </div>
                      )}

                      {/* Photo Thumbnail */}
                      {ev.type === 'image' && (
                        <div className="rounded-lg overflow-hidden border border-emerald-200">
                          <img src={ev.url} alt="Evidence photo" className="w-full h-32 object-cover" />
                        </div>
                      )}

                      {/* File / Link Button */}
                      {(ev.type === 'file' || ev.type === 'link') && (
                        <a
                          href={ev.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg hover:bg-emerald-800 transition-colors w-full justify-center"
                        >
                          <span>Preview Attachment</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Inspector Evaluation & Scoring Panel */}
          <div className="bg-[#16362B] text-white rounded-2xl p-6 shadow-md border border-emerald-800 space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2 font-heading">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Inspector Verification & Official Scoring</span>
              </h3>
              <span className="text-xs text-emerald-300 font-semibold">
                KHDA Audit Form
              </span>
            </div>

            {/* Inspector Rating Selection */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                Inspector Validated Rating Level (1 - 5)
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map(lvl => {
                  const active = (inspectorRatings[activeStatement.id] || 4) === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => handleInspectorRating(activeStatement.id, lvl)}
                      className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300'
                          : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Level {lvl}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Verification Verdict Selector */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-2">
                Inspection Verdict Status
              </label>
              <div className="flex flex-wrap gap-3">
                {['Approved', 'Needs Revision', 'Flagged for Onsite Visit'].map(v => {
                  const active = (inspectorVerdicts[activeStatement.id] || 'Approved') === v;
                  return (
                    <button
                      key={v}
                      onClick={() => handleVerdictChange(activeStatement.id, v)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? 'bg-emerald-400 text-emerald-950 shadow-md font-black'
                          : 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800'
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inspector Notes & Recommendations */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                Inspector Findings & Guidance Recommendations
              </label>
              <textarea
                rows={3}
                value={inspectorNotes[activeStatement.id] || ''}
                onChange={(e) => handleNotesChange(activeStatement.id, e.target.value)}
                placeholder="Enter official inspector audit observations, evidence verification notes, or requested revisions..."
                className="w-full text-xs p-3 rounded-xl border border-emerald-700 bg-emerald-950 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              ></textarea>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => alert(`Saved Inspector Evaluation for Standard ${activeStatement.code}!`)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4" /> Save Inspector Verification
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
