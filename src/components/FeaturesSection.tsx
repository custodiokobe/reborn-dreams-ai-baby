
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
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
  );
};

export default FeaturesSection;
