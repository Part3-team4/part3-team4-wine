import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { pretendard } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'WINE',
    template: '%s | WINE',
  },
  description: 'Part3 Team4 Project WINE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <div className="wrap">
        <body>{children}</body>
      </div>
    </html>
  );
}
