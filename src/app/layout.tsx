import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alok Jagawat Tweets Showcase",
  description: "Tweets and Gems of Alok Jagawat in easy to read format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <a className="twitter-timeline" href="https://twitter.com/AlokJagawat?ref_src=twsrc%5Etfw">Tweets by AlokJagawat</a> <script async src="https://platform.twitter.com/widgets.js"></script>
      </body>
    </html>
  );
}
