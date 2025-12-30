import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Home, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'Gig Worker Portal', showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 gradient-primary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && location.pathname !== '/' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-foreground leading-tight">{title}</h1>
                <p className="text-xs text-primary-foreground/80">Government of India</p>
              </div>
            </div>
          </div>
          
          {location.pathname !== '/' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Home className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
