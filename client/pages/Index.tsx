import { useState } from "react";
import { SimuladorForm } from "@/components/SimuladorForm";
import { ComparacaoTabela } from "@/components/ComparacaoTabela";
import {
  AdSenseBanner,
  AdSenseContent,
  AdSenseMobileAnchor,
} from "@/components/AdSense";
import { LoanInput, LoanResult, calculateAllSimulations } from "@/lib/calculos";
import { Building2, Shield, TrendingUp, Users } from "lucide-react";

export default function Index() {
  const [results, setResults] = useState<LoanResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulation = async (input: LoanInput) => {
    setIsLoading(true);

    // Simula um pequeno delay para uma melhor UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const simulationResults = calculateAllSimulations(input);
    setResults(simulationResults);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">
                  FinanceSimulator
                </span>
                <p className="text-sm text-slate-600">
                  Simulador de Financiamento
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Seguro e Confiável</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Dados Atualizados</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>4 Bancos</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Simulador de Financiamento Imobiliário
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 block">
                Compare Caixa, Itaú, Bradesco e Santander
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Calcule e compare financiamentos imobiliários com sistemas SAC e PRICE.
              Inclui subsídio Minha Casa Minha Vida da Caixa Econômica Federal.
            </p>
          </div>

          {/* AdSense Banner - Before Form */}
          <AdSenseBanner adSlot="1234567890" />

          {/* Simulador Form */}
          <div className="flex justify-center">
            <SimuladorForm
              onSimulate={handleSimulation}
              isLoading={isLoading}
            />
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
              <ComparacaoTabela results={results} />

              {/* AdSense Content Ad - After Results */}
              <AdSenseContent adSlot="0987654321" />
            </div>
          )}

          {/* Features */}
          {results.length === 0 && (
            <section>
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                Por que usar nosso simulador?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Cálculos Precisos SAC e PRICE
                  </h3>
                <p className="text-slate-600">
                  Utilizamos as fórmulas oficiais dos sistemas SAC e PRICE com
                  taxas atualizadas do mercado
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Comparação Completa
                </h3>
                <p className="text-slate-600">
                  Compare todos os principais bancos brasileiros lado a lado
                  para tomar a melhor decisão
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Minha Casa Minha Vida
                </h3>
                <p className="text-slate-600">
                  Inclui automaticamente o subsídio de R$ 30.000 da Caixa quando
                  você é elegível
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-slate-600 space-y-2">
            <p className="text-sm">
              © Diego Santana 2025 - Personal Project
            </p>
            <p className="text-xs text-slate-500">
              Simulações baseadas em dados do mercado financeiro brasileiro. Os valores são estimativas.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Anchor Ad */}
      <AdSenseMobileAnchor adSlot="1357924680" />
    </div>
  );
}