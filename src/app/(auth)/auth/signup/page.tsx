import { redirect } from "next/navigation";
import { Signup } from "@/components/auth";
import { auth } from "@lib/nextauth/auth";
import { SiteLogoForm } from "@/components/icons/site-logo-form";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const search = await searchParams;
  const session = await auth();
  if (session) {
    redirect(search?.callbackUrl ?? "/");
  }
  return (
    <div className="flex flex-col items-center w-full">
      {/* SVG Logo */}
      <div className="mb-6 mt-2">
        <SiteLogoForm />
      </div>
      {/* Divider */}
      <div className="w-full flex justify-center">
        <div className="h-px bg-[#13131433] w-full max-w-90 sm:max-w-[480px]" />
      </div>
      <Signup />
    </div>
  );
}
