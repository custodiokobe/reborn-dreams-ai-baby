
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Success = () => {
  return (
    <div className="min-h-screen gradient-pastel">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Pagamento Realizado com Sucesso!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Obrigada por confiar no Reborn Baby AI! Sua transação foi processada com sucesso.
            </p>
          </div>

          <Card className="border-2 border-primary/20 shadow-xl mb-8">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Heart className="w-6 h-6 fill-current" />
                  <span className="text-lg font-semibold">Próximos passos</span>
                </div>
                
                <div className="text-left space-y-3 max-w-md mx-auto">
                  <p className="text-muted-foreground">
                    ✨ Para gerar seu bebê reborn, volte à página inicial e faça o upload das duas fotos
                  </p>
                  <p className="text-muted-foreground">
                    💕 Se você comprou um bebê físico, entraremos em contato em até 24 horas
                  </p>
                  <p className="text-muted-foreground">
                    📧 Você receberá um e-mail de confirmação em instantes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Dúvidas? Entre em contato conosco através da página de contato
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Success;
