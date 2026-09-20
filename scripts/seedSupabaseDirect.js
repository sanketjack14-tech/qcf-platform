import { createClient } from '@supabase/supabase-js';
import { DUBAI_SCHOOLS, QCF_STATEMENTS } from '../src/data/qcfData.js';

const supabaseUrl = 'https://rifnbkzdhwjbdrffqwzs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZm5ia3pkaHdqYmRyZmZxd3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTQwNTgsImV4cCI6MjEwNTQ5MDA1OH0.iPwCyTuAQdUjvIe91Nks7dCrmBtTcB0fovGsX5VgwJg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDirectly() {
  console.log('Seeding Schools Table...');
  const schoolPayloads = DUBAI_SCHOOLS.map(s => ({
    id: s.id,
    name: s.name,
    curriculum: s.curriculum,
    khda_rating: s.khdaRating,
    district: s.district,
    completion_percentage: s.completionPercentage || 0,
    status: s.status || 'Draft',
    assigned_inspector: s.assignedInspector || 'Dr. Sarah Al Mansoori'
  }));

  const { data: schData, error: schErr } = await supabase.from('schools').upsert(schoolPayloads);
  if (schErr) {
    console.error('Schools Seed Error:', schErr);
  } else {
    console.log('✓ Schools successfully seeded into Supabase PostgreSQL!');
  }

  console.log('Seeding QCF Statements Table (42 KHDA Standards)...');
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

  const { data: stmtData, error: stmtErr } = await supabase.from('qcf_statements').upsert(stmtPayloads);
  if (stmtErr) {
    console.error('Statements Seed Error:', stmtErr);
  } else {
    console.log('✓ 42 KHDA Core Standards successfully seeded into Supabase PostgreSQL!');
  }
}

seedDirectly();
