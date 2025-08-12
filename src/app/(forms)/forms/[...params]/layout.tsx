import { notFound } from "next/navigation";
import { FormLayout, Progress } from "@ui/form";
import type { FormParams } from "@/types";

export default async function FormsLayout({
  children,
  params,
}: {
  children: Readonly<React.ReactNode>;
  params: Promise<FormParams>;
}) {
  const {
    params: [, total, step],
  } = await params;
  const totalNumber = Number(total);
  if (!totalNumber) notFound();
  return (
    <FormLayout>
      <div className="flex flex-col gap-10 items-center w-full">
        <Progress total={totalNumber} current={Number(step)} />
        {children}
      </div>
    </FormLayout>
  );
}
