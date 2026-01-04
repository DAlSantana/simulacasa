import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simulador de Financiamento Imobiliário | FinanceSimulator",
  description:
    "Simule financiamentos imobiliários com SAC e PRICE. Compare Caixa, Itaú, Bradesco e Santander. Ferramenta gratuita com subsídio Minha Casa Minha Vida.",
  keywords: [
    "simulador de financiamento",
    "financiamento imobiliário",
    "SAC",
    "PRICE",
    "Caixa",
    "Itaú",
    "Bradesco",
    "Santander",
    "Minha Casa Minha Vida",
    "simulador de hipoteca",
  ],
  authors: [
    {
      name: "FinanceSimulator",
      url: "https://financesimulator.com",
    },
  ],
  creator: "FinanceSimulator",
  publisher: "FinanceSimulator",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://financesimulator.com",
    siteName: "FinanceSimulator",
    title: "Simulador de Financiamento Imobiliário | FinanceSimulator",
    description:
      "Simule financiamentos imobiliários com SAC e PRICE. Compare Caixa, Itaú, Bradesco e Santander. Ferramenta gratuita com subsídio Minha Casa Minha Vida.",
    images: [
      {
        url: "https://financesimulator.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FinanceSimulator - Simulador de Financiamento Imobiliário",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Financiamento Imobiliário | FinanceSimulator",
    description:
      "Simule financiamentos imobiliários com SAC e PRICE. Compare Caixa, Itaú, Bradesco e Santander.",
    images: ["https://financesimulator.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://financesimulator.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect to third-party origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload critical fonts to improve Core Web Vitals */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
