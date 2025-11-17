import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WINE",
  description: "Part3 Team4 Project WINE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
