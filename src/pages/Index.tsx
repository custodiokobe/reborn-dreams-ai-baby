
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import PhotoUpload from '@/components/PhotoUpload';
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
  
  const {
    sessionId,
    hasExistingAttempt,
    isLoading: sessionLoading,
    uploadImage,
    saveAttempt,
    callWebhook
  } = useSessionManager();

  const handleGenerateBaby = async () => {
    if (!photo1 || !photo2) {
      toast({
        title: "Erro",
        description: "Por favor, envie as duas fotos primeiro.",
        variant: "destructive"
      });
      return;
    }

    // Se já existe tentativa, redirecionar para Stripe
    if (hasExistingAttempt) {
      toast({
        title: "Nova geração",
        description: "Redirecionando para pagamento...",
      });
      window.open('https://buy.stripe.com/5kQ6oI0j1cvF2Fj2hW9EI01', '_blank');
      return;
    }

    // Primeira geração gratuita - processar
    try {
      setIsGenerating(true);
      toast({
        title: "Processando",
        description: "Fazendo upload das imagens...",
      });

      // Upload das imagens
      const image1Url = await uploadImage(photo1, 'image_1');
      const image2Url = await uploadImage(photo2, 'image_2');

      if (!image1Url || !image2Url) {
        throw new Error('Falha no upload das imagens');
      }

      // Salvar tentativa no banco
      const saved = await saveAttempt(image1Url, image2Url);
      if (!saved) {
        throw new Error('Falha ao salvar tentativa');
      }

      // Chamar webhook
      await callWebhook(image1Url, image2Url);

      toast({
        title: "Sucesso",
        description: "Imagens enviadas! Gerando seu bebê reborn...",
      });

      // Ir para tela de loading
      setCurrentStep('loading');

      // Simular processamento de IA
      setTimeout(() => {
        setCurrentStep('result');
      }, 3000);

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

  const handleOrderClick = () => {
    // Checkout para comprar o bebê reborn físico
    window.open('https://buy.stripe.com/8x2cN61n553d5Rv9Ko9EI00', '_blank');
  };

  const canGenerate = photo1 && photo2 && !isGenerating;

  if (sessionLoading) {
    return (
      <div className="min-h-screen gradient-pastel flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-primary fill-current animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'loading') {
    return <LoadingScreen />;
  }

  if (currentStep === 'result') {
    return (
      <div>
        <Header />
        <ResultScreen 
          onOrderClick={handleOrderClick}
          onTryAgain={() => {
            if (hasExistingAttempt) {
              // Redirecionar para Stripe para nova tentativa
              window.open('https://buy.stripe.com/5kQ6oI0j1cvF2Fj2hW9EI01', '_blank');
            } else {
              // Voltar para o início
              setCurrentStep('upload');
              setPhoto1(null);
              setPhoto2(null);
            }
          }}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-pastel">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 bg-primary/10 rounded-full floating"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-accent/20 rounded-full pulse-soft"></div>
          <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-secondary/30 rounded-full floating delay-300"></div>
          <div className="absolute bottom-20 right-1/3 w-10 h-10 bg-primary/15 rounded-full pulse-soft delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full text-sm font-medium text-accent-foreground mb-6">
                <Sparkles className="w-4 h-4" />
                {!hasExistingAttempt ? "Primeira Geração Grátis!" : "Tecnologia + Amor = Magia"}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6 leading-tight">
                Crie o Bebê Reborn dos Seus Sonhos
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Envie duas fotos e veja o rostinho do bebê criado pela nossa inteligência artificial. 
                {!hasExistingAttempt ? " Sua primeira geração é gratuita! ✨" : " Uma experiência única e emocionante! ✨"}
              </p>

              {hasExistingAttempt && (
                <div className="bg-accent/20 border border-accent/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    Você já utilizou sua geração gratuita. Próximas gerações custam R$ 9,90.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center mb-12">
              <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl font-bold mb-4">Como funciona a magia?</h2>
              <p className="text-muted-foreground text-lg">
                Envie duas fotos especiais e deixe nossa IA criar um bebê único para você
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="animate-slide-up">
                <PhotoUpload 
                  label="Foto 1 (Você ou uma pessoa)"
                  onPhotoSelect={setPhoto1}
                  photo={photo1}
                />
              </div>
              
              <div className="animate-slide-up delay-200">
                <PhotoUpload 
                  label="Foto 2 (Outra pessoa)"
                  onPhotoSelect={setPhoto2}
                  photo={photo2}
                />
              </div>
            </div>

            <div className="text-center animate-slide-up delay-300">
              <Button
                size="lg"
                onClick={handleGenerateBaby}
                disabled={!canGenerate}
                className={`
                  px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105
                  ${canGenerate 
                    ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }
                `}
              >
                <Heart className="w-6 h-6 mr-3 fill-current" />
                {isGenerating 
                  ? 'Processando...'
                  : canGenerate 
                    ? (!hasExistingAttempt ? 'Gerar Bebê Reborn (Grátis)' : 'Gerar Bebê Reborn (R$ 9,90)')
                    : 'Envie as duas fotos primeiro'
                }
                <Sparkles className="w-6 h-6 ml-3" />
              </Button>
              
              {!canGenerate && !isGenerating && (
                <p className="text-sm text-muted-foreground mt-4">
                  Você precisa enviar duas fotos para continuar ✨
                </p>
              )}

              {hasExistingAttempt && canGenerate && (
                <p className="text-sm text-muted-foreground mt-4">
                  Próximas gerações custam R$ 9,90 ✨
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por que escolher nossos bebês reborn?</h2>
              <p className="text-muted-foreground text-lg">
                Cada bebê é criado com amor, cuidado e a mais alta qualidade
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 hover:from-accent/30 hover:to-secondary/30 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">IA Avançada</h3>
                <p className="text-muted-foreground">
                  Tecnologia de ponta que combina características de forma natural e realista
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 hover:from-accent/30 hover:to-secondary/30 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary fill-current" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Feito com Amor</h3>
                <p className="text-muted-foreground">
                  Cada bebê é cuidadosamente criado por artesãs especialistas em reborn
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 hover:from-accent/30 hover:to-secondary/30 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualidade Premium</h3>
                <p className="text-muted-foreground">
                  Materiais de alta qualidade e acabamento perfeito em cada detalhe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
