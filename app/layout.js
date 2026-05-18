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
  title: "Urvish Shah | Robotics & Autonomous Systems",
  description:
    "Portfolio of Urvish Shah — robotics engineer focused on multi-robot systems, sensor fusion, SLAM, and learning-based control.",
  metadataBase: new URL("https://urvish-portfolio-seven.vercel.app"),
  openGraph: {
    title: "Urvish Shah | Robotics & Autonomous Systems",
    description:
      "Multi-robot coordination, motion capture, SLAM, embedded systems, and real-world robotics experimentation.",
    url: "https://urvish-portfolio-seven.vercel.app",
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
