
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary fill-current" />
              <span className="font-bold text-lg text-gradient">Reborn Baby AI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Criando memórias especiais através da tecnologia e do amor aos bebês reborn.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Como Funciona</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Envie duas fotos</li>
              <li>Nossa IA cria o bebê</li>
              <li>Personalize detalhes</li>
              <li>Receba em casa</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sobre Nós</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Nossa História</li>
              <li>Artesãs Especialistas</li>
              <li>Materiais Premium</li>
              <li>Garantia de Qualidade</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@rebornbabyai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Reborn Baby AI. Feito com muito amor para você. 💕</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
