import { createClient } from '@supabase/supabase-js';
import { DUBAI_SCHOOLS, QCF_STATEMENTS } from '../src/data/qcfData.js';

const supabaseUrl = 'https://rifnbkzdhwjbdrffqwzs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZm5ia3pkaHdqYmRyZmZxd3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTQwNTgsImV4cCI6MjEwNTQ5MDA1OH0.iPwCyTuAQdUjvIe91Nks7dCrmBtTcB0fovGsX5VgwJg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedAll() {
  console.log('--- SYNCING FRONTEND & POSTGRESQL DATABASE ---');

  // 1. Seed Statements (42 KHDA Standards)
  console.log('1. Seeding QCF Statements (42 KHDA Standards)...');
  const uniqueStmtsMap = new Map();
  QCF_STATEMENTS.forEach(s => {
    uniqueStmtsMap.set(s.id, {
      id: s.id,
      code: s.code,
      domain_number: s.domainNumber,
      statement: s.statement,
      default_rating: s.defaultRating || 3,
      evidence_count: s.evidenceCount || 0,
      hidden: Boolean(s.hidden)
    });
  });
  const stmtPayloads = Array.from(uniqueStmtsMap.values());
  const { error: stmtErr } = await supabase.from('qcf_statements').upsert(stmtPayloads);
  if (stmtErr) console.error('Statements Error:', stmtErr);
  else console.log('✓ 42 KHDA Standards synced successfully.');

  // Extract all statement IDs in order
  const allStmtIds = stmtPayloads.map(s => s.id);

  // 2. Generate SEF Ratings & Inspector Reviews for all 5 schools to match target percentages
  // Target counts out of 42:
  // sch-101 (Dubai Int Academy): 37 statements rated = 88%
  // sch-102 (GEMS Wellington): 42 statements rated = 100%
  // sch-103 (Repton School): 27 statements rated = 64%
  // sch-104 (Emirates Int): 18 statements rated = 43%
  // sch-105 (Dubai British): 8 statements rated = 19%

  const schoolRatingsConfig = [
    { schoolId: 'sch-101', ratedCount: 37, targetPercentage: 88, status: 'Under Inspection' },
    { schoolId: 'sch-102', ratedCount: 42, targetPercentage: 100, status: 'Submitted' },
    { schoolId: 'sch-103', ratedCount: 27, targetPercentage: 64, status: 'In Progress' },
    { schoolId: 'sch-104', ratedCount: 18, targetPercentage: 43, status: 'Draft' },
    { schoolId: 'sch-105', ratedCount: 8, targetPercentage: 19, status: 'Draft' }
  ];

  const allRatingsPayloads = [];

  schoolRatingsConfig.forEach(cfg => {
    const idsToRate = allStmtIds.slice(0, cfg.ratedCount);
    idsToRate.forEach((stmtId, index) => {
      // Generate realistic scores between Level 3, 4, 5
      const userRating = (index % 3 === 0) ? 5 : ((index % 2 === 0) ? 4 : 3);
      const inspectorRating = (index % 4 === 0) ? userRating - 1 : userRating;
      const verdict = (inspectorRating >= userRating) ? 'Approved' : 'Needs Revision';
      const notes = verdict === 'Approved' 
        ? `Verified by KHDA Auditor. Standard ${stmtId} meets Quality Careers criteria.`
        : `Requires additional documentation for Standard ${stmtId}.`;

      allRatingsPayloads.push({
        school_id: cfg.schoolId,
        statement_id: stmtId,
        user_rating: userRating,
        inspector_rating: inspectorRating,
        inspector_verdict: verdict,
        inspector_notes: notes,
        updated_at: new Date().toISOString()
      });
    });
  });

  console.log(`2. Seeding ${allRatingsPayloads.length} SEF Ratings across all 5 schools...`);
  const { error: ratErr } = await supabase.from('sef_ratings').upsert(allRatingsPayloads, { onConflict: 'school_id,statement_id' });
  if (ratErr) console.error('Ratings Error:', ratErr);
  else console.log('✓ SEF Ratings & Inspector Reviews synced successfully.');

  // 3. Seed Schools Table with aligned completion percentages
  console.log('3. Seeding Schools Table...');
  const schoolPayloads = DUBAI_SCHOOLS.map(s => {
    const cfg = schoolRatingsConfig.find(c => c.schoolId === s.id);
    const actualPct = cfg ? Math.round((cfg.ratedCount / allStmtIds.length) * 100) : s.completionPercentage;
    return {
      id: s.id,
      name: s.name,
      curriculum: s.curriculum,
      khda_rating: s.khdaRating,
      district: s.district,
      completion_percentage: actualPct,
      status: s.status || 'Draft',
      assigned_inspector: s.assignedInspector || 'Dr. Sarah Al Mansoori'
    };
  });
  const { error: schErr } = await supabase.from('schools').upsert(schoolPayloads);
  if (schErr) console.error('Schools Error:', schErr);
  else console.log('✓ Schools synced successfully with calculated completion percentages.');

  // 4. Seed Multi-Modal Evidence Items for sch-101 and sch-102
  console.log('4. Seeding Evidence Items Table...');
  const initialEvidence = [
    {
      id: 'ev-1',
      school_id: 'sch-101',
      statement_id: 'stmt-1_1',
      type: 'audio',
      title: 'Interview Voice Note - Principal & Head of Careers',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      date: 'Sept 12, 2026',
      note: 'Voice note discussing 4-year strategic career framework backing.'
    },
    {
      id: 'ev-2',
      school_id: 'sch-101',
      statement_id: 'stmt-1_1',
      type: 'file',
      title: 'School Board Resolution for Quality Careers 2026-2030.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      date: 'Sept 10, 2026'
    },
    {
      id: 'ev-3',
      school_id: 'sch-101',
      statement_id: 'stmt-2_1',
      type: 'video',
      title: 'Student University Fair & Career Guidance Session.mp4',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      date: 'Sept 14, 2026'
    },
    {
      id: 'ev-4',
      school_id: 'sch-101',
      statement_id: 'stmt-4_1',
      type: 'image',
      title: 'Interactive Digital Careers Hub & Bulletin Board.png',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      date: 'Sept 11, 2026'
    },
    {
      id: 'ev-5',
      school_id: 'sch-101',
      statement_id: 'stmt-3_1a',
      type: 'link',
      title: 'Dubai Future Academy Student Internship Portal',
      url: 'https://careers.dubaieducation2033.ae',
      date: 'Sept 13, 2026'
    }
  ];

  const { error: evErr } = await supabase.from('evidence_items').upsert(initialEvidence);
  if (evErr) console.error('Evidence Error:', evErr);
  else console.log('✓ Multi-Modal Evidence Items synced successfully.');

  console.log('🎉 ALL TABLES IN SUPABASE POSTGRESQL ARE NOW 100% ALIGNED WITH FRONTEND!');
}

seedAll();
