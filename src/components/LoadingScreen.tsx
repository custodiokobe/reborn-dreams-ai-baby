
import React, { useEffect, useState } from 'react';
import { useSessionManager } from '@/hooks/useSessionManager';

interface LoadingScreenProps {
  onImageGenerated: (imageUrl: string) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onImageGenerated }) => {
  const { startPollingForGeneratedImage } = useSessionManager();
  const [dots, setDots] = useState(1);

  useEffect(() => {
    // Animação dos pontos
    const dotsInterval = setInterval(() => {
      setDots(prev => prev >= 3 ? 1 : prev + 1);
    }, 500);

    // Iniciar polling para imagem gerada
    const startPolling = async () => {
      try {
        console.log('Iniciando polling para imagem gerada...');
        const imageUrl = await startPollingForGeneratedImage();
        console.log('Imagem gerada recebida:', imageUrl);
        onImageGenerated(imageUrl);
      } catch (error) {
        console.error('Erro no polling:', error);
        // Aqui você pode adicionar um toast de erro se necessário
      }
    };

    startPolling();

    return () => {
      clearInterval(dotsInterval);
    };
  }, [startPollingForGeneratedImage, onImageGenerated]);

  return (
    <div className="min-h-screen gradient-pastel flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent/30 rounded-full floating"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-secondary/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-primary/30 rounded-full floating delay-500"></div>
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="relative inline-block">
            <img 
              src="/lovable-uploads/6948e8a3-4697-4eb9-a643-c604ee5f25ef.png" 
              alt="Revela Baby" 
              className="w-20 h-20 pulse-soft"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping"></div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gradient mb-4">
          Criando um bebê cheio de amor para você{'.'.repeat(dots)}
        </h2>
        
        <p className="text-muted-foreground mb-8">
          Nossa inteligência artificial está combinando as características mais especiais das fotos enviadas
        </p>
        
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
