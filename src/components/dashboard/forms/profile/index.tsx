import { auth } from "@lib/nextauth/auth";
import { Final } from "./final";
import { Step1 } from "./step1";

export default async function profileForm() {
  const session = await auth();
  if (!session?.user) return null;
  return [
    <Step1 key="profile-1" user={session.user} />,
    <Final key="profile-final" />,
  ];
}
