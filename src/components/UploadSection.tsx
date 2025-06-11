
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, CreditCard } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';

interface UploadSectionProps {
  photo1: File | null;
  photo2: File | null;
  isGenerating: boolean;
  hasExistingAttempt: boolean;
  userCredits: number;
  canGenerate: boolean;
  onPhoto1Select: (file: File | null) => void;
  onPhoto2Select: (file: File | null) => void;
  onGenerateBaby: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  photo1,
  photo2,
  isGenerating,
  hasExistingAttempt,
  userCredits,
  canGenerate,
  onPhoto1Select,
  onPhoto2Select,
  onGenerateBaby
}) => {
  const hasPhotos = photo1 && photo2 && !isGenerating;
  const canProceed = hasPhotos && canGenerate;

  const getButtonText = () => {
    if (isGenerating) return 'Processando...';
    if (!hasPhotos) return 'Envie as duas fotos primeiro';
    if (!hasExistingAttempt) return 'Gerar Bebê Reborn (Grátis)';
    if (userCredits > 0) return 'Gerar Bebê Reborn (1 Crédito)';
    return 'Comprar Créditos (R$ 10,00)';
  };

  const getButtonIcon = () => {
    if (!hasExistingAttempt || userCredits > 0) {
      return <Heart className="w-6 h-6 mr-3 fill-current" />;
    }
    return <CreditCard className="w-6 h-6 mr-3" />;
  };

  return (
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
                onPhotoSelect={onPhoto1Select}
                photo={photo1}
              />
            </div>
            
            <div className="animate-slide-up delay-200">
              <PhotoUpload 
                label="Foto 2 (Outra pessoa)"
                onPhotoSelect={onPhoto2Select}
                photo={photo2}
              />
            </div>
          </div>

          <div className="text-center animate-slide-up delay-300">
            <Button
              size="lg"
              onClick={onGenerateBaby}
              disabled={!hasPhotos}
              className={`
                px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105
                ${hasPhotos 
                  ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              {getButtonIcon()}
              {getButtonText()}
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
            
            {!hasPhotos && !isGenerating && (
              <p className="text-sm text-muted-foreground mt-4">
                Você precisa enviar duas fotos para continuar ✨
              </p>
            )}

            {hasPhotos && hasExistingAttempt && userCredits === 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Adquira 3 créditos por R$ 10,00 para gerar mais imagens ✨
              </p>
            )}

            {hasPhotos && hasExistingAttempt && userCredits > 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Você tem {userCredits} crédito{userCredits > 1 ? 's' : ''} disponível{userCredits > 1 ? 'eis' : ''} ✨
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
