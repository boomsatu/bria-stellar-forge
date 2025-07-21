import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Index from "./pages/Index";
import StakePage from "./pages/StakePage";
import ReferralPage from "./pages/ReferralPage";
import DAOPage from "./pages/DAOPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header onConnectWallet={() => console.log('Connect wallet')} isConnected={false} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/stake" element={<StakePage />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/dao" element={<DAOPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
