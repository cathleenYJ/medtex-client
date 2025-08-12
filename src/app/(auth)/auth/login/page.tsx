import { redirect } from "next/navigation";
import { CredentialsSignin } from "@/components/auth";
import { auth } from "@lib/nextauth/auth";
import { SiteLogoForm } from "@/components/icons/site-logo-form";
import { Routes } from "@/config/routes";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const search = await searchParams;
  const session = await auth();
  if (session) {
    redirect(search?.callbackUrl ?? Routes.private.admin);
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
          <CredentialsSignin redirectTo={search?.callbackUrl ?? Routes.private.admin} />
        </div>
  );
}
