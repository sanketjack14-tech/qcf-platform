import { createClient } from '@supabase/supabase-js';
import { DUBAI_SCHOOLS, QCF_STATEMENTS, sortStatements } from '../data/qcfData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rifnbkzdhwjbdrffqwzs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZm5ia3pkaHdqYmRyZmZxd3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTQwNTgsImV4cCI6MjEwNTQ5MDA1OH0.iPwCyTuAQdUjvIe91Nks7dCrmBtTcB0fovGsX5VgwJg';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// SEED INITIAL DATABASE DATA IF EMPTY
// ==========================================
export async function seedInitialDatabaseIfEmpty() {
  if (!isSupabaseConfigured) return;

  try {
    // 1. Seed Statements
    const { data: stmts, error: stmtErr } = await supabase.from('qcf_statements').select('id').limit(1);
    if (!stmtErr && (!stmts || stmts.length === 0)) {
      console.log('Supabase: Seeding initial 42 KHDA standards into PostgreSQL DB...');
      const stmtPayloads = QCF_STATEMENTS.map(s => ({
        id: s.id,
        code: s.code,
        domain_number: s.domainNumber,
        statement: s.statement,
        default_rating: s.defaultRating || 3,
        evidence_count: s.evidenceCount || 0,
        hidden: Boolean(s.hidden)
      }));
      await supabase.from('qcf_statements').upsert(stmtPayloads);
    }

    // 2. Seed Schools
    const { data: schs, error: schErr } = await supabase.from('schools').select('id').limit(1);
    if (!schErr && (!schs || schs.length === 0)) {
      console.log('Supabase: Seeding initial Dubai schools directory into PostgreSQL DB...');
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
      await supabase.from('schools').upsert(schoolPayloads);
    }
  } catch (e) {
    console.error('Supabase seedInitialDatabaseIfEmpty exception:', e);
  }
}

// ==========================================
// 1. STATEMENTS (42 KHDA STANDARDS)
// ==========================================
export async function getStatementsFromDB() {
  if (!isSupabaseConfigured) return null;
  try {
    await seedInitialDatabaseIfEmpty();

    const { data, error } = await supabase
      .from('qcf_statements')
      .select('*');

    if (error || !data || data.length === 0) {
      return null;
    }

    const formatted = data.map(item => ({
      id: item.id,
      code: item.code,
      domainNumber: item.domain_number,
      statement: item.statement,
      defaultRating: item.default_rating || 3,
      evidenceCount: item.evidence_count || 0,
      hidden: item.hidden || false
    }));

    return sortStatements(formatted);
  } catch (err) {
    console.error('Supabase getStatementsFromDB error:', err);
    return null;
  }
}

export async function saveStatementToDB(stmt) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: stmt.id,
      code: stmt.code,
      domain_number: stmt.domainNumber,
      statement: stmt.statement,
      default_rating: stmt.defaultRating || 3,
      evidence_count: stmt.evidenceCount || 0,
      hidden: Boolean(stmt.hidden)
    };
    const { error } = await supabase.from('qcf_statements').upsert(payload);
    if (error) console.error('Supabase saveStatement error:', error);
  } catch (err) {
    console.error('Supabase saveStatementToDB exception:', err);
  }
}

// ==========================================
// 2. SCHOOLS DIRECTORY
// ==========================================
export async function getSchoolsFromDB() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('schools')
      .select('*');

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map(item => ({
      id: item.id,
      name: item.name,
      curriculum: item.curriculum,
      khdaRating: item.khda_rating,
      district: item.district,
      completionPercentage: item.completion_percentage || 0,
      status: item.status || 'Draft',
      assignedInspector: item.assigned_inspector || 'Dr. Sarah Al Mansoori'
    }));
  } catch (err) {
    console.error('Supabase getSchoolsFromDB exception:', err);
    return null;
  }
}

export async function saveSchoolToDB(school) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: school.id,
      name: school.name,
      curriculum: school.curriculum,
      khda_rating: school.khdaRating,
      district: school.district,
      completion_percentage: school.completionPercentage,
      status: school.status,
      assigned_inspector: school.assignedInspector
    };
    await supabase.from('schools').upsert(payload);
  } catch (err) {
    console.error('Supabase saveSchoolToDB exception:', err);
  }
}

