import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Email já cadastrado",
            description: "Este email já está inscrito na nossa newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        setEmail("");
        toast({
          title: "Inscrito com sucesso!",
          description: "Você receberá as melhores ofertas no seu email.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao inscrever",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {subscribed ? (
            <div className="flex flex-col items-center gap-4 animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Obrigado por se inscrever!</h2>
              <p className="text-muted-foreground">
                Você receberá as melhores ofertas diretamente no seu email.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Receba as melhores ofertas
              </h2>
              <p className="text-muted-foreground mb-8">
                Inscreva-se e receba descontos exclusivos diretamente no seu email.
                Prometemos não enviar spam!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading} className="gap-2">
                  {loading ? (
                    "Inscrevendo..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Inscrever
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">
                Ao se inscrever, você concorda em receber emails promocionais.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
