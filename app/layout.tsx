import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Euphoria — Ecommerce", description: "Euphoria ecommerce authentication and home page" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
