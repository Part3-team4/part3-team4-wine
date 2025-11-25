// import Header from '@/components/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="homeWrap">
      <div>헤더</div>
      {children}
    </div>
  );
}
