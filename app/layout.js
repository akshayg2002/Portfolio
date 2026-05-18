import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Akshay Gangakhedkar | Mechatronics and Autonomous Systems",
  description:
    "Portfolio of Akshay Gangakhedkar — Mechatronics engineer focused on robotics platforms, sensor fusion, SLAM, mechanical systems and learning-based control.",
  metadataBase: new URL("https://Akshay-portfolio-seven.vercel.app"),
  openGraph: {
    title: "Akshay Gangakhedkar | Mechatronics & Autonomous Systems",
    description:
      "Multi-robot coordination, motion capture, SLAM, embedded systems, and real-world robotics experimentation.",
    url: "https://akshay-portfolio.com",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
