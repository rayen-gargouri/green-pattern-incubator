import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Pattern Incubator - De l'idee verte au projet durable",
  description:
    "Plateforme digitale d'incubation pour accompagner les jeunes entrepreneurs dans la transformation d'idees ecologiques en projets verts concrets, structures et durables.",
  openGraph: {
    title: "Green Pattern Incubator",
    description: "De l'idee verte au projet durable",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
