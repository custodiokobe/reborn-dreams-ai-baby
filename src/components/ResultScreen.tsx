
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Star } from 'lucide-react';
import WishlistForm from '@/components/WishlistForm';

interface ResultScreenProps {
  onTryAgain?: () => void;
  generatedImageUrl?: string;
  onSaveWishlistRequest: (name: string, email: string, phone: string, imageBabyUrl: string) => Promise<boolean>;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ 
  onTryAgain, 
  generatedImageUrl,
  onSaveWishlistRequest 
}) => {
  const [wishlistSubmitted, setWishlistSubmitted] = useState(false);
  const babyNames = ['Luna', 'Sofia', 'Maya', 'Aurora', 'Isabella', 'Valentina', 'Gabriel', 'Miguel', 'Lorenzo'];
  const randomName = babyNames[Math.floor(Math.random() * babyNames.length)];

  const handleWishlistSuccess = () => {
    setWishlistSubmitted(true);
  };

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
                  {generatedImageUrl ? (
                    <img 
                      src={generatedImageUrl}
                      alt={`Baby ${randomName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center"
                      alt={`Baby ${randomName}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Novo! ✨
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-6 space-y-3">
              {onTryAgain && (
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full border-2 border-primary/30 hover:bg-primary/10 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  onClick={onTryAgain}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Tentar Novamente
                </Button>
              )}
            </div>
          </div>

          {/* Wishlist Form */}
          <div className="space-y-6 animate-slide-up delay-200">
            <WishlistForm
              imageBabyUrl={generatedImageUrl || ''}
              onSubmitSuccess={handleWishlistSuccess}
              onSaveWishlistRequest={onSaveWishlistRequest}
            />

            {!wishlistSubmitted && (
              <Card className="border-border/50 shadow-lg bg-gradient-to-br from-accent/20 to-secondary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-primary fill-current" />
                    <h4 className="text-lg font-semibold">✨ Boneca Reborn Personalizada</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Criamos uma boneca reborn física única, baseada na imagem gerada, 
                    com materiais premium e acabamento artesanal.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
