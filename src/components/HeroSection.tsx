
import React from 'react';
import { Sparkles, ArrowDown, CreditCard } from 'lucide-react';

interface HeroSectionProps {
  hasExistingAttempt: boolean;
  userCredits: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hasExistingAttempt, userCredits }) => {
  return (
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
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="font-semibold">Seus Créditos: {userCredits}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {userCredits > 0 
                    ? `Você tem ${userCredits} crédito${userCredits > 1 ? 's' : ''} disponível${userCredits > 1 ? 'eis' : ''}.`
                    : 'Adquira 3 créditos por R$ 10,00 para gerar mais imagens.'
                  }
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
  );
};

export default HeroSection;
