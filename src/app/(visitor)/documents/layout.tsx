import { Header } from "@dashboard/documents/header";
import { Sidebar } from "@dashboard/documents/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-admin>
      <Header />
      <div className="w-full bg-gray-200 py-15 px-4">
        <div className="w-7xl max-w-full mx-auto flex gap-7.5">
          <div className="shrink-0 sm:w-58 hidden sm:block">
            <Sidebar />
          </div>
          <main className="bg-white rounded-xl p-4 sm:p-10 grow flex flex-col gap-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
