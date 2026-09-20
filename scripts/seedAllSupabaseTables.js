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

  const allStmtIds = stmtPayloads.map(s => s.id);

  // 2. Clear all ratings for other schools, keep ONLY sch-101 (37 rated standards = 88%)
  console.log('2. Resetting ratings and keeping ONLY sch-101 (Dubai International Academy)...');
  await supabase.from('sef_ratings').delete().neq('school_id', 'sch-101');

  const sch101Ratings = [];
  const idsToRate = allStmtIds.slice(0, 37);
  idsToRate.forEach((stmtId, index) => {
    const userRating = (index % 3 === 0) ? 5 : ((index % 2 === 0) ? 4 : 3);
    const inspectorRating = (index % 4 === 0) ? userRating - 1 : userRating;
    const verdict = (inspectorRating >= userRating) ? 'Approved' : 'Needs Revision';
    const notes = verdict === 'Approved' 
      ? `Verified by KHDA Auditor. Standard ${stmtId} meets Quality Careers criteria.`
      : `Requires additional documentation for Standard ${stmtId}.`;

    sch101Ratings.push({
      school_id: 'sch-101',
      statement_id: stmtId,
      user_rating: userRating,
      inspector_rating: inspectorRating,
      inspector_verdict: verdict,
      inspector_notes: notes,
      updated_at: new Date().toISOString()
    });
  });

  const { error: ratErr } = await supabase.from('sef_ratings').upsert(sch101Ratings, { onConflict: 'school_id,statement_id' });
  if (ratErr) console.error('Ratings Error:', ratErr);
  else console.log(`✓ 37 SEF Ratings for Dubai International Academy synced. All other schools cleared.`);

  // 3. Seed Schools Table
  console.log('3. Seeding Schools Table...');
  const schoolPayloads = DUBAI_SCHOOLS.map(s => ({
    id: s.id,
    name: s.name,
    curriculum: s.curriculum,
    khda_rating: s.khdaRating,
    district: s.district,
    completion_percentage: s.id === 'sch-101' ? 88 : 0,
    status: s.id === 'sch-101' ? 'Under Inspection' : 'Draft',
    assigned_inspector: s.assignedInspector || 'Dr. Sarah Al Mansoori'
  }));
  const { error: schErr } = await supabase.from('schools').upsert(schoolPayloads);
  if (schErr) console.error('Schools Error:', schErr);
  else console.log('✓ Schools synced: sch-101 = 88%, all other schools = 0% / Draft.');

  // 4. Seed Multi-Modal Evidence Items ONLY for sch-101
  console.log('4. Seeding Evidence Items Table for sch-101...');
  await supabase.from('evidence_items').delete().neq('school_id', 'sch-101');

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
  else console.log('✓ Multi-Modal Evidence Items for sch-101 synced.');

  console.log('🎉 ALL NON-SCH-101 SUBMISSIONS & INSPECTOR EVALUATIONS CLEARED SUCCESSFULLY!');
}

seedAll();