// ==========================================
// 3. SEF RATINGS & INSPECTOR REVIEWS
// ==========================================
export async function getRatingsFromDB(schoolId) {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('sef_ratings')
      .select('*')
      .eq('school_id', schoolId);

    if (error || !data) return null;

    const userRatings = {};
    const inspectorRatings = {};
    const inspectorVerdicts = {};
    const inspectorNotes = {};

    data.forEach(row => {
      if (row.user_rating) userRatings[row.statement_id] = row.user_rating;
      if (row.inspector_rating) inspectorRatings[row.statement_id] = row.inspector_rating;
      if (row.inspector_verdict) inspectorVerdicts[row.statement_id] = row.inspector_verdict;
      if (row.inspector_notes) inspectorNotes[row.statement_id] = row.inspector_notes;
    });

    return { userRatings, inspectorRatings, inspectorVerdicts, inspectorNotes };
  } catch (err) {
    console.error('Supabase getRatingsFromDB exception:', err);
    return null;
  }
}

export async function saveUserRatingToDB(schoolId, statementId, userRating) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('sef_ratings').upsert({
      school_id: schoolId,
      statement_id: statementId,
      user_rating: userRating,
      updated_at: new Date().toISOString()
    }, { onConflict: 'school_id,statement_id' });
  } catch (err) {
    console.error('Supabase saveUserRatingToDB error:', err);
  }
}

export async function saveAllUserRatingsToDB(schoolId, userRatings) {
  if (!isSupabaseConfigured || !schoolId || !userRatings) return;
  try {
    const rows = Object.entries(userRatings).map(([stmtId, level]) => ({
      school_id: schoolId,
      statement_id: stmtId,
      user_rating: level,
      updated_at: new Date().toISOString()
    }));
    if (rows.length > 0) {
      await supabase.from('sef_ratings').upsert(rows, { onConflict: 'school_id,statement_id' });
    }
  } catch (err) {
    console.error('Supabase saveAllUserRatingsToDB error:', err);
  }
}

export async function saveInspectorReviewToDB(schoolId, statementId, rating, verdict, notes) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      school_id: schoolId,
      statement_id: statementId,
      updated_at: new Date().toISOString()
    };
    if (rating !== undefined) payload.inspector_rating = rating;
    if (verdict !== undefined) payload.inspector_verdict = verdict;
    if (notes !== undefined) payload.inspector_notes = notes;

    await supabase.from('sef_ratings').upsert(payload, { onConflict: 'school_id,statement_id' });
  } catch (err) {
    console.error('Supabase saveInspectorReviewToDB error:', err);
  }
}

// ==========================================
// 4. MULTI-MODAL EVIDENCE & STORAGE VAULT
// ==========================================
export async function getEvidenceFromDB(schoolId) {
  if (!isSupabaseConfigured) return null;
  try {
    let query = supabase.from('evidence_items').select('*');
    if (schoolId) query = query.eq('school_id', schoolId);

    const { data, error } = await query;
    if (error || !data) return null;

    return data.map(item => ({
      id: item.id,
      statementId: item.statement_id,
      schoolId: item.school_id,
      type: item.type,
      title: item.title,
      url: item.url,
      date: item.date,
      note: item.note
    }));
  } catch (err) {
    console.error('Supabase getEvidenceFromDB error:', err);
    return null;
  }
}

export async function saveEvidenceToDB(evidence) {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: evidence.id,
      statement_id: evidence.statementId,
      school_id: evidence.schoolId || 'sch-101',
      type: evidence.type,
      title: evidence.title,
      url: evidence.url,
      date: evidence.date || new Date().toLocaleDateString(),
      note: evidence.note || ''
    };
    await supabase.from('evidence_items').upsert(payload);
  } catch (err) {
    console.error('Supabase saveEvidenceToDB error:', err);
  }
}

export async function deleteEvidenceFromDB(id) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from('evidence_items').delete().eq('id', id);
  } catch (err) {
    console.error('Supabase deleteEvidenceFromDB error:', err);
  }
}

// Upload Blob/File to Supabase Cloud Storage Vault
export async function uploadMediaToSupabaseVault(fileOrBlob, fileName) {
  if (!isSupabaseConfigured) return null;
  try {
    const bucketName = 'qcf-evidence-vault';
    const filePath = `uploads/${Date.now()}_${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileOrBlob, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('Supabase uploadMediaToSupabaseVault exception:', err);
    return null;
  }
}
