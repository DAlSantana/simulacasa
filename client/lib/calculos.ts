export interface LoanInput {
  propertyValue: number;
  downPaymentPercentage: number;
  termMonths: number;
  hasMinhasCasaSubsidy: boolean;
}

export interface LoanResult {
  bank: string;
  method: "SAC" | "PRICE";
  firstInstallment: number;
  totalPaid: number;
  totalInterest: number;
  monthlyRate: number;
}

export interface BankConfig {
  name: string;
  annualRate: number;
  hasSubsidy?: boolean;
  subsidyAmount?: number;
}

// Taxas realistas do mercado brasileiro (taxas anuais)
export const BANKS: BankConfig[] = [
  {
    name: "Caixa",
    annualRate: 0.089, // 8.9% ao ano
    hasSubsidy: true,
    subsidyAmount: 30000,
  },
  {
    name: "Bradesco",
    annualRate: 0.0935, // 9.35% ao ano
  },
  {
    name: "Itaú",
    annualRate: 0.0925, // 9.25% ao ano
  },
  {
    name: "Santander",
    annualRate: 0.094, // 9.4% ao ano
  },
];

// Converte taxa anual para mensal
function getMonthlyRate(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

// Calcula financiamento usando SAC (Sistema de Amortização Constante)
export function calculateSAC(
  loanAmount: number,
  monthlyRate: number,
  termMonths: number,
): { firstInstallment: number; totalPaid: number; totalInterest: number } {
  const principalPayment = loanAmount / termMonths;
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let firstInstallment = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const installment = principalPayment + interestPayment;

    if (month === 1) {
      firstInstallment = installment;
    }

    totalInterest += interestPayment;
    remainingBalance -= principalPayment;
  }

  return {
    firstInstallment,
    totalPaid: loanAmount + totalInterest,
    totalInterest,
  };
}

// Calcula financiamento usando PRICE (Sistema Francês)
export function calculatePRICE(
  loanAmount: number,
  monthlyRate: number,
  termMonths: number,
): { firstInstallment: number; totalPaid: number; totalInterest: number } {
  const installment =
    loanAmount *
    ((monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1));

  const totalPaid = installment * termMonths;
  const totalInterest = totalPaid - loanAmount;

  return {
    firstInstallment: installment,
    totalPaid,
    totalInterest,
  };
}

// Calcula todas as simulações para todos os bancos e métodos
export function calculateAllSimulations(input: LoanInput): LoanResult[] {
  const {
    propertyValue,
    downPaymentPercentage,
    termMonths,
    hasMinhasCasaSubsidy,
  } = input;

  const downPayment = propertyValue * (downPaymentPercentage / 100);
  const baseLoanAmount = propertyValue - downPayment;

  const results: LoanResult[] = [];

  BANKS.forEach((bank) => {
    let loanAmount = baseLoanAmount;

    // Aplica subsídio do Minha Casa Minha Vida apenas na Caixa
    if (bank.hasSubsidy && hasMinhasCasaSubsidy && bank.subsidyAmount) {
      loanAmount = Math.max(0, loanAmount - bank.subsidyAmount);
    }

    const monthlyRate = getMonthlyRate(bank.annualRate);

    // Calcula SAC
    const sacResult = calculateSAC(loanAmount, monthlyRate, termMonths);
    results.push({
      bank: bank.name,
      method: "SAC",
      monthlyRate,
      ...sacResult,
    });

    // Calcula PRICE
    const priceResult = calculatePRICE(loanAmount, monthlyRate, termMonths);
    results.push({
      bank: bank.name,
      method: "PRICE",
      monthlyRate,
      ...priceResult,
    });
  });

  return results;
}

// Função auxiliar para formatar valores em reais
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Função auxiliar para formatar percentual
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
