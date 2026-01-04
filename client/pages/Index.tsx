import { Building2 } from "lucide-react";
import React, { Suspense } from "react";

const ClientSimulator = React.lazy(
  () => import("@/components/ClientSimulator")
);

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between">
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
        </div>
      </header>

      {/* HERO */}
      <main className="container mx-auto px-4 py-16">
        <section className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">
            Simulador de Financiamento Imobiliário
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
              Compare Caixa, Itaú, Bradesco e Santander
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Compare financiamentos com SAC e PRICE.
          </p>
        </section>

        {/* CLIENT (lazy + suspense) */}
        <Suspense
          fallback={
            <p className="text-center text-slate-500">
              Carregando simulador...
            </p>
          }
        >
          <ClientSimulator />
        </Suspense>
      </main>
    </div>
  );
}
