import { auth } from "@lib/nextauth/auth";
import { Final } from "./final";
import { Step1 } from "./step1";

export default async function checkout() {
  const session = await auth();
  if (!session?.user) return null;
  return [
    <Step1 key="checkout-1" user={session.user} />,
    <Final key="checkout-final" />,
  ];
}
