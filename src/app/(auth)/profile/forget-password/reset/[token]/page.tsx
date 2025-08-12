import { redirect } from "next/navigation";
import { ResetPassword } from "@/components/auth";
import { auth } from "@lib/nextauth/auth";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const search = await searchParams;
  const session = await auth();
  if (session) {
    redirect(search?.callbackUrl ?? "/");
  }
  
  return <ResetPassword />;
}
