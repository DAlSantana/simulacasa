'use server';

/**
 * Loan simulation calculation functions (pure functions, no React)
 * Used by both Server and Client Components
 */

export interface LoanInput {
  propertyValue: number;
  downPaymentPercentage: number;
  termMonths: number;
  hasMinhasCasaSubsidy: boolean;
}

export interface LoanResult {
  bank: string;
  method: 'SAC' | 'PRICE';
  loanAmount: number;
  monthlyRate: number;
  firstInstallment: number;
  lastInstallment: number;
  totalPaid: number;
  totalInterest: number;
}

// Interest rates by bank (simplified rates for demo)
const INTEREST_RATES: Record<string, number> = {
  'Caixa': 0.0729,      // 7.29% annual
  'Itaú': 0.0750,       // 7.50% annual
  'Bradesco': 0.0768,   // 7.68% annual
  'Santander': 0.0745,  // 7.45% annual
};

const BANKS = Object.keys(INTEREST_RATES);
const MINHA_CASA_SUBSIDY = 30000; // R$ 30.000 subsídio Caixa

/**
 * Calculate SAC (Sistema de Amortização Constante)
 * Constant amortization, decreasing installments
 */
function calculateSAC(
  principal: number,
  monthlyRate: number,
  months: number,
): {
  firstInstallment: number;
  lastInstallment: number;
  totalPaid: number;
  totalInterest: number;
} {
  const constantAmortization = principal / months;
  let remainingPrincipal = principal;
  let totalPaid = 0;
  let firstInstallment = 0;
  let lastInstallment = 0;

  for (let i = 0; i < months; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const installment = constantAmortization + interest;

    if (i === 0) {
      firstInstallment = installment;
    }
    if (i === months - 1) {
      lastInstallment = installment;
    }

    totalPaid += installment;
    remainingPrincipal -= constantAmortization;
  }

  return {
    firstInstallment,
    lastInstallment,
    totalPaid,
    totalInterest: totalPaid - principal,
  };
}

/**
 * Calculate PRICE (Sistema Francês de Amortização)
 * Fixed installments, decreasing interest
 */
function calculatePRICE(
  principal: number,
  monthlyRate: number,
  months: number,
): {
  firstInstallment: number;
  lastInstallment: number;
  totalPaid: number;
  totalInterest: number;
} {
  // PMT formula: P * [r(1+r)^n] / [(1+r)^n - 1]
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const monthlyInstallment = principal * (numerator / denominator);

  const totalPaid = monthlyInstallment * months;

  return {
    firstInstallment: monthlyInstallment,
    lastInstallment: monthlyInstallment,
    totalPaid,
    totalInterest: totalPaid - principal,
  };
}

/**
 * Calculate loan simulation for all banks and methods
 */
export function calculateAllSimulations(input: LoanInput): LoanResult[] {
  const results: LoanResult[] = [];

  // Calculate loan amount after down payment and subsidy
  const downPaymentAmount = input.propertyValue * (input.downPaymentPercentage / 100);
  let loanAmount = input.propertyValue - downPaymentAmount;

  // Apply subsidy only for Caixa if selected
  if (input.hasMinhasCasaSubsidy) {
    loanAmount = Math.max(0, loanAmount - MINHA_CASA_SUBSIDY);
  }

  // Convert annual rate to monthly rate
  const annualRateToMonthly = (annualRate: number) => Math.pow(1 + annualRate, 1/12) - 1;

  // Calculate for each bank
  for (const bank of BANKS) {
    const annualRate = INTEREST_RATES[bank];
    const monthlyRate = annualRateToMonthly(annualRate);

    // Calculate SAC
    const sacResult = calculateSAC(loanAmount, monthlyRate, input.termMonths);
    results.push({
      bank,
      method: 'SAC',
      loanAmount,
      monthlyRate,
      firstInstallment: sacResult.firstInstallment,
      lastInstallment: sacResult.lastInstallment,
      totalPaid: sacResult.totalPaid,
      totalInterest: sacResult.totalInterest,
    });

    // Calculate PRICE
    const priceResult = calculatePRICE(loanAmount, monthlyRate, input.termMonths);
    results.push({
      bank,
      method: 'PRICE',
      loanAmount,
      monthlyRate,
      firstInstallment: priceResult.firstInstallment,
      lastInstallment: priceResult.lastInstallment,
      totalPaid: priceResult.totalPaid,
      totalInterest: priceResult.totalInterest,
    });
  }

  return results;
}

/**
 * Format currency for Brazilian Real
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
