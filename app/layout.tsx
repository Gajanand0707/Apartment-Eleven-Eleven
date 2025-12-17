import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Scroll from "@/components/scroll";
import LoadingScreen from "@/components/DotLoader";
import RefreshOnResize from "@/components/RefreshOnResize";


export const metadata: Metadata = {
  title: 'Apartment Eleven Eleven',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <LoadingScreen />
        {children}
        <Scroll />
        {/* <RefreshOnResize /> */}
        <Footer />
      </body>
    </html>
  );
}
