import { FormLayout } from "@ui/form";

export default async function ProfileCompleteLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <FormLayout size="w-3xl">
      <div className="flex flex-col gap-10 items-center w-full justify-center">{children}</div>
    </FormLayout>
  );
}
