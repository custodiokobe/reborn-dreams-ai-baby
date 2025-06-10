
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Gift } from 'lucide-react';

interface ResultScreenProps {
  onOrderClick: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onOrderClick }) => {
  const babyNames = ['Luna', 'Sofia', 'Maya', 'Aurora', 'Isabella', 'Valentina', 'Gabriel', 'Miguel', 'Lorenzo'];
  const randomName = babyNames[Math.floor(Math.random() * babyNames.length)];

  return (
    <div className="min-h-screen gradient-pastel py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Conheça o Bebê Reborn que criamos para você!
          </h1>
          <p className="text-xl text-muted-foreground">
            Este é o Baby {randomName} ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Baby Image */}
          <div className="animate-slide-up">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center"
                    alt={`Baby ${randomName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Novo! ✨
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onOrderClick}
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Quero meu Bebê Reborn Real
              </Button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6 animate-slide-up delay-200">
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-current" />
                  Personalize seu Bebê
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Tamanho
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        Padrão (45cm)
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Personalizado
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Acessórios
                    </label>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Gift className="w-4 h-4 mr-2" />
                        Com roupa + chupeta
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Gift className="w-4 h-4 mr-2" />
                        Com berço completo
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Sem acessórios
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg bg-gradient-to-br from-accent/20 to-secondary/20">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold mb-2">💝 Oferta Especial</h4>
                <p className="text-muted-foreground mb-4">
                  Primeiros 100 clientes ganham kit de cuidados grátis!
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onOrderClick}
                >
                  Solicitar Produção
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
