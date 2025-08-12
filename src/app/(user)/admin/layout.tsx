import { Welcome } from "@dashboard/admin/welcome";
import { Sidebar } from "@dashboard/admin/sidebar";

export default function UserAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-admin className="sm:px-5 flex text-black -mt-8" >
      <Sidebar className="w-10 sm:w-60 shrink-0" />
      <div className=" px-5 sm:px-10 py-10 grow relative flex flex-col gap-7.5 overflow-x-hidden">
        <Welcome />
        {children}
      </div>
    </div>
  );
}
