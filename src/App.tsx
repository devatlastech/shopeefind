import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/CookieConsent";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductRedirect = lazy(() => import("./pages/ProductRedirect"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const ProductsPage = lazy(() => import("./pages/admin/ProductsPage"));
const CategoriesPage = lazy(() => import("./pages/admin/CategoriesPage"));
const NewsletterPage = lazy(() => import("./pages/admin/NewsletterPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./pages/legal/TermsOfUsePage"));
const CookiesPolicyPage = lazy(() => import("./pages/legal/CookiesPolicyPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
