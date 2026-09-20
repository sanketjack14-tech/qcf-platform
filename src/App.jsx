import React, { useState } from 'react';
import PortalHeader from './components/PortalHeader';
import RoleSelectionLanding from './components/RoleSelectionLanding';
import SchoolView from './components/SchoolView';
import InspectorView from './components/InspectorView';
import AdminView from './components/AdminView';
import EvidenceModal from './components/EvidenceModal';
import { DUBAI_SCHOOLS, QCF_STATEMENTS, sortStatements } from './data/qcfData';
import { 
  isSupabaseConfigured, 
  getStatementsFromDB, 
  getSchoolsFromDB, 
  getRatingsFromDB, 
  saveUserRatingToDB, 
  getEvidenceFromDB, 
  saveEvidenceToDB, 
  deleteEvidenceFromDB,
  saveSchoolToDB
} from './lib/supabaseClient';

export default function App() {
  // Role State: null (shows Main Gateway Landing) | 'school' | 'inspector' | 'admin'
  const [currentRole, setCurrentRole] = useState(null); 
  const [schools, setSchools] = useState(DUBAI_SCHOOLS);
  const [activeSchool, setActiveSchool] = useState(DUBAI_SCHOOLS[0]);

  // Master QCF Statements state (allows Admin to add, edit, or hide questions with localStorage & DB persistence)
  const [statements, setStatements] = React.useState(() => {
    try {
      const saved = localStorage.getItem('qcf_statements');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sortStatements(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading qcf_statements from localStorage:', e);
    }
    return sortStatements(QCF_STATEMENTS);
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('qcf_statements', JSON.stringify(statements));
    } catch (e) {
      console.error('Error writing qcf_statements to localStorage:', e);
    }
  }, [statements]);

  // Self-evaluation ratings state (keyed by statement ID)
  const [userRatings, setUserRatings] = useState({
    'stmt-1_1': 4,
    'stmt-1_2': 5,
    'stmt-1_3': 3,
    'stmt-1_4': 4,
    'stmt-2_1': 5,
    'stmt-3_1a': 4,
    'stmt-4_1': 5
  });

  // Inspector ratings & verdicts state (shared between Inspector and Admin view report)
  const [inspectorRatings, setInspectorRatings] = useState({
    'stmt-1_1': 4,
    'stmt-1_2': 5,
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

  // Pre-loaded multi-modal evidence items for rich demo
  const [evidenceList, setEvidenceList] = useState([
    {
      id: 'ev-1',
      statementId: 'stmt-1_1',
      type: 'audio',
      title: 'Interview Voice Note - Principal & Head of Careers',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      date: 'Sept 12, 2026',
      note: 'Voice note discussing 4-year strategic career framework backing.'
    },
    {
      id: 'ev-2',
      statementId: 'stmt-1_1',
      type: 'file',
      title: 'School Board Resolution for Quality Careers 2026-2030.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      date: 'Sept 10, 2026'
    },
    {
      id: 'ev-3',
      statementId: 'stmt-2_1',
      type: 'video',
      title: 'Student University Fair & Career Guidance Session.mp4',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      date: 'Sept 14, 2026'
    },
    {
      id: 'ev-4',
      statementId: 'stmt-4_1',
      type: 'image',
      title: 'Interactive Digital Careers Hub & Bulletin Board.png',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      date: 'Sept 11, 2026'
    },
    {
      id: 'ev-5',
      statementId: 'stmt-3_1a',
      type: 'link',
      title: 'Dubai Future Academy Student Internship Portal',
      url: 'https://careers.dubaieducation2033.ae',
      date: 'Sept 13, 2026'
    }
  ]);

  // Sync with Supabase Cloud Database on Component Mount
  React.useEffect(() => {
    if (!isSupabaseConfigured) return;

    async function loadCloudData() {
      // 1. Statements
      const dbStmts = await getStatementsFromDB();
      if (dbStmts) setStatements(dbStmts);

      // 2. Schools
      const dbSchools = await getSchoolsFromDB();
      if (dbSchools) {
        setSchools(dbSchools);
        if (dbSchools.length > 0) setActiveSchool(dbSchools[0]);
      }

      // 3. Ratings
      const dbRatings = await getRatingsFromDB(activeSchool.id);
      if (dbRatings) {
        if (Object.keys(dbRatings.userRatings).length > 0) setUserRatings(prev => ({ ...prev, ...dbRatings.userRatings }));
        if (Object.keys(dbRatings.inspectorRatings).length > 0) setInspectorRatings(prev => ({ ...prev, ...dbRatings.inspectorRatings }));
        if (Object.keys(dbRatings.inspectorVerdicts).length > 0) setInspectorVerdicts(prev => ({ ...prev, ...dbRatings.inspectorVerdicts }));
        if (Object.keys(dbRatings.inspectorNotes).length > 0) setInspectorNotes(prev => ({ ...prev, ...dbRatings.inspectorNotes }));
      }

      // 4. Evidence
      const dbEv = await getEvidenceFromDB(activeSchool.id);
      if (dbEv && dbEv.length > 0) setEvidenceList(dbEv);
    }

    loadCloudData();
  }, [activeSchool.id]);

  // Modal State for Evidence
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeModalStatement, setActiveModalStatement] = useState(null);

  const openEvidenceModal = (stmt) => {
    setActiveModalStatement(stmt);
    setIsEvidenceModalOpen(true);
  };

  const closeEvidenceModal = () => {
    setIsEvidenceModalOpen(false);
    setActiveModalStatement(null);
  };

  const handleAddEvidence = (newEvidence) => {
    setEvidenceList(prev => [newEvidence, ...prev]);
    saveEvidenceToDB(newEvidence);
  };

  const handleDeleteEvidence = (id) => {
    setEvidenceList(prev => prev.filter(e => e.id !== id));
    deleteEvidenceFromDB(id);
  };

  const handleSubmitSEF = () => {
    setSchools(prev => prev.map(s => {
      if (s.id === activeSchool.id) {
        const updated = { ...s, status: 'Submitted', completionPercentage: 100 };
        saveSchoolToDB(updated);
        return updated;
      }
      return s;
    }));
    setActiveSchool(prev => {
      const updated = { ...prev, status: 'Submitted', completionPercentage: 100 };
      saveSchoolToDB(updated);
      return updated;
    });
    alert(`Success! SEF for ${activeSchool.name} has been submitted to KHDA Inspectors.`);
  };

  // If no role is selected, show the Role Selection Landing Page
  if (!currentRole) {
    return <RoleSelectionLanding onSelectRole={(role) => setCurrentRole(role)} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F8F5] text-gray-900 font-sans pb-12 flex flex-col">
      {/* Dedicated Portal Header (no demo switcher strip) */}
      <PortalHeader 
        currentRole={currentRole}
        onLogout={() => setCurrentRole(null)}
        activeSchool={activeSchool}
        setActiveSchool={setActiveSchool}
        schools={schools}
      />

      {/* Main Dedicated Portal Views */}
      <main className="flex-1">
        {currentRole === 'school' && (
          <SchoolView 
            school={activeSchool}
            statements={statements}
            userRatings={userRatings}
            setUserRatings={setUserRatings}
            evidenceList={evidenceList}
            openEvidenceModal={openEvidenceModal}
            onSubmitSEF={handleSubmitSEF}
          />
        )}

        {currentRole === 'inspector' && (
          <InspectorView 
            schools={schools}
            statements={statements}
            evidenceList={evidenceList}
            userRatings={userRatings}
            inspectorRatings={inspectorRatings}
            setInspectorRatings={setInspectorRatings}
            inspectorVerdicts={inspectorVerdicts}
            setInspectorVerdicts={setInspectorVerdicts}
            inspectorNotes={inspectorNotes}
            setInspectorNotes={setInspectorNotes}
          />
        )}

        {currentRole === 'admin' && (
          <AdminView 
            schools={schools}
            setSchools={setSchools}
            statements={statements}
            setStatements={setStatements}
            userRatings={userRatings}
            inspectorRatings={inspectorRatings}
            inspectorVerdicts={inspectorVerdicts}
            inspectorNotes={inspectorNotes}
            evidenceList={evidenceList}
          />
        )}
      </main>

      {/* Multi-Modal Evidence Upload & Management Modal */}
      <EvidenceModal 
        statement={activeModalStatement}
        isOpen={isEvidenceModalOpen}
        onClose={closeEvidenceModal}
        evidenceList={evidenceList}
        onAddEvidence={handleAddEvidence}
        onDeleteEvidence={handleDeleteEvidence}
      />

      {/* Footer */}
      <footer className="mt-auto bg-[#16362B] text-emerald-200 border-t border-emerald-800 py-6 text-xs text-center print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white">Quality Careers Framework (QCF)</span> — Dubai Education 2033 Standards Platform
          </div>
          <div className="text-emerald-400 font-medium">
            Beta Edition 2026 © KHDA & QCF Governing Directorate
          </div>
        </div>
      </footer>
    </div>
  );
}
