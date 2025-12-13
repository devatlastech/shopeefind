import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import ProductRedirect from "./pages/ProductRedirect";
import CategoryPage from "./pages/CategoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import NewsletterPage from "./pages/admin/NewsletterPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/legal/TermsOfUsePage";
import CookiesPolicyPage from "./pages/legal/CookiesPolicyPage";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/p/:id" element={<ProductRedirect />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
            <Route path="/politica-de-cookies" element={<CookiesPolicyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/products" element={<ProductsPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/newsletter" element={<NewsletterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
