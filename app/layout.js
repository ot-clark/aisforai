import "./globals.css";

export const metadata = {
  title: "Request a Demo",
  description: "Affiliate Wisdom for every step. We use AI to connect fast-growing E-Commerce and SaaS businesses with skilled marketing experts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
