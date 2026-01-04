'use client';

import { useState, Suspense, lazy } from 'react';
import { SimuladorForm } from '@/components/SimuladorForm';
import type { LoanInput, LoanResult } from '@/lib/calculos';
import { calculateAllSimulations } from '@/lib/calculos';

/**
 * Lazy load the comparison table to minimize initial JS bundle
 * Only loaded after user submits the form (triggers simulation)
 */
const ComparacaoTabela = lazy(() =>
  import('@/components/ComparacaoTabela').then(mod => ({
    default: mod.ComparacaoTabela,
  }))
);

/**
 * Skeleton for the comparison table while loading
 */
function TabelaSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientSimulator() {
  const [results, setResults] = useState<LoanResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulation = async (input: LoanInput) => {
    setIsLoading(true);
    try {
      // Simulate network delay for UX feedback
      await new Promise((r) => setTimeout(r, 500));
      const calculations = calculateAllSimulations(input);
      setResults(calculations);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <SimuladorForm
          onSimulate={handleSimulation}
          isLoading={isLoading}
        />
      </div>

      {/* Only render comparison table after results are available */}
      {results.length > 0 && (
        <Suspense fallback={<TabelaSkeleton />}>
          <ComparacaoTabela results={results} />
        </Suspense>
      )}
    </div>
  );
}
