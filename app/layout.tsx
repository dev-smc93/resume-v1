import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { personalInfo } from "@/data/resume-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export const metadata: Metadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: personalInfo.bio || `${personalInfo.name}의 이력서 포트폴리오`,
  keywords: ["이력서", "포트폴리오"],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: `${personalInfo.name} - 이력서`,
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio || `${personalInfo.name}의 이력서 포트폴리오`,
    images: [
      {
        url: personalInfo.profileImage 
          ? `${siteUrl}${personalInfo.profileImage}` 
          : `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} 프로필 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio || `${personalInfo.name}의 이력서 포트폴리오`,
    images: [
      personalInfo.profileImage 
        ? `${siteUrl}${personalInfo.profileImage}` 
        : `${siteUrl}/og-image.png`,
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const root = document.documentElement;
                  // 기본값은 dark, localStorage에 light가 저장되어 있으면 light
                  if (theme === 'light') {
                    root.classList.remove('dark');
                  } else {
                    root.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
