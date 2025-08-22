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
    params: [name,total, step],
  } = await params;
  const totalNumber = Number(total);
  if (!totalNumber) notFound();

console.log(`Form name: ${name}, Total steps: ${totalNumber}, Current step: ${step}`);



  const isProfileFirstStep = name === "profile" && totalNumber === 2 && Number(step) === 1;
  const isProfileSecondStep = name === "profile" && totalNumber === 2 && Number(step) === 2;
  console.log(`Is profile first step: ${isProfileFirstStep}`);
  console.log(`Is profile second step: ${isProfileSecondStep}`);

  let minHeight;
  if (isProfileFirstStep) minHeight = 280;
  if (isProfileSecondStep) minHeight = 400;

  return (
    <FormLayout minHeight={minHeight}>
      <div className="flex flex-col gap-10 items-center w-full">
        <Progress total={totalNumber} current={Number(step)} />
        {children}
      </div>
    </FormLayout>
  );
}
