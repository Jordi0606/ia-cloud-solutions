-- Restrict reading contact requests to admins only
CREATE POLICY "Only admins can read contact requests"
ON public.contact_request
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));
