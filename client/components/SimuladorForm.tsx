import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calculator, Home, Percent, Calendar } from "lucide-react";
import { LoanInput } from "@/lib/calculos";

interface SimuladorFormProps {
  onSimulate: (input: LoanInput) => void;
  isLoading?: boolean;
}

export function SimuladorForm({ onSimulate, isLoading }: SimuladorFormProps) {
  const [formData, setFormData] = useState({
    propertyValue: "",
    downPaymentPercentage: "20",
    termMonths: "360",
    hasMinhasCasaSubsidy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const propertyValue = parseFloat(formData.propertyValue.replace(/\D/g, ""));
    const downPayment = parseFloat(formData.downPaymentPercentage);
    const termMonths = parseInt(formData.termMonths);

    if (!propertyValue || propertyValue < 50000) {
      newErrors.propertyValue = "Valor mínimo de R$ 50.000";
    }

    if (!downPayment || downPayment < 10 || downPayment > 80) {
      newErrors.downPaymentPercentage = "Entre 10% e 80%";
    }

    if (!termMonths || termMonths < 12 || termMonths > 420) {
      newErrors.termMonths = "Entre 12 e 420 meses";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const input: LoanInput = {
      propertyValue: parseFloat(formData.propertyValue.replace(/\D/g, "")),
      downPaymentPercentage: parseFloat(formData.downPaymentPercentage),
      termMonths: parseInt(formData.termMonths),
      hasMinhasCasaSubsidy: formData.hasMinhasCasaSubsidy,
    };

    onSimulate(input);
  };

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const amount = parseFloat(numbers) || 0;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePropertyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formatted = formatCurrencyInput(e.target.value);
    setFormData({ ...formData, propertyValue: formatted });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Simulador de Financiamento Imobiliário
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Compare as melhores opções de financiamento dos principais bancos
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valor do Imóvel */}
            <div className="space-y-2">
              <Label
                htmlFor="propertyValue"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Home className="w-4 h-4 text-blue-500" />
                Valor do Imóvel
              </Label>
              <Input
                id="propertyValue"
                type="text"
                value={formData.propertyValue}
                onChange={handlePropertyValueChange}
                placeholder="R$ 300.000"
                className={`h-14 text-lg px-4 rounded-xl border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors.propertyValue
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              />
              {errors.propertyValue && (
                <p className="text-red-500 text-sm">{errors.propertyValue}</p>
              )}
            </div>

            {/* Entrada */}
            <div className="space-y-2">
              <Label
                htmlFor="downPayment"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Percent className="w-4 h-4 text-blue-500" />
                Entrada (%)
              </Label>
              <Input
                id="downPayment"
                type="number"
                min="10"
                max="80"
                value={formData.downPaymentPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    downPaymentPercentage: e.target.value,
                  })
                }
                className={`h-14 text-lg px-4 rounded-xl border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors.downPaymentPercentage
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              />
              {errors.downPaymentPercentage && (
                <p className="text-red-500 text-sm">
                  {errors.downPaymentPercentage}
                </p>
              )}
            </div>

            {/* Prazo */}
            <div className="space-y-2">
              <Label
                htmlFor="termMonths"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Calendar className="w-4 h-4 text-blue-500" />
                Prazo (meses)
              </Label>
              <Input
                id="termMonths"
                type="number"
                min="12"
                max="420"
                value={formData.termMonths}
                onChange={(e) =>
                  setFormData({ ...formData, termMonths: e.target.value })
                }
                className={`h-14 text-lg px-4 rounded-xl border-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                  errors.termMonths
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              />
              {errors.termMonths && (
                <p className="text-red-500 text-sm">{errors.termMonths}</p>
              )}
            </div>

            {/* Minha Casa Minha Vida */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-slate-700">
                Subsídio
              </Label>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Checkbox
                  id="minhasCasa"
                  checked={formData.hasMinhasCasaSubsidy}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      hasMinhasCasaSubsidy: checked as boolean,
                    })
                  }
                />
                <div>
                  <Label
                    htmlFor="minhasCasa"
                    className="text-sm font-medium text-green-800 cursor-pointer"
                  >
                    Minha Casa Minha Vida
                  </Label>
                  <p className="text-xs text-green-600">
                    Subsídio de R$ 30.000 na Caixa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Simular Financiamento
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
