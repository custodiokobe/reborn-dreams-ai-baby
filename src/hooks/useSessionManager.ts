
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface BabyAttempt {
  id: string;
  session_id: string;
  image_1_url: string | null;
  image_2_url: string | null;
  created_at: string;
}

export const useSessionManager = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [hasExistingAttempt, setHasExistingAttempt] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Gerar ou recuperar session_id do localStorage
  useEffect(() => {
    let storedSessionId = localStorage.getItem('baby_session_id');
    
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('baby_session_id', storedSessionId);
    }
    
    setSessionId(storedSessionId);
    checkExistingAttempt(storedSessionId);
  }, []);

  // Verificar se já existe uma tentativa para esta sessão
  const checkExistingAttempt = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('baby_attempts')
        .select('*')
        .eq('session_id', sessionId)
        .limit(1);

      if (error) {
        console.error('Erro ao verificar tentativa existente:', error);
        setHasExistingAttempt(false);
        return;
      }

      setHasExistingAttempt(data && data.length > 0);
    } catch (error) {
      console.error('Erro na verificação de sessão:', error);
      setHasExistingAttempt(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Upload de imagem para o bucket
  const uploadImage = async (file: File, fileName: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${fileName}_${Date.now()}.${fileExt}`;
      const filePath = `baby_attempts/${sessionId}/${uniqueFileName}`;

      const { data, error } = await supabase.storage
        .from('baby-attempts')
        .upload(filePath, file);

      if (error) {
        console.error('Erro no upload da imagem:', error);
        return null;
      }

      // Obter URL pública
      const { data: publicUrlData } = supabase.storage
        .from('baby-attempts')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      return null;
    }
  };

  // Salvar tentativa no banco de dados
  const saveAttempt = async (image1Url: string, image2Url: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('baby_attempts')
        .insert({
          session_id: sessionId,
          image_1_url: image1Url,
          image_2_url: image2Url
        });

      if (error) {
        console.error('Erro ao salvar tentativa:', error);
        return false;
      }

      setHasExistingAttempt(true);
      return true;
    } catch (error) {
      console.error('Erro ao salvar tentativa:', error);
      return false;
    }
  };

  // Chamar webhook do n8n - PRODUÇÃO
  const callWebhook = async (image1Url: string, image2Url: string) => {
    try {
      console.log('Chamando webhook com sessionId:', sessionId);
      const response = await fetch('https://primary-production-4dd0.up.railway.app/webhook/generate baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          image_1_url: image1Url,
          image_2_url: image2Url
        })
      });

      console.log('Webhook chamado:', response.status);
      return response.ok;
    } catch (error) {
      console.error('Erro ao chamar webhook:', error);
      return false;
    }
  };

  // Verificar se existe imagem gerada na tabela baby_ai usando realtime
  const startPollingForGeneratedImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      console.log('Iniciando polling para sessionId:', sessionId);
      
      // Primeiro, verificar se já existe uma imagem
      const checkExistingImage = async () => {
        try {
          const { data, error } = await supabase
            .from('baby_ai')
            .select('image_url')
            .eq('sessionId', sessionId)
            .single();

          if (!error && data?.image_url) {
            console.log('Imagem já existe:', data.image_url);
            resolve(data.image_url);
            return true;
          }
        } catch (error) {
          console.log('Nenhuma imagem existente encontrada');
        }
        return false;
      };

      // Verificar se já existe
      checkExistingImage().then(exists => {
        if (exists) return;

        // Se não existe, configurar realtime subscription
        const channel = supabase
          .channel('baby_ai_changes')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'baby_ai',
              filter: `sessionId=eq.${sessionId}`
            },
            (payload) => {
              console.log('Nova imagem detectada via realtime:', payload);
              const imageUrl = payload.new?.image_url;
              if (imageUrl) {
                console.log('Resolvendo com imagem:', imageUrl);
                channel.unsubscribe();
                resolve(imageUrl);
              }
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'baby_ai',
              filter: `sessionId=eq.${sessionId}`
            },
            (payload) => {
              console.log('Imagem atualizada via realtime:', payload);
              const imageUrl = payload.new?.image_url;
              if (imageUrl) {
                console.log('Resolvendo com imagem atualizada:', imageUrl);
                channel.unsubscribe();
                resolve(imageUrl);
              }
            }
          )
          .subscribe();

        // Fallback: polling manual a cada 5 segundos
        const pollInterval = setInterval(async () => {
          console.log('Verificação manual de imagem...');
          const hasImage = await checkExistingImage();
          if (hasImage) {
            clearInterval(pollInterval);
            channel.unsubscribe();
          }
        }, 5000);

        // Timeout após 5 minutos
        setTimeout(() => {
          clearInterval(pollInterval);
          channel.unsubscribe();
          reject(new Error('Timeout: Imagem não foi gerada em 5 minutos'));
        }, 300000);
      });
    });
  };

  // Resetar sessão (para casos específicos)
  const resetSession = () => {
    const newSessionId = uuidv4();
    localStorage.setItem('baby_session_id', newSessionId);
    setSessionId(newSessionId);
    setHasExistingAttempt(false);
  };

  return {
    sessionId,
    hasExistingAttempt,
    isLoading,
    uploadImage,
    saveAttempt,
    callWebhook,
    startPollingForGeneratedImage,
    resetSession,
    checkExistingAttempt: () => checkExistingAttempt(sessionId)
  };
};
