import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb78IgsDDmFcchlIOP0K";

export function NewsletterSection() {
  const handleJoinChannel = () => {
    window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
              <MessageCircle className="h-8 w-8 text-[#25D366]" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Receba as melhores ofertas
          </h2>
          <p className="text-muted-foreground mb-8">
            Entre no nosso canal do WhatsApp e receba descontos exclusivos 
            diretamente no seu celular. Sem spam, só ofertas imperdíveis!
          </p>

          <Button 
            onClick={handleJoinChannel}
            size="lg"
            className="gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Entrar no Canal do WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Clique para ser redirecionado ao nosso canal oficial.
          </p>
        </div>
      </div>
    </section>
  );
}
