import { Forms } from "@dashboard/forms";
import { auth } from "@lib/nextauth/auth";
import type { FormParams } from "@/types";

export default async function FormsPage({
  params,
}: {
  params: Promise<FormParams>;
}) {
  const {
    params: [name, total, step],
  } = await params;
  const session = await auth();
  if (!session?.user) return null;
  const getForms = await import(`@dashboard/forms/${name}`).then(
    (m) => m.default
  );
  const steps = await getForms();
  return <Forms total={total} step={step} steps={steps} />;
}
