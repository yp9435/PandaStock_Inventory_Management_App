import { Poppins } from "next/font/google";
import "./globals.css"; // Import global CSS here

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "400", "700"] });

export const metadata = {
  title: "PandaStock",
  description: "Inventory Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
