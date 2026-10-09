CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  company TEXT CHECK (company IS NULL OR char_length(company) <= 150),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 30),
  service_interest TEXT NOT NULL CHECK (char_length(service_interest) <= 100),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);