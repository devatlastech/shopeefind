import { SEOHead } from "@/components/seo/SEOHead";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CookiesPolicyPage() {
  return (
    <>
      <SEOHead
        title="Política de Cookies"
        description="Entenda como utilizamos cookies e tecnologias similares em nosso site."
        canonicalUrl="/politica-de-cookies"
        noIndex={false}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>
            <p className="text-muted-foreground mb-4">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">1. O que são Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Tipos de Cookies que Utilizamos</h2>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Cookies Essenciais</h3>
              <p className="text-muted-foreground mb-4">
                Necessários para o funcionamento básico do site. Sem eles, o site não funcionará corretamente.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Cookies de Desempenho</h3>
              <p className="text-muted-foreground mb-4">
                Coletam informações sobre como os visitantes usam o site, como quais páginas são mais visitadas. Esses dados são usados para melhorar o desempenho do site.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Cookies de Funcionalidade</h3>
              <p className="text-muted-foreground mb-4">
                Permitem que o site lembre suas escolhas (como seus favoritos) para proporcionar uma experiência mais personalizada.
              </p>

              <h3 className="text-lg font-medium mt-4 mb-2">Cookies de Marketing/Afiliados</h3>
              <p className="text-muted-foreground mb-4">
                Utilizados para rastrear visitantes em sites. A intenção é exibir anúncios relevantes e rastrear conversões de links de afiliados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Cookies de Terceiros</h2>
              <p className="text-muted-foreground mb-4">
                Utilizamos serviços de terceiros que podem definir cookies em seu dispositivo:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Shopee:</strong> Para rastreamento de links de afiliados e conversões</li>
                <li><strong>Google Analytics:</strong> Para análise de tráfego do site</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">4. LocalStorage</h2>
              <p className="text-muted-foreground mb-4">
                Além de cookies, utilizamos o localStorage do seu navegador para armazenar:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Sua lista de produtos favoritos</li>
                <li>Preferências de consentimento de cookies</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Esses dados são armazenados apenas localmente no seu dispositivo e não são enviados para nossos servidores.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Como Gerenciar Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Você pode controlar e gerenciar cookies de várias formas:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Configurações do navegador: Você pode bloquear ou excluir cookies</li>
                <li>Banner de cookies: Use nosso banner de consentimento para aceitar ou recusar cookies não essenciais</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Note que bloquear alguns cookies pode afetar sua experiência no site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Atualizações desta Política</h2>
              <p className="text-muted-foreground mb-4">
                Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente para se manter informado sobre como usamos cookies.
              </p>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
