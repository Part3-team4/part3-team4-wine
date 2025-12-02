import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { pretendard } from './fonts';
import { ModalProvider } from '@/provider/ModalProvider';
import AuthProvider from '@/provider/AuthProvider';

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
      <body>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
