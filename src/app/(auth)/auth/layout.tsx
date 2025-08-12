import { FormLayout } from "@ui/form";

export default async function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <FormLayout size="w-7xl">
      <div className="basis-1/2 hidden sm:block"></div>
      <div className="basis-full sm:basis-1/2 flex flex-col items-center justify-center">
        {children}
      </div>
    </FormLayout>
  );
}
