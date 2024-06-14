import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FilesProvider } from "./context/FilesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stepchild Dashboard",
  description: "Connect and view your files in the Stepchild Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FilesProvider>{children}</FilesProvider>
      </body>
    </html>
  );
}
