import "../styles/globals.css";
export const metadata = { title: "FitTrack Mobile", description: "Lean-Bulk • DB + 20kg Bar", themeColor: "#0ea5e9" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><link rel="manifest" href="/manifest.webmanifest" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body className="min-h-screen">{children}</body></html>);
}
