"use client";

import { useState } from "react";
import { SimuladorForm } from "@/components/SimuladorForm";
import { ComparacaoTabela } from "@/components/ComparacaoTabela";
import { LoanInput, LoanResult, calculateAllSimulations } from "@/lib/calculos";

export default function ClientSimulator() {
  const [results, setResults] = useState<LoanResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulation = async (input: LoanInput) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setResults(calculateAllSimulations(input));
    setIsLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <SimuladorForm
          onSimulate={handleSimulation}
          isLoading={isLoading}
        />
      </div>

      {results.length > 0 && (
        <ComparacaoTabela results={results} />
      )}
    </div>
  );
}
