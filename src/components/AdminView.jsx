import React, { useState } from 'react';
import { 
  LayoutDashboard, School, ShieldCheck, Users, TrendingUp, Award, 
  UserPlus, Search, Filter, CheckCircle2, Clock, AlertCircle, Sparkles 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { INSPECTORS } from '../data/qcfData';

export default function AdminView({ schools, setSchools }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Chart data
  const domainPerformanceData = [
    { name: 'Domain 1 (Leadership)', avgScore: 4.4, color: '#16362B' },
    { name: 'Domain 2 (Strategy)', avgScore: 4.1, color: '#2C6450' },
    { name: 'Domain 3 (Engagement)', avgScore: 3.9, color: '#3B7A64' },
    { name: 'Domain 4 (Innovation)', avgScore: 4.6, color: '#4C8E77' },
    { name: 'Domain 5 (Forward Plan)', avgScore: 4.2, color: '#1F4B3C' }
  ];

  const statusDistributionData = [
    { name: 'Certified', value: 45, color: '#10B981' },
    { name: 'Under Inspection', value: 38, color: '#3B82F6' },
    { name: 'Submitted', value: 24, color: '#06B6D4' },
    { name: 'In Progress', value: 52, color: '#F59E0B' },
    { name: 'Draft', value: 16, color: '#6B7280' }
  ];

  const handleInspectorAssign = (schoolId, inspectorName) => {
    setSchools(prev => prev.map(s => {
      if (s.id === schoolId) {
        return { ...s, assignedInspector: inspectorName };
      }
      return s;
    }));
  };

  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.curriculum.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Executive Header Banner */}
      <div className="bg-[#16362B] text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Executive Directorate Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-heading">
            Dubai Schools QCF Analytics & Administration
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
            Real-time quality assurance oversight, inspector deployment, and careers framework analytics across Dubai private and public schools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Inspector Assignment Modal opened!")}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add / Deploy Inspector</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Dubai Schools', value: '215', sub: 'Registered on QCF Portal', icon: School, color: 'text-emerald-700 bg-emerald-50' },
          { title: 'SEF Submissions', value: '142', sub: 'Completed Self-Evaluations', icon: CheckCircle2, color: 'text-blue-700 bg-blue-50' },
          { title: 'Active Inspections', value: '38', sub: 'KHDA Inspectors Deployed', icon: ShieldCheck, color: 'text-amber-700 bg-amber-50' },
          { title: 'Average QCF Score', value: '4.2 / 5', sub: 'Exemplary Framework Compliance', icon: Award, color: 'text-purple-700 bg-purple-50' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{kpi.title}</div>
                <div className="text-2xl font-black text-gray-900 mt-1 font-heading">{kpi.value}</div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">{kpi.sub}</div>
              </div>
              <div className={`p-3 rounded-2xl ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Domain Performance Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 font-heading">
                Dubai Schools Performance by Core QCF Domain
              </h3>
              <p className="text-xs text-gray-500">Average score rating across 42 standards (Scale 1-5)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EFEA" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#374151' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16362B', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="avgScore" fill="#2C6450" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 font-heading">
              SEF & Inspection Status Breakdown
            </h3>
            <p className="text-xs text-gray-500">Progress state across Dubai education sector</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend formatter={(value) => <span className="text-xs font-semibold text-gray-700">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Inspector Assignment & School Monitoring Matrix */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 font-heading">
              Inspector Assignment & School Evaluation Progress Matrix
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Assign inspectors, monitor SEF completion %, and track verification milestones
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search school name or curriculum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Inspection">Under Inspection</option>
              <option value="In Progress">In Progress</option>
              <option value="Certified">Certified</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50/60 text-emerald-950 text-[11px] font-extrabold uppercase tracking-wider border-b border-emerald-100">
                <th className="p-4 pl-6">School Name & Location</th>
                <th className="p-4">Curriculum</th>
                <th className="p-4">SEF Progress</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned Inspector</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredSchools.map((sch) => (
                <tr key={sch.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-gray-900">{sch.name}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{sch.district} • KHDA: <span className="font-semibold text-emerald-800">{sch.khdaRating}</span></div>
                  </td>
                  <td className="p-4 font-semibold text-gray-700">
                    {sch.curriculum}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${sch.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 text-xs">{sch.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      sch.status === 'Certified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      sch.status === 'Submitted' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      sch.status === 'Under Inspection' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {sch.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={sch.assignedInspector}
                      onChange={(e) => handleInspectorAssign(sch.id, e.target.value)}
                      className="bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                    >
                      {INSPECTORS.map(insp => (
                        <option key={insp.id} value={insp.name}>
                          👤 {insp.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => alert(`Opening audit report for ${sch.name}`)}
                      className="px-3 py-1.5 bg-[#16362B] text-white font-bold text-[11px] rounded-lg hover:bg-emerald-800 transition-colors"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
