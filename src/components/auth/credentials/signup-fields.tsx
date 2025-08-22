import Link from "next/link";
import { Routes } from "@/config/routes";
import type { FieldsGroup } from "@/types";
import type { SignupSchema } from "./signup";

export const signupFields: FieldsGroup<typeof SignupSchema>[] = [
  {
    label: "Email Address",
    fields: [
      {
        name: "email",
        type: "text",
        placeholder: "You@example.com",
      },
    ],
  },
  {
    label: "Create Password",
    fields: [
      {
        name: "password",
        type: "password",
        placeholder: "Minimum 8 characters",
      },
    ],
  },
  {
    label: "Confirm Password",
    fields: [
      {
        name: "password_confirmation",
        type: "password",
        placeholder: "Minimum 8 characters",
      },
    ],
  },
  {
    fields: [
      {
        name: "terms",
        type: "checkbox",
        children: (
          <>
            I have read and accepted the{" "}
            <Link
              target="_blank"
              className="text-black underline"
              href={Routes.documents.terms}
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              className="text-black underline"
              href={Routes.documents.dataCollection}
            >
              Data Collection & Privacy
            </Link>
            .
          </>
        ),
      },
    ],
  },
];
