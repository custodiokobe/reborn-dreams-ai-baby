
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WishlistFormProps {
  imageBabyUrl: string;
  onSubmitSuccess: () => void;
  onSaveWishlistRequest: (name: string, email: string, phone: string, imageBabyUrl: string) => Promise<boolean>;
}

const WishlistForm: React.FC<WishlistFormProps> = ({ 
  imageBabyUrl, 
  onSubmitSuccess, 
  onSaveWishlistRequest 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha seu nome completo.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um número de celular válido.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onSaveWishlistRequest(
        formData.name,
        formData.email,
        formData.phone,
        imageBabyUrl
      );

      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Sucesso!",
          description: "Recebemos seu interesse! Em breve entraremos em contato.",
        });
        onSubmitSuccess();
      } else {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro ao enviar wishlist:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-3">Obrigada pelo seu interesse!</h3>
          <p className="text-muted-foreground">
            Recebemos seu interesse! Em breve entraremos em contato para criar sua boneca reborn personalizada.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/20 shadow-xl">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-primary fill-current" />
          <h3 className="text-xl font-bold">Quero minha Boneca Reborn</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Preencha seus dados para entrar na lista de interesse e criarmos sua boneca reborn personalizada:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                className="pl-12"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-mail *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className="pl-12"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Celular *
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
                className="pl-12"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            {isSubmitting ? 'Enviando...' : 'Quero entrar na lista de interesse'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WishlistForm;
