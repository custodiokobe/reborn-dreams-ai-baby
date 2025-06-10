
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles, Users, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen gradient-pastel">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-gradient mb-6">
              Sobre o Reborn Baby AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Onde tecnologia e amor se encontram para criar bebês reborn únicos e especiais
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-primary fill-current" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Criar bebês reborn únicos e personalizados usando inteligência artificial, 
                  combinando características especiais das pessoas que você ama para gerar 
                  um bebê cheio de significado e carinho.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 shadow-xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Tecnologia</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos as mais avançadas tecnologias de inteligência artificial para 
                  analisar características faciais e criar bebês reborn realistas e únicos, 
                  sempre com o toque humano de nossas artesãs especializadas.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">Por que nos escolher?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Equipe Especializada</h4>
                <p className="text-muted-foreground">
                  Nossa equipe é formada por artesãs com mais de 10 anos de experiência 
                  em bebês reborn e especialistas em IA.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Qualidade Premium</h4>
                <p className="text-muted-foreground">
                  Utilizamos apenas materiais de primeira qualidade e técnicas artesanais 
                  tradicionais para garantir a perfeição de cada bebê.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary fill-current" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Feito com Amor</h4>
                <p className="text-muted-foreground">
                  Cada bebê é criado com carinho e atenção aos mínimos detalhes, 
                  pensando na emoção que ele irá proporcionar.
                </p>
              </div>
            </div>
          </div>

          <Card className="border-2 border-accent/20 shadow-xl bg-gradient-to-br from-accent/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Nossa História</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                O Reborn Baby AI nasceu da paixão por bebês reborn e da visão de como a tecnologia 
                poderia tornar essa arte ainda mais especial e personalizada. Fundado em 2024, 
                somos pioneiros em usar inteligência artificial para criar bebês únicos que 
                combinam características das pessoas que você ama, criando uma conexão emocional 
                profunda e significativa com cada criação.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
