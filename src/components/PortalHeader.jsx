import React from 'react';
import QCFLogo from './QCFLogo';
import { LogOut, School, ShieldCheck, LayoutDashboard, UserCheck, Bell } from 'lucide-react';

export default function PortalHeader({ currentRole, onLogout, activeSchool, setActiveSchool, schools }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Current Portal Title */}
        <div className="flex items-center gap-4">
          <QCFLogo className="w-11 h-11 shrink-0" />
          
          <div className="h-7 w-px bg-gray-200 hidden sm:block"></div>

          <div>
            <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              {currentRole === 'school' && (
                <>
                  <School className="w-3.5 h-3.5 text-emerald-700" />
                  <span>School Evaluation Portal</span>
                </>
              )}
              {currentRole === 'inspector' && (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>KHDA Inspector Verification Portal</span>
                </>
              )}
              {currentRole === 'admin' && (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-700" />
                  <span>Executive Admin Directorate</span>
                </>
              )}
            </div>

            <div className="text-[11px] text-gray-500 font-medium">
              {currentRole === 'school' && (activeSchool?.name || 'Dubai International Academy')}
              {currentRole === 'inspector' && 'Inspector: Dr. Sarah Al Mansoori (KHDA Quality Auditor)'}
              {currentRole === 'admin' && 'Dubai Education 2033 Analytics & Framework Manager'}
            </div>
          </div>
        </div>

        {/* Right Section: School Selector (if School Portal) & Switch Portal Action */}
        <div className="flex items-center gap-3">
          {currentRole === 'school' && (
            <select
              value={activeSchool?.id}
              onChange={(e) => {
                const selected = schools.find(s => s.id === e.target.value);
                if (selected) setActiveSchool(selected);
              }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs cursor-pointer hidden md:block"
            >
              {schools.map(s => (
                <option key={s.id} value={s.id}>
                  🏫 {s.name} ({s.status})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 font-bold text-xs rounded-xl border border-gray-200 hover:border-emerald-300 flex items-center gap-2 transition-all cursor-pointer"
            title="Return to Main Portal Selection Gateway"
          >
            <LogOut className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Switch Portal</span>
          </button>
        </div>

      </div>
    </header>
  );
}
