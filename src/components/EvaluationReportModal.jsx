import React from 'react';
import { X, Printer, Download, ShieldCheck, Award, CheckCircle2, AlertCircle, FileText, Star } from 'lucide-react';
import QCFLogo from './QCFLogo';
import { QCF_DOMAINS, RATING_SCALE } from '../data/qcfData';

export default function EvaluationReportModal({
  isOpen,
  onClose,
  school,
  statements,
  userRatings,
  inspectorRatings,
  inspectorVerdicts,
  inspectorNotes,
  evidenceList
}) {
  if (!isOpen || !school) return null;

  // Filter active/visible statements
  const activeStatements = statements.filter(s => !s.hidden);

  // Calculate overall score
  let totalScore = 0;
  let evaluatedCount = 0;

  activeStatements.forEach(stmt => {
    const score = inspectorRatings[stmt.id] || userRatings[stmt.id] || 3;
    totalScore += score;
    evaluatedCount++;
  });

  const overallAvgScore = (totalScore / (evaluatedCount || 1)).toFixed(2);

  // Determine overall classification
  let performanceGrade = 'Acceptable';
  let gradeBadgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
  if (overallAvgScore >= 4.5) {
    performanceGrade = 'Outstanding / Exemplary';
    gradeBadgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (overallAvgScore >= 3.8) {
    performanceGrade = 'Very Good';
    gradeBadgeColor = 'bg-teal-100 text-teal-900 border-teal-300';
  } else if (overallAvgScore >= 3.0) {
    performanceGrade = 'Good';
    gradeBadgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      schoolName: school.name,
      curriculum: school.curriculum,
      inspectionDate: new Date().toLocaleDateString(),
      inspector: 'Dr. Sarah Al Mansoori',
      overallScore: overallAvgScore,
      performanceGrade,
      statementEvaluations: activeStatements.map(stmt => ({
        code: stmt.code,
        statement: stmt.statement,
        schoolRating: userRatings[stmt.id] || 3,
        inspectorRating: inspectorRatings[stmt.id] || userRatings[stmt.id] || 3,
        verdict: inspectorVerdicts[stmt.id] || 'Approved',
        inspectorNotes: inspectorNotes[stmt.id] || 'Standard verified.'
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QCF_Evaluation_Report_${school.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 print:static print:p-0 print:bg-transparent print:overflow-visible print:block print:h-auto print:max-h-none">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:h-auto print:overflow-visible print:border-none print:shadow-none print:w-full print:max-w-none print:rounded-none">
        
        {/* Modal Header Controls (Hidden on Print) */}
        <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-100">
              Official QCF Inspection Report Generator
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Report</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-emerald-900 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content Body (Printable Area) */}
        <div id="printable-report" className="p-8 md:p-10 overflow-y-auto space-y-8 bg-white text-gray-900 print:p-0 print:overflow-visible print:h-auto print:space-y-6">
          
          {/* Document Header */}
          <div className="flex flex-row items-center justify-between gap-6 pb-6 border-b-2 border-emerald-900 print:pb-4">
            <QCFLogo className="w-16 h-16 shrink-0" size="large" />

            <div className="text-right">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                Knowledge & Human Development Authority (KHDA)
              </div>
              <h1 className="text-2xl font-black text-[#16362B] font-heading mt-1">
                Quality Careers Framework Report
              </h1>
              <div className="text-xs text-gray-500 mt-0.5">
                Official Evaluation & Audit Certificate • Ref ID: <span className="font-bold text-gray-800">QCF-2026-DXB-8842</span>
              </div>
            </div>
          </div>

          {/* School & Audit Metadata Grid */}
          <div className="grid grid-cols-4 gap-4 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 print:p-3 print:rounded-xl">
            <div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Target School</div>
              <div className="text-xs font-black text-gray-900 mt-0.5">{school.name}</div>
              <div className="text-[10px] text-gray-500">{school.district}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Curriculum</div>
              <div className="text-xs font-extrabold text-gray-900 mt-0.5">{school.curriculum}</div>
              <div className="text-[10px] text-gray-500">KHDA: {school.khdaRating}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Lead Inspector</div>
              <div className="text-xs font-extrabold text-gray-900 mt-0.5">Dr. Sarah Al Mansoori</div>
              <div className="text-[10px] text-gray-500">Senior KHDA Auditor</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Audit Date</div>
              <div className="text-xs font-extrabold text-gray-900 mt-0.5">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div className="text-[10px] text-emerald-700 font-bold">Verified & Signed</div>
            </div>
          </div>

          {/* Score & Rating Executive Summary */}
          <div className="bg-[#16362B] text-white rounded-2xl p-6 shadow-md border border-emerald-800 flex flex-row items-center justify-between gap-6 print:p-4 print:rounded-xl print:shadow-none">
            <div className="space-y-1">
              <span className="bg-emerald-700 text-emerald-100 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                Executive Assessment Verdict
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1 font-heading">
                QCF Index Performance Grade
              </h3>
              <p className="text-xs text-emerald-200">
                Evaluation conducted across all {activeStatements.length} active QCF core guidance standards.
              </p>
            </div>

            <div className="flex items-center gap-6 bg-emerald-950/90 border border-emerald-700 p-4 rounded-xl shrink-0 print:p-3">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 font-heading">{overallAvgScore} / 5.0</div>
                <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Overall QCF Index</div>
              </div>
              <div className="h-10 w-px bg-emerald-800"></div>
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${gradeBadgeColor}`}>
                  {performanceGrade}
                </span>
                <div className="text-[10px] text-emerald-300 mt-1">Official Framework Status</div>
              </div>
            </div>
          </div>

          {/* Domain Breakdown Table */}
          <div className="print:break-inside-avoid">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Domain Score Summary</span>
            </h3>

            <div className="grid grid-cols-5 gap-3">
              {QCF_DOMAINS.map(d => {
                const domainStmts = activeStatements.filter(s => s.domainNumber === d.id);
                let dScore = 0;
                domainStmts.forEach(s => {
                  dScore += (inspectorRatings[s.id] || userRatings[s.id] || 3);
                });
                const dAvg = (dScore / (domainStmts.length || 1)).toFixed(1);

                return (
                  <div key={d.id} className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl text-center print:p-2">
                    <div className="text-[10px] font-extrabold text-emerald-900 uppercase">{d.code}</div>
                    <div className="text-lg font-black text-[#16362B] mt-0.5">{dAvg} / 5.0</div>
                    <div className="text-[10px] text-gray-500 truncate mt-0.5">{d.title}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Standards Evaluation Audit Log */}
          <div>
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
              Detailed Standards Audit Log ({activeStatements.length} Standards)
            </h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden print:overflow-visible print:block print:rounded-none print:border">
              <table className="w-full text-left border-collapse text-xs print:text-[11px]">
                <thead>
                  <tr className="bg-[#16362B] text-white text-[10px] uppercase tracking-wider">
                    <th className="p-3 pl-4 print:p-2">Std Code</th>
                    <th className="p-3 print:p-2">Standard Statement Description</th>
                    <th className="p-3 text-center print:p-2">School Rating</th>
                    <th className="p-3 text-center print:p-2">Inspector Rating</th>
                    <th className="p-3 print:p-2">Inspector Verdict & Findings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeStatements.map((stmt) => {
                    const schoolRating = userRatings[stmt.id] || 3;
                    const inspectorScore = inspectorRatings[stmt.id] || schoolRating;
                    const verdict = inspectorVerdicts[stmt.id] || 'Approved';
                    const notes = inspectorNotes[stmt.id] || 'Evidence verified in accordance with KHDA guidelines.';

                    return (
                      <tr key={stmt.id} className="hover:bg-gray-50 print:break-inside-avoid">
                        <td className="p-3 pl-4 font-black text-emerald-900 whitespace-nowrap print:p-2">
                          Std {stmt.code}
                        </td>
                        <td className="p-3 font-semibold text-gray-800 leading-snug print:p-2">
                          {stmt.statement}
                        </td>
                        <td className="p-3 text-center print:p-2">
                          <span className="bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded text-[11px]">
                            L{schoolRating}
                          </span>
                        </td>
                        <td className="p-3 text-center print:p-2">
                          <span className="bg-emerald-100 text-emerald-950 font-black px-2 py-0.5 rounded text-[11px]">
                            L{inspectorScore}
                          </span>
                        </td>
                        <td className="p-3 print:p-2">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                              verdict === 'Approved' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {verdict}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-600 italic">
                            "{notes}"
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Signatures & Circulation Footer */}
          <div className="pt-6 border-t-2 border-gray-200 grid grid-cols-2 gap-8 text-xs print:break-inside-avoid print:pt-4">
            <div>
              <div className="font-bold text-gray-900">Lead Inspector Sign-Off</div>
              <div className="mt-4 pt-2 border-b border-gray-400 font-serif italic text-gray-700">
                Dr. Sarah Al Mansoori
              </div>
              <div className="text-[10px] text-gray-500 mt-1">KHDA Senior Quality Evaluator</div>
            </div>

            <div>
              <div className="font-bold text-gray-900">School Receipt & Acknowledgment</div>
              <div className="mt-4 pt-2 border-b border-gray-400 font-serif italic text-gray-400">
                [ Principal / Head of Careers Signature ]
              </div>
              <div className="text-[10px] text-gray-500 mt-1">{school.name}</div>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400 pt-4 print:pt-2">
            Official Quality Careers Framework (QCF) Report — Issued for Circulation to Dubai Schools & KHDA Directorate.
          </div>

        </div>

      </div>
    </div>
  );
}
