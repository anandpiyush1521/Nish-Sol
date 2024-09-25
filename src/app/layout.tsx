import AppWalletProvider from "./components/AppWalletProvider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="A Solana wallet app for managing tokens and balances." />
        <title>Solana Wallet App</title>
        {/* You can include global styles or fonts here */}
        <link rel="stylesheet" href="/global.css" />
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <AppWalletProvider>{children}</AppWalletProvider>
        <Toaster />
      </body>
    </html>
  );
}
