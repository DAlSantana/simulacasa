'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LoanResult } from '@/lib/calculos';
import { formatCurrency } from '@/lib/calculos';
import { TrendingDown, TrendingUp, Award, Banknote } from 'lucide-react';

interface ComparacaoTabelaProps {
  results: LoanResult[];
}

export function ComparacaoTabela({ results }: ComparacaoTabelaProps) {
  if (!results.length) return null;

  // Find best option (lowest total paid)
  const bestOption = results.reduce((best, current) =>
    current.totalPaid < best.totalPaid ? current : best,
  );

  // Group results by bank
  const resultsByBank = results.reduce(
    (acc, result) => {
      if (!acc[result.bank]) {
        acc[result.bank] = {};
      }
      acc[result.bank][result.method] = result;
      return acc;
    },
    {} as Record<string, Record<string, LoanResult>>,
  );

  const banks = Object.keys(resultsByBank);

  return (
    <div className="w-full space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Banknote className="w-6 h-6 text-blue-500" />
            Resultados da Simulação
          </h2>
          <p className="text-slate-600">
            Compare as melhores opções de financiamento SAC e PRICE por banco
          </p>
        </CardHeader>

        <CardContent>
          {/* Desktop version */}
          <div className="hidden lg:block overflow-hidden rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 border-b border-slate-200">
                  <TableHead className="font-semibold text-slate-800 w-24 py-4 px-6 border-r border-slate-200">
                    Banco
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800 text-center w-20 py-4 px-4 border-r border-slate-200">
                    Método
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800 text-right py-4 px-6 border-r border-slate-200">
                    1ª Parcela
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800 text-right py-4 px-6 border-r border-slate-200">
                    Total Pago
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800 text-right py-4 px-6">
                    Total Juros
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => {
                  const isBestOption =
                    result.bank === bestOption.bank &&
                    result.method === bestOption.method;

                  return (
                    <TableRow
                      key={index}
                      className={`transition-colors border-b border-slate-100 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                      } hover:bg-slate-50 ${
                        isBestOption
                          ? '!bg-green-50 border-l-4 border-green-500'
                          : ''
                      }`}
                    >
                      <TableCell className="font-medium text-slate-800 py-4 px-6 border-r border-slate-100">
                        <div className="flex items-center gap-2">
                          {result.bank}
                          {isBestOption && (
                            <Award className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4 px-4 border-r border-slate-100">
                        <Badge
                          variant={
                            result.method === 'SAC' ? 'default' : 'secondary'
                          }
                          className={
                            result.method === 'SAC'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                          }
                        >
                          {result.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium py-4 px-6 border-r border-slate-100">
                        {formatCurrency(result.firstInstallment)}
                      </TableCell>
                      <TableCell className="text-right font-medium py-4 px-6 border-r border-slate-100">
                        <div className="flex items-center justify-end gap-1">
                          {formatCurrency(result.totalPaid)}
                          {isBestOption && (
                            <TrendingDown className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-600 py-4 px-6">
                        {formatCurrency(result.totalInterest)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet version */}
          <div className="lg:hidden space-y-4">
            {banks.map((bank) => (
              <Card key={bank} className="border border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-slate-800 flex items-center justify-between">
                    <span>{bank}</span>
                    {(resultsByBank[bank].SAC === bestOption ||
                      resultsByBank[bank].PRICE === bestOption) && (
                      <Award className="w-5 h-5 text-green-600" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['SAC', 'PRICE'].map((method) => {
                    const result = resultsByBank[bank][method];
                    if (!result) return null;

                    const isBestOption =
                      result.bank === bestOption.bank &&
                      result.method === bestOption.method;

                    return (
                      <div
                        key={method}
                        className={`p-4 rounded-lg border ${
                          isBestOption
                            ? 'bg-green-50 border-green-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant={method === 'SAC' ? 'default' : 'secondary'}
                            className={
                              method === 'SAC'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }
                          >
                            {method}
                          </Badge>
                          {isBestOption && (
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <TrendingDown className="w-4 h-4" />
                              Melhor Opção
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">1ª Parcela:</span>
                            <span className="font-medium">
                              {formatCurrency(result.firstInstallment)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Pago:</span>
                            <span className="font-medium">
                              {formatCurrency(result.totalPaid)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Juros:</span>
                            <span className="text-slate-600">
                              {formatCurrency(result.totalInterest)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Entenda os métodos:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <span className="font-medium text-blue-700">SAC:</span> Parcelas
                decrescentes, amortização constante
              </div>
              <div>
                <span className="font-medium text-purple-700">PRICE:</span>{' '}
                Parcelas fixas, juros decrescentes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
