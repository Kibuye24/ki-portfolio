import "./globals.css";

export const metadata = {
  title: "Kibuye Portfolio",
  description: "This is a portfolio for full-stack developer Joshua Kibuye",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
