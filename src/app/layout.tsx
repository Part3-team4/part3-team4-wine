import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { pretendard } from './fonts';
import { ModalProvider } from '@/provider/ModalProvider';
import { QueryProvider } from '@/provider/QueryProvider';
import Header from '@/components/common/Header/Header';

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
        <QueryProvider>
          <ModalProvider>
            <div className="homeWrap">
              <div className="inner">
                <Header />
                {children}
              </div>
            </div>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
