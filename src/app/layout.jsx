import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { companyData } from "@/lib/data";
import Header from "@/components/Header";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: ["--font-space-grotesk"] });

export const metadata = {
  title: {
    default: `${companyData.brandName} - ${companyData.tagline}`,
    template: `%s | ${companyData.brandName}`,
  },
  description: `${companyData.metaDescription}`,
  icons: {
    icon: "/logo-main.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
