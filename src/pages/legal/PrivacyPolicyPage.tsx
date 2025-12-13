import { SEOHead } from "@/components/seo/SEOHead";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Política de Privacidade"
        description="Conheça nossa política de privacidade e saiba como tratamos seus dados pessoais de acordo com a LGPD."
        canonicalUrl="/politica-de-privacidade"
        noIndex={false}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <article className="prose prose-gray dark:prose-invert max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
            <p className="text-muted-foreground mb-4">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Introdução</h2>
              <p className="text-muted-foreground mb-4">
                A ShopeeFind está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você visita nosso site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Informações que Coletamos</h2>
              <p className="text-muted-foreground mb-4">Podemos coletar as seguintes informações:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Informações de navegação (páginas visitadas, tempo de permanência)</li>
                <li>Dados de dispositivo (tipo de navegador, sistema operacional)</li>
                <li>Endereço IP</li>
                <li>E-mail (quando você se inscreve em nossa newsletter)</li>
                <li>Preferências de produtos (favoritos salvos localmente)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-muted-foreground mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Melhorar a experiência do usuário em nosso site</li>
                <li>Analisar padrões de uso para aprimorar nossos serviços</li>
                <li>Enviar comunicações sobre ofertas (com seu consentimento)</li>
                <li>Direcionar você para ofertas relevantes na Shopee</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Não vendemos suas informações pessoais. Podemos compartilhar dados com:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Shopee (através de links de afiliados para rastreamento de conversões)</li>
                <li>Serviços de análise (Google Analytics, etc.)</li>
                <li>Autoridades legais quando exigido por lei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">5. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a anonimização ou exclusão de dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">6. Segurança dos Dados</h2>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mt-6 mb-4">7. Contato</h2>
              <p className="text-muted-foreground mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco através do nosso canal no WhatsApp.
              </p>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
