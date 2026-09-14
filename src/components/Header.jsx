import React from 'react';
import QCFLogo from './QCFLogo';
import { School, ShieldCheck, LayoutDashboard, UserCheck, Bell, Sparkles } from 'lucide-react';

export default function Header({ currentRole, setCurrentRole, activeSchool, setActiveSchool, schools }) {
  const roles = [
    {
      id: 'school',
      label: 'School Portal',
      subtitle: 'Self-Evaluation & Evidence Submission',
      icon: School,
      badge: 'Dubai International Academy',
      badgeBg: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'inspector',
      label: 'Inspector Portal',
      subtitle: 'Verification & Quality Audit',
      icon: ShieldCheck,
      badge: 'Dr. Sarah Al Mansoori (KHDA)',
      badgeBg: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'admin',
      label: 'Admin Directorate',
      subtitle: 'Dubai Analytics & Inspector Assignment',
      icon: LayoutDashboard,
      badge: 'Executive Admin',
      badgeBg: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner / Role Switcher Strip */}
      <div className="bg-[#16362B] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Demo Mode
          </span>
          <span className="text-emerald-200 hidden sm:inline">
            Switch between user roles to test multi-user evaluation workflows:
          </span>
        </div>

        {/* Role Selector Pills */}
        <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-lg border border-emerald-800/80">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium text-xs ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <QCFLogo className="w-12 h-12 shrink-0" />
        </div>

        {/* Current Active Context Badge */}
        <div className="flex items-center gap-4">
          {currentRole === 'school' && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-xs font-semibold text-emerald-950">Active School Context</div>
                <div className="text-xs text-gray-500">{activeSchool?.name || 'Dubai International Academy'}</div>
              </div>
              <select
                value={activeSchool?.id}
                onChange={(e) => {
                  const selected = schools.find(s => s.id === e.target.value);
                  if (selected) setActiveSchool(selected);
                }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs cursor-pointer"
              >
                {schools.map(s => (
                  <option key={s.id} value={s.id}>
                    🏫 {s.name} ({s.status})
                  </option>
                ))}
              </select>
            </div>
          )}

          {currentRole === 'inspector' && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg text-xs text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-bold">Logged as Inspector:</span> Dr. Sarah Al Mansoori (KHDA)
              </div>
            </div>
          )}

          {currentRole === 'admin' && (
            <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg text-xs text-purple-900">
              <UserCheck className="w-4 h-4 text-purple-600" />
              <div>
                <span className="font-bold">Admin Console:</span> QCF Framework Executive
              </div>
            </div>
          )}

          <div className="relative border-l border-gray-200 pl-3">
            <button className="p-2 text-gray-400 hover:text-emerald-800 rounded-full hover:bg-emerald-50 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
