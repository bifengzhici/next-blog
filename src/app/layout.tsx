import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Hubot_Sans } from "next/font/google";
import { Header } from "@/components/app/header";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import AppError from "./error";

export const metadata: Metadata = {
  title: "笔锋至此",
  description: "笔锋至此的个人博客",
};

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false
}

const hubotSans = Hubot_Sans({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={cn("antialiased w-full overflow-x-hidden bg-[#05060f] dark", hubotSans.className)}>
        <Header />
        <ErrorBoundary errorComponent={AppError}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
