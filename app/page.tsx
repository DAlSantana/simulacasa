import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Building2 } from "lucide-react";

/**
 * Lazy load the simulator (Client Component) to reduce initial JS bundle
 * ssr: false - Don't render on server, load only on client
 */
const ClientSimulator = dynamic(
  () =>
    import("@/components/ClientSimulator").then((mod) => mod.ClientSimulator),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center">
        <SimulatorSkeleton />
      </div>
    ),
  },
);

/**
 * Simple skeleton loader for the simulator
 * Shows while the simulator component is loading
 */
function SimulatorSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-pulse">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header skeleton */}
        <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-50 p-8 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
          <div className="h-8 bg-slate-200 rounded w-64" />
          <div className="h-4 bg-slate-200 rounded w-80" />
        </div>

        {/* Form skeleton */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-20" />
                <div className="h-12 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
          <div className="h-14 bg-slate-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* HEADER - Server rendered for SEO */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container-base py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                FinanceSimulator
              </h2>
              <p className="text-sm text-slate-600">
                Simulador de Financiamento
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* HERO - Server rendered for SEO */}
      <main className="container-base py-16">
        <section className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">
            Simulador de Financiamento Imobiliário
            <span className="block text-transparent bg-clip-text gradient-blue mt-2">
              Compare Caixa, Itaú, Bradesco e Santander
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Compare financiamentos com SAC e PRICE. Ferramenta gratuita com
            suporte a subsídio Minha Casa Minha Vida.
          </p>
        </section>

        {/* CLIENT SIMULATOR - Lazy loaded with suspense */}
        <Suspense fallback={<SimulatorSkeleton />}>
          <ClientSimulator />
        </Suspense>
      </main>
    </div>
  );
}
