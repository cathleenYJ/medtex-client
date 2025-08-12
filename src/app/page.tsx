import { redirect } from "next/navigation";
import { Routes } from "@/config/routes";

export default function Home() {
  redirect(Routes.private.registrationRecord);
}
