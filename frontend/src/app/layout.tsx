import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SPEED App",
	description: "Software Practice Empirical Evidence Database",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <h2>Software Practice Empirical Evidence Database!!!!</h2>;
}
