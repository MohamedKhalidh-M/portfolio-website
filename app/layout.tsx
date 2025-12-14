import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohamed Khalidh | Frontend Developer",
  description:
    "Frontend Developer passionate about building responsive, interactive web applications and real-world technology solutions. Skilled in React, JavaScript, and embedded systems.",
  keywords: ["Frontend Developer", "Web Developer", "React", "JavaScript", "Electronics Engineer", "Portfolio"],
  authors: [{ name: "Mohamed Khalidh" }],
  generator: "v0.app",
  openGraph: {
    title: "Mohamed Khalidh | Frontend Developer",
    description: "Frontend Developer specializing in React, JavaScript, and innovative hardware-software solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Khalidh | Frontend Developer",
    description: "Frontend Developer specializing in React, JavaScript, and innovative hardware-software solutions.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
