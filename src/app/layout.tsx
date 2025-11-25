import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { pretendard } from './fonts';
import { ModalProvider } from '@/provider/ModalProvider';

export const metadata: Metadata = {
  title: 'WINE',
  description: 'Part3 Team4 Project WINE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        {' '}
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
