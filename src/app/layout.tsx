export const metadata = {
  title: "NΘCTURA",
  description: "Encrypted knowledge vault",
};

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProviderCustom } from "@/context/ThemeContext";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel&family=EB+Garamond&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProviderCustom>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProviderCustom>
        </AuthProvider>
      </body>
    </html>
  );
}
