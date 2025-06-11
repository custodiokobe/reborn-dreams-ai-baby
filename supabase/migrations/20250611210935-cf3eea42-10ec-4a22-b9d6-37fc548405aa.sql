
-- Criar tabela para controle de créditos por session_id
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  credits INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela user_credits
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura/escrita de créditos (público para session_id)
CREATE POLICY "Allow access to user_credits" ON public.user_credits
FOR ALL
USING (true);

-- Criar tabela para wishlist de bonecas reborn
CREATE TABLE public.wishlist_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  image_baby_url TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela wishlist_requests
ALTER TABLE public.wishlist_requests ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção e leitura de wishlist
CREATE POLICY "Allow access to wishlist_requests" ON public.wishlist_requests
FOR ALL
USING (true);

-- Criar tabela para formulários de contato
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de formulários de contato
CREATE POLICY "Allow contact form submissions" ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at na tabela user_credits
CREATE TRIGGER update_user_credits_updated_at 
    BEFORE UPDATE ON public.user_credits 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
