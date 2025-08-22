import { Ul } from "@ui/ul";
import type { FieldsGroup } from "@/types";
import { CheckoutSchema } from "./state";

export const step1Fields: FieldsGroup<typeof CheckoutSchema>[] = [
  {
    children: (
      <div className="text-xl text-black font-medium">Invoice</div>
    ),
  },
  {
    label: "＊ Invoice Email Address",
    className: "basis-full [&_[data-labels]]:flex-wrap",
    fields: [
      {
        name: "tax_email",
        type: "text",
        placeholder: "Email for receiving invoices",
      },
    ],
  },
  {
    label: "Taiwan UBN (8-digit Uniform Business Number)",
    className: "basis-full [&_[data-labels]]:flex-wrap",
    fields: [
      {
        name: "tax_id",
        type: "text",
        placeholder: "8-digit Taiwan UBN",
      },
    ],
  },
  {
    label: "Company Title",
    className: "basis-full [&_[data-labels]]:flex-wrap",
    fields: [
      {
        name: "tax_title",
        type: "text",
        placeholder: "Company’s full legal name (for invoicing)",
      },
    ],
  },
  {
    children: (
      <Ul className="text-xs">
        <li>
          Once your event registration is confirmed, invoice details cannot be modified. Please review your invoice information carefully before completing registration.
        </li>
      </Ul>
    ),
  },
];
