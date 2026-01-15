import { SEOHead } from "@/components/seo/SEOHead";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfUsePage() {
  return (
    <>
      <SEOHead
        title="Termos de Uso"
        description="Leia nossos termos de uso e condições para utilização do site ShopFind."
        canonicalUrl="/termos-de-uso"
        noIndex={false}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
            <p className="text-muted-foreground mb-4">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground mb-4">
                Ao acessar e usar o site ShopFind, você concorda em cumprir e estar sujeito a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Descrição do Serviço</h2>
              <p className="text-muted-foreground mb-4">
                O ShopFind é um site de curadoria de ofertas que apresenta produtos disponíveis na plataforma Shopee. Atuamos como afiliados da Shopee, o que significa que recebemos uma comissão quando você realiza uma compra através de nossos links.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Links de Afiliados</h2>
              <p className="text-muted-foreground mb-4">
                Este site contém links de afiliados. Quando você clica em um produto e realiza uma compra na Shopee, podemos receber uma comissão. Isso não afeta o preço que você paga pelo produto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">4. Precisão das Informações</h2>
              <p className="text-muted-foreground mb-4">
                Nos esforçamos para manter as informações sobre produtos e preços atualizadas. No entanto, os preços e a disponibilidade podem mudar sem aviso prévio. Recomendamos verificar as informações diretamente na Shopee antes de efetuar uma compra.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Responsabilidades</h2>
              <p className="text-muted-foreground mb-4">
                O ShopFind não é responsável por:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Transações realizadas na plataforma Shopee</li>
                <li>Qualidade, entrega ou devoluções de produtos</li>
                <li>Mudanças de preços ou disponibilidade</li>
                <li>Problemas técnicos na plataforma Shopee</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Propriedade Intelectual</h2>
              <p className="text-muted-foreground mb-4">
                Todo o conteúdo original do ShopFind, incluindo textos, gráficos e design, é de nossa propriedade. As imagens dos produtos e marcas da Shopee pertencem aos seus respectivos proprietários.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Uso Aceitável</h2>
              <p className="text-muted-foreground mb-4">
                Ao usar nosso site, você concorda em não:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Usar o site para fins ilegais</li>
                <li>Tentar acessar áreas restritas do site</li>
                <li>Interferir no funcionamento do site</li>
                <li>Copiar ou distribuir nosso conteúdo sem autorização</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">8. Alterações nos Termos</h2>
              <p className="text-muted-foreground mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">9. Lei Aplicável</h2>
              <p className="text-muted-foreground mb-4">
                Estes termos são regidos pelas leis da República Federativa do Brasil.
              </p>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}