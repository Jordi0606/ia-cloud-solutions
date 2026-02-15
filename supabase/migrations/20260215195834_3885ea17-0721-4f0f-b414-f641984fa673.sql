
-- Create contacts table for storing form submissions
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit a contact request"
ON public.contact_requests
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read (for future admin)
CREATE POLICY "Authenticated users can read contact requests"
ON public.contact_requests
FOR SELECT
USING (auth.role() = 'authenticated');
