
-- Create storage bucket for baby attempt images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'baby-attempts',
  'baby-attempts',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create storage policy to allow public access
CREATE POLICY "Public Access" ON storage.objects
FOR ALL USING (bucket_id = 'baby-attempts');

-- Create baby_attempts table
CREATE TABLE public.baby_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  image_1_url TEXT,
  image_2_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.baby_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for session validation)
CREATE POLICY "Allow public read access" ON public.baby_attempts
  FOR SELECT
  USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON public.baby_attempts
  FOR INSERT
  WITH CHECK (true);
