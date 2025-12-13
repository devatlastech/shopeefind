import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "shopeefind_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid layout shift on initial load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-card border rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 pr-8 md:pr-0">
            <p className="text-sm text-foreground mb-2">
              <strong>🍪 Utilizamos cookies</strong>
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Usamos cookies para melhorar sua experiência, analisar o tráfego e para fins de marketing.
              Ao continuar navegando, você concorda com nossa{" "}
              <Link to="/politica-de-cookies" className="text-primary hover:underline">
                Política de Cookies
              </Link>{" "}
              e{" "}
              <Link to="/politica-de-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
            >
              Recusar
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              Aceitar
            </Button>
          </div>
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
