import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="bg-linear-to-t from-white to-secondary flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}