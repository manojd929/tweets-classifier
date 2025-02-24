import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tweets Classification",
  description: "Tweets and Gems from twitter in easy to read format",
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
        <a className="twitter-timeline" href="https://twitter.com/Balaganpathi?ref_src=twsrc%5Etfw">Tweets Classifier</a> <script async src="https://platform.twitter.com/widgets.js"></script>
      </body>
    </html>
  );
}
