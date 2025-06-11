
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import UploadSection from '@/components/UploadSection';
import FeaturesSection from '@/components/FeaturesSection';
import LoadingScreen from '@/components/LoadingScreen';
import ResultScreen from '@/components/ResultScreen';
import Footer from '@/components/Footer';
import { useSessionManager } from '@/hooks/useSessionManager';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'loading' | 'result'>('upload');
  const [photo1, setPhoto1] = useState<File | null>(null);
  const [photo2, setPhoto2] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  
  const {
    sessionId,
    hasExistingAttempt,
    userCredits,
    isLoading: sessionLoading,
    canGenerate,
    consumeCredit,
    uploadImage,
    saveAttempt,
    callWebhook,
    saveWishlistRequest
  } = useSessionManager();

  const handleImageGenerated = (imageUrl: string) => {
    console.log('Imagem gerada recebida:', imageUrl);
    setGeneratedImageUrl(imageUrl);
    setCurrentStep('result');
  };

  const handleGenerateBaby = async () => {
    if (!photo1 || !photo2) {
      toast({
        title: "Erro",
        description: "Por favor, envie as duas fotos primeiro.",
        variant: "destructive"
      });
      return;
    }

    // Verificar se pode gerar
    if (!canGenerate()) {
      // Redirecionar para compra de créditos
      toast({
        title: "Créditos necessários",
        description: "Redirecionando para compra de créditos...",
      });
      window.open('https://buy.stripe.com/5kQ6oI0j1cvF2Fj2hW9EI01', '_blank');
      return;
    }

    try {
      setIsGenerating(true);
      toast({
        title: "Processando",
        description: "Fazendo upload das imagens...",
      });

      // Se não é primeira tentativa, consumir crédito
      if (hasExistingAttempt) {
        const creditConsumed = await consumeCredit();
        if (!creditConsumed) {
          toast({
            title: "Erro",
            description: "Não foi possível consumir o crédito. Tente novamente.",
            variant: "destructive"
          });
          return;
        }
      }

      // Upload das imagens
      const image1Url = await uploadImage(photo1, 'image_1');
      const image2Url = await uploadImage(photo2, 'image_2');

      if (!image1Url || !image2Url) {
        throw new Error('Falha no upload das imagens');
      }

      // Salvar tentativa no banco (se for primeira vez)
      if (!hasExistingAttempt) {
        const saved = await saveAttempt(image1Url, image2Url);
        if (!saved) {
          throw new Error('Falha ao salvar tentativa');
        }
      }

      // Chamar webhook
      const webhookSuccess = await callWebhook(image1Url, image2Url);
      if (!webhookSuccess) {
        throw new Error('Falha ao chamar webhook');
      }

      toast({
        title: "Sucesso",
        description: "Imagens enviadas! Gerando seu bebê reborn...",
      });

      // Ir para tela de loading
      setCurrentStep('loading');

    } catch (error) {
      console.error('Erro na geração:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTryAgain = () => {
    if (!canGenerate()) {
      // Redirecionar para compra de créditos
      window.open('https://buy.stripe.com/5kQ6oI0j1cvF2Fj2hW9EI01', '_blank');
    } else {
      // Voltar para o início
      setCurrentStep('upload');
      setPhoto1(null);
      setPhoto2(null);
      setGeneratedImageUrl('');
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen gradient-pastel flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/lovable-uploads/6948e8a3-4697-4eb9-a643-c604ee5f25ef.png" 
            alt="Revela Baby" 
            className="w-12 h-12 animate-pulse mx-auto mb-4"
          />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'loading') {
    return <LoadingScreen onImageGenerated={handleImageGenerated} />;
  }

  if (currentStep === 'result') {
    return (
      <div>
        <Header />
        <ResultScreen 
          generatedImageUrl={generatedImageUrl}
          onTryAgain={handleTryAgain}
          onSaveWishlistRequest={saveWishlistRequest}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-pastel">
      <Header />
      <HeroSection 
        hasExistingAttempt={hasExistingAttempt} 
        userCredits={userCredits}
      />
      <UploadSection 
        photo1={photo1}
        photo2={photo2}
        isGenerating={isGenerating}
        hasExistingAttempt={hasExistingAttempt}
        userCredits={userCredits}
        canGenerate={canGenerate()}
        onPhoto1Select={setPhoto1}
        onPhoto2Select={setPhoto2}
        onGenerateBaby={handleGenerateBaby}
      />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
