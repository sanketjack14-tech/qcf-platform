import React, { useState } from 'react';
import { 
  LayoutDashboard, School, ShieldCheck, Users, TrendingUp, Award, 
  UserPlus, Search, Filter, CheckCircle2, Clock, AlertCircle, Sparkles, 
  Eye, EyeOff, Edit3, Plus, Save, X, FileText, Check, Settings2, FileCheck2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { INSPECTORS, QCF_DOMAINS, QCF_STATEMENTS, sortStatements } from '../data/qcfData';
import EvaluationReportModal from './EvaluationReportModal';

export default function AdminView({ 
  schools, 
  setSchools, 
  statements, 
  setStatements,
  userRatings = {},
  inspectorRatings = {},
  inspectorVerdicts = {},
  inspectorNotes = {},
  evidenceList = []
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'questions'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Report Modal state in Admin View
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportSchool, setSelectedReportSchool] = useState(null);

  // Questions Manager Filters & State
  const [questionSearch, setQuestionSearch] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState('All'); // 'All' | 'Active' | 'Hidden'

  // Modals & Confirmation States for Questions Manager
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStatement, setEditingStatement] = useState(null);

  // Confirmation Modals
  const [isConfirmAddOpen, setIsConfirmAddOpen] = useState(false);
  const [pendingAddStatement, setPendingAddStatement] = useState(null);
  
  const [isConfirmEditOpen, setIsConfirmEditOpen] = useState(false);
  const [pendingEditStatement, setPendingEditStatement] = useState(null);

  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  // Feedback Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  // Form states for Add/Edit
  const [formCode, setFormCode] = useState('');
  const [formStatement, setFormStatement] = useState('');
  const [formDomain, setFormDomain] = useState(1);

  // Dashboard chart data
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

  // Toggle Hide / Unhide question with notification
  const handleToggleHide = (stmtId) => {
    setStatements(prev => {
      const updated = prev.map(s => {
        if (s.id === stmtId) {
          return { ...s, hidden: !s.hidden };
        }
        return s;
      });
      try {
        localStorage.setItem('qcf_statements', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
    
    const target = statements.find(s => s.id === stmtId);
    if (target) {
      setToastMessage(target.hidden ? `👁️ Standard "${target.code}" is now Active.` : `🙈 Standard "${target.code}" is now Hidden.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Open Edit Modal
  const openEditModal = (stmt) => {
    setEditingStatement(stmt);
    setFormCode(stmt.code);
    setFormStatement(stmt.statement);
    setFormDomain(stmt.domainNumber);
    setIsEditModalOpen(true);
  };

  // Step 1: Initiate Edit Question -> Ask Confirmation
  const handleInitiateEdit = (e) => {
    e.preventDefault();
    if (!formStatement.trim() || !formCode.trim() || !editingStatement) return;

    const updatedStmt = {
      ...editingStatement,
      code: formCode.trim(),
      statement: formStatement.trim(),
      domainNumber: parseInt(formDomain, 10)
    };

    setPendingEditStatement(updatedStmt);
    setIsConfirmEditOpen(true);
  };

  // Step 2: Confirm & Apply Edit
  const handleConfirmEdit = () => {
    if (!pendingEditStatement) return;

    setStatements(prev => {
      const updated = sortStatements(prev.map(s => s.id === pendingEditStatement.id ? pendingEditStatement : s));
      try {
        localStorage.setItem('qcf_statements', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving to localStorage:', err);
      }
      return updated;
    });

    setToastMessage(`✅ Standard Question "${pendingEditStatement.code}" updated and saved successfully!`);
    setTimeout(() => setToastMessage(null), 5000);

    setIsConfirmEditOpen(false);
    setIsEditModalOpen(false);
    setEditingStatement(null);
    setPendingEditStatement(null);
  };

  // Open Add Modal
  const openAddModal = () => {
    const defaultDomain = selectedDomainFilter !== 'All' ? parseInt(selectedDomainFilter, 10) : 1;
    const existingInDomain = statements.filter(s => s.domainNumber === defaultDomain).length;
    setFormCode(`${defaultDomain}.${existingInDomain + 1}`);
    setFormStatement('');
    setFormDomain(defaultDomain);
    setIsAddModalOpen(true);
  };

  // Handle Domain Change in Add Modal to suggest code at the end of that domain
  const handleDomainSelectChange = (newDomainId) => {
    const domNum = parseInt(newDomainId, 10);
    setFormDomain(domNum);
    const existingInDomain = statements.filter(s => s.domainNumber === domNum).length;
    setFormCode(`${domNum}.${existingInDomain + 1}`);
  };

  // Step 1: Initiate Add Question -> Ask Confirmation
  const handleInitiateAdd = (e) => {
    e.preventDefault();
    if (!formStatement.trim() || !formCode.trim()) return;

    const newStmt = {
      id: 'stmt-' + Date.now(),
      code: formCode.trim(),
      domainNumber: parseInt(formDomain, 10),
      statement: formStatement.trim(),
      defaultRating: 3,
      evidenceCount: 0,
      hidden: false
    };

    setPendingAddStatement(newStmt);
    setIsConfirmAddOpen(true);
  };

  // Step 2: Confirm & Save Add Question to Framework
  const handleConfirmAdd = () => {
    if (!pendingAddStatement) return;

    setStatements(prev => {
      const updated = sortStatements([...prev, pendingAddStatement]);
      try {
        localStorage.setItem('qcf_statements', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving new statement to localStorage:', err);
      }
      return updated;
    });

    setToastMessage(`🎉 Standard Question "${pendingAddStatement.code}" created and added to KHDA QCF Framework!`);
    setTimeout(() => setToastMessage(null), 5000);

    setIsConfirmAddOpen(false);
    setIsAddModalOpen(false);
    setPendingAddStatement(null);
  };

  // Reset Framework to Original 42 KHDA Standards
  const handleResetFramework = () => {
    const sortedDefault = sortStatements(QCF_STATEMENTS);
    setStatements(sortedDefault);
    try {
      localStorage.removeItem('qcf_statements');
    } catch (err) {
      console.error(err);
    }
    setIsConfirmResetOpen(false);
    setToastMessage("🔄 Reset Quality Careers Framework to default 42 KHDA standards.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleOpenReportModal = (sch) => {
    setSelectedReportSchool(sch);
    setIsReportModalOpen(true);
  };

  // Filtered Schools for Dashboard
  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.curriculum.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtered & Sorted Statements for Questions Manager
  const rawFilteredStatements = statements.filter(stmt => {
    const matchesSearch = stmt.code.toLowerCase().includes(questionSearch.toLowerCase()) ||
                          stmt.statement.toLowerCase().includes(questionSearch.toLowerCase());
    const matchesDomain = selectedDomainFilter === 'All' || stmt.domainNumber === parseInt(selectedDomainFilter, 10);
    const matchesVisibility = visibilityFilter === 'All' || 
                              (visibilityFilter === 'Active' && !stmt.hidden) || 
                              (visibilityFilter === 'Hidden' && stmt.hidden);
    return matchesSearch && matchesDomain && matchesVisibility;
  });

  const filteredStatements = sortStatements(rawFilteredStatements);

  const activeCount = statements.filter(s => !s.hidden).length;
  const hiddenCount = statements.filter(s => s.hidden).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16362B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white ml-2 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

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
            Real-time quality assurance oversight, KHDA 42 standards management, and inspector deployment matrix.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-2 bg-emerald-950/90 border border-emerald-800 p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard & Inspector Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>KHDA Standards Manager ({statements.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE DASHBOARD & INSPECTOR MATRIX */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Total Dubai Schools', value: '215', sub: 'Registered on QCF Portal', icon: School, color: 'text-emerald-700 bg-emerald-50' },
              { title: 'SEF Submissions', value: '142', sub: 'Completed Self-Evaluations', icon: CheckCircle2, color: 'text-blue-700 bg-blue-50' },
              { title: 'KHDA Standards', value: `${activeCount} Active`, sub: `${hiddenCount} Hidden questions`, icon: FileText, color: 'text-amber-700 bg-amber-50' },
              { title: 'Average QCF Score', value: '4.2 / 5', sub: 'Exemplary Compliance', icon: Award, color: 'text-purple-700 bg-purple-50' }
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
            
            {/* Domain Performance Bar Chart */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 font-heading">
                    Dubai Schools Performance by Core QCF Domain
                  </h3>
                  <p className="text-xs text-gray-500">Average score rating across active KHDA standards (Scale 1-5)</p>
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

            {/* Status Distribution Pie Chart */}
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
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
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
                          onClick={() => handleOpenReportModal(sch)}
                          className="px-3.5 py-1.5 bg-[#16362B] hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl transition-all shadow-2xs flex items-center gap-1.5 inline-flex cursor-pointer"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View Report</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KHDA STANDARDS & QUESTIONS MANAGER */}
      {activeTab === 'questions' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Manager Toolbar */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 font-heading flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <span>KHDA Core Standards & Questions Framework ({statements.length} Standards)</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Add new questions, edit statement text, or toggle visibility to hide unwanted questions from school forms.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsConfirmResetOpen(true)}
                  className="px-3 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset framework to default 42 KHDA standards"
                >
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Reset Default 42</span>
                </button>

                <button
                  onClick={openAddModal}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Question / Standard</span>
                </button>
              </div>
            </div>

            {/* Metrics & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              
              {/* Counters */}
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Total: {statements.length} Standards
                </span>
                <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  Active: {activeCount} Visible
                </span>
                {hiddenCount > 0 && (
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    Hidden: {hiddenCount} Questions
                  </span>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by code (e.g. 1.1) or text..."
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <select
                  value={selectedDomainFilter}
                  onChange={(e) => setSelectedDomainFilter(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="All">All Domains (1-5)</option>
                  <option value="1">Domain 1 (Leadership)</option>
                  <option value="2">Domain 2 (Strategy)</option>
                  <option value="3">Domain 3 (Engagement)</option>
                  <option value="4">Domain 4 (Innovation)</option>
                  <option value="5">Domain 5 (Forward Plan)</option>
                </select>

                <select
                  value={visibilityFilter}
                  onChange={(e) => setVisibilityFilter(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="All">All Visibilities</option>
                  <option value="Active">Active Only</option>
                  <option value="Hidden">Hidden Only</option>
                </select>
              </div>

            </div>
          </div>

          {/* Questions Grid / List */}
          <div className="space-y-3">
            {filteredStatements.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 text-center text-xs text-gray-500">
                No standards match your search or filter criteria.
              </div>
            ) : (
              filteredStatements.map((stmt) => {
                const domainInfo = QCF_DOMAINS.find(d => d.id === stmt.domainNumber);
                const isHidden = stmt.hidden;

                return (
                  <div
                    key={stmt.id}
                    className={`bg-white rounded-2xl border p-4 shadow-2xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      isHidden 
                        ? 'border-amber-200 bg-amber-50/30 opacity-75' 
                        : 'border-emerald-100 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className={`font-extrabold text-xs px-3 py-1 rounded-lg shrink-0 ${
                        isHidden ? 'bg-amber-800 text-amber-100' : 'bg-[#16362B] text-white'
                      }`}>
                        Std {stmt.code}
                      </span>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {domainInfo?.code} • {domainInfo?.title}
                          </span>

                          {isHidden && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Hidden from Schools
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-bold text-gray-900 leading-snug">
                          {stmt.statement}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Hide/Show Toggle and Edit */}
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button
                        onClick={() => handleToggleHide(stmt.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isHidden
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title={isHidden ? 'Unhide standard so schools can evaluate it' : 'Hide standard from school evaluation form'}
                      >
                        {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-gray-500" />}
                        <span>{isHidden ? 'Unhide Question' : 'Hide Question'}</span>
                      </button>

                      <button
                        onClick={() => openEditModal(stmt)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* EDIT QUESTION MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-xl overflow-hidden">
            <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <span>Edit KHDA Standard {editingStatement?.code}</span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-emerald-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiateEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Standard Code / Identifier
                </label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold text-emerald-950"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Core Domain Assignment
                </label>
                <select
                  value={formDomain}
                  onChange={(e) => setFormDomain(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none cursor-pointer font-medium"
                >
                  {QCF_DOMAINS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.code} • {d.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Question / Statement Description
                </label>
                <textarea
                  rows={4}
                  value={formStatement}
                  onChange={(e) => setFormStatement(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Review & Confirm Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW QUESTION MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-xl overflow-hidden">
            <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add New QCF Standard Question</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-emerald-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInitiateAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Standard Code / Number (e.g. 5.9)
                </label>
                <input
                  type="text"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  placeholder="e.g. 5.9"
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none font-bold text-emerald-950"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Domain Assignment
                </label>
                <select
                  value={formDomain}
                  onChange={(e) => handleDomainSelectChange(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none cursor-pointer font-medium"
                >
                  {QCF_DOMAINS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.code} • {d.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Question / Statement Description
                </label>
                <textarea
                  rows={4}
                  value={formStatement}
                  onChange={(e) => setFormStatement(e.target.value)}
                  placeholder="Enter the full question text for school self-evaluation..."
                  className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Review & Confirm Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: ADD QUESTION */}
      {isConfirmAddOpen && pendingAddStatement && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 w-full max-w-lg overflow-hidden">
            <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Confirm Adding New KHDA Standard</span>
              </div>
              <button
                onClick={() => setIsConfirmAddOpen(false)}
                className="text-emerald-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">Executive Confirmation Required</span>
                  Are you sure you want to add this new question to the KHDA Quality Careers Framework? Once confirmed, it will immediately be saved to browser memory and apply to all school self-evaluations.
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#16362B] text-white font-extrabold text-xs px-2.5 py-1 rounded-md">
                    Standard {pendingAddStatement.code}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800">
                    Domain {pendingAddStatement.domainNumber}: {QCF_DOMAINS.find(d => d.id === pendingAddStatement.domainNumber)?.title}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-900 pt-1 leading-relaxed">
                  "{pendingAddStatement.statement}"
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsConfirmAddOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Go Back / Edit Details
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Yes, Confirm & Save Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: EDIT QUESTION */}
      {isConfirmEditOpen && pendingEditStatement && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 w-full max-w-lg overflow-hidden">
            <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-sm">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <span>Confirm Save Standard Edits</span>
              </div>
              <button
                onClick={() => setIsConfirmEditOpen(false)}
                className="text-emerald-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">Confirm Standard Modification</span>
                  You are about to save changes to Standard <strong>{pendingEditStatement.code}</strong>.
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Statement Text:</div>
                <p className="text-xs font-bold text-gray-900 leading-relaxed">
                  "{pendingEditStatement.statement}"
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsConfirmEditOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEdit}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4 text-emerald-300" />
                  <span>Yes, Apply Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: RESET FRAMEWORK */}
      {isConfirmResetOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 w-full max-w-lg overflow-hidden">
            <div className="bg-[#16362B] text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-sm text-amber-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Reset KHDA Framework Standards</span>
              </div>
              <button
                onClick={() => setIsConfirmResetOpen(false)}
                className="text-emerald-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-950 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">Warning: Reset to Original 42 Standards</span>
                  This will remove any custom questions you have added and reset the KHDA Framework back to the default 42 core standards.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsConfirmResetOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetFramework}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Reset All to Default 42</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL REPORT MODAL FOR ADMIN VIEW */}
      <EvaluationReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        school={selectedReportSchool}
        statements={statements}
        userRatings={userRatings}
        inspectorRatings={inspectorRatings}
        inspectorVerdicts={inspectorVerdicts}
        inspectorNotes={inspectorNotes}
        evidenceList={evidenceList}
      />

    </div>
  );
}
