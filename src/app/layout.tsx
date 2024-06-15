import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FilesProvider } from "./context/FilesContext";
import { ThemeProvider } from "./context/ThemeContext";

const condensedFont = localFont({
  src: "../../public/fonts/Not Jam UI Condensed 16.ttf",
  display: "swap",
  variable: "--font-condensed",
});
const slabFont = localFont({
  src: "../../public/fonts/NotJamSlab14.ttf",
  display: "swap",
  variable: "--font-slab",
});
const pixelFont = localFont({
  src: "../../public/fonts/NotJamPixel5.ttf",
  display: "swap",
  variable: "--font-pixel",
});
const regularFont = localFont({
  src: "../../public/fonts/Not Jam UI 12.ttf",
  display: "swap",
  variable: "--font-regular",
});

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
      <body
        className={`text-textPrimary bg-bgPrimary text-32px font-condensed ${condensedFont.variable} ${slabFont.variable} ${pixelFont.variable} ${regularFont.variable}`}
      >
        <ThemeProvider>
          <FilesProvider>{children}</FilesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
