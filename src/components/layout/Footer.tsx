import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-bold text-xl">
                Shopee<span className="text-primary">Find</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Encontre as melhores ofertas e descontos da Shopee em um só lugar.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navegação</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Início
              </Link>
              <Link to="/favoritos" className="hover:text-primary transition-colors">
                Favoritos
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categorias</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/categoria/eletronicos" className="hover:text-primary transition-colors">
                Eletrônicos
              </Link>
              <Link to="/categoria/moda" className="hover:text-primary transition-colors">
                Moda
              </Link>
              <Link to="/categoria/casa-decoracao" className="hover:text-primary transition-colors">
                Casa & Decoração
              </Link>
              <Link to="/categoria/beleza" className="hover:text-primary transition-colors">
                Beleza
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informações</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Este site contém links de afiliados. Ao clicar e comprar, você nos
                ajuda a manter o site funcionando.
              </p>
              <p className="text-xs">
                Shopee e suas marcas são propriedade da Sea Limited.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopeeFind. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
