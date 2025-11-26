import Header from '@/components/common/Header/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="contentWrap">
      <Header />
      {children}
    </div>
  );
}
