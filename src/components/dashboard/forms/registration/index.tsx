import { auth } from "@lib/nextauth/auth";
import { Final } from "./final";
import { Step1Wrapper } from "./step1-wrapper";

export default async function registrationForm() {
  const session = await auth();
  if (!session?.user) return null;
  return [
    <Step1Wrapper key="registration-1" />,
    <Final key="registration-final" />,
  ];
}
