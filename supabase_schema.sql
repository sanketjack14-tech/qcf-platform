-- ====================================================================
-- QUALITY CAREERS FRAMEWORK (QCF) DUBAI — SUPABASE POSTGRESQL SCHEMA
-- Execute this SQL script in your Supabase SQL Editor (https://app.supabase.com)
-- ====================================================================

-- 1. Create QCF Statements Table (42 KHDA Core Standards)
CREATE TABLE IF NOT EXISTS qcf_statements (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    domain_number INT NOT NULL,
    statement TEXT NOT NULL,
    default_rating INT DEFAULT 3,
    evidence_count INT DEFAULT 0,
    hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Schools Directory Table
CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    curriculum TEXT NOT NULL,
    khda_rating TEXT NOT NULL,
    district TEXT NOT NULL,
    completion_percentage INT DEFAULT 0,
    status TEXT DEFAULT 'Draft',
    assigned_inspector TEXT DEFAULT 'Dr. Sarah Al Mansoori',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create SEF Ratings & Inspector Reviews Table
CREATE TABLE IF NOT EXISTS sef_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    school_id TEXT NOT NULL,
    statement_id TEXT NOT NULL,
    user_rating INT,
    inspector_rating INT,
    inspector_verdict TEXT,
    inspector_notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, statement_id)
);

-- 4. Create Multi-Modal Evidence Vault Table
CREATE TABLE IF NOT EXISTS evidence_items (
    id TEXT PRIMARY KEY,
    school_id TEXT NOT NULL,
    statement_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    date TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Enable Row Level Security (RLS) & Public Policies for Demo
ALTER TABLE qcf_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE sef_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on qcf_statements" ON qcf_statements FOR SELECT USING (true);
CREATE POLICY "Allow public write access on qcf_statements" ON qcf_statements FOR ALL USING (true);

CREATE POLICY "Allow public read access on schools" ON schools FOR SELECT USING (true);
CREATE POLICY "Allow public write access on schools" ON schools FOR ALL USING (true);

CREATE POLICY "Allow public read access on sef_ratings" ON sef_ratings FOR SELECT USING (true);
CREATE POLICY "Allow public write access on sef_ratings" ON sef_ratings FOR ALL USING (true);

CREATE POLICY "Allow public read access on evidence_items" ON evidence_items FOR SELECT USING (true);
CREATE POLICY "Allow public write access on evidence_items" ON evidence_items FOR ALL USING (true);

-- 6. Storage Bucket Setup (Execute in Storage section or via SQL)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('qcf-evidence-vault', 'qcf-evidence-vault', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on qcf-evidence-vault" ON storage.objects FOR SELECT USING (bucket_id = 'qcf-evidence-vault');
CREATE POLICY "Allow public upload on qcf-evidence-vault" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'qcf-evidence-vault');
