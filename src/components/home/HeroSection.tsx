import { ArrowRight, Sparkles, TrendingDown, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-shopping-bg.mp4";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 min-h-[80vh] md:min-h-[70vh]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-1.5 text-sm mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>As melhores ofertas da Shopee</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Encontre os{" "}
            <span className="text-primary">melhores descontos</span>
            <br />
            em um só lugar
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Selecionamos as ofertas mais incríveis da Shopee para você economizar
            nas suas compras. Atualizado diariamente!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
              <a href="#produtos">
                Ver Ofertas
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" asChild>
              <Link to="/categoria/eletronicos">
                Explorar Categorias
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
                <Gift className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">500+</span>
              <span className="text-sm text-muted-foreground">Produtos</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success mb-2">
                <TrendingDown className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">70%</span>
              <span className="text-sm text-muted-foreground">Desconto Máx.</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-2">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">8</span>
              <span className="text-sm text-muted-foreground">Categorias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
