
import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/lovable-uploads/6948e8a3-4697-4eb9-a643-c604ee5f25ef.png" 
                alt="Revela Baby Logo" 
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold text-gradient">Revela Baby</h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors duration-200 ${
                location.pathname === '/about' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Sobre
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors duration-200 ${
                location.pathname === '/contact' 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Contato
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="text-muted-foreground">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
