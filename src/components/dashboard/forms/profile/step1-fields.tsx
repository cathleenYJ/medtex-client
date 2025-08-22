import React from "react";
import { Hr } from "@ui/splitter";
import type { FieldsGroup } from "@/types";
import type { ProfileFormSchema } from "./state";

export function step1Fields(selectedType: "personal" | "corporate"): FieldsGroup<typeof ProfileFormSchema>[] {
  if (selectedType === "personal") {
    return [
      {
        children: (
          <div className="text-xl text-black font-medium">Contact Info</div>
        ),
      },
      {
        label: "* Full Name ( Contact Person )",
        className:
          "basis-full [&_[data-labels]]:flex [&_[data-labels]]:flex-col [&_[data-labels]]:gap-5 xs:[&_[data-labels]]:flex-row",
        fields: [
          {
            name: "first_name",
            type: "text",
            placeholder: "First Name",
            className: "w-full xs:flex-1",
          },
          {
            name: "last_name",
            type: "text",
            placeholder: "Last Name",
            className: "w-full xs:flex-1",
          },
        ],
      },
      {
        label: "* Email Address",
        className: "basis-full",
        fields: [
          {
            name: "contact_email",
            type: "email",
            placeholder: "you@example.com",
            className: "basis-full",
          },
        ],
      },
      {
        label: "Address (Optional)",
        className: "basis-full",
        fields: [
          {
            name: "address",
            type: "text",
            placeholder: "Your address",
            className: "basis-full",
          },
        ],
      },
    ];
  }
  // corporate
  return [
    {
      children: (
        <div className="text-xl text-black font-medium">Contact Info</div>
      ),
    },
    {
      label: "* Email Address",
      className: "basis-full",
      fields: [
        {
          name: "contact_email",
          type: "email",
          placeholder: "you@example.com",
          className: "basis-full",
        },
      ],
    },
    {
      label: "Address (Optional)",
      className: "basis-full",
      fields: [
        {
          name: "address",
          type: "text",
          placeholder: "Your address",
          className: "basis-full",
        },
      ],
    },
    {
      children: <Hr className="w-full my-5 h-px border-none bg-[rgba(19,19,20,0.20)]" />,
    },
    {
      children: (
        <div className="text-xl text-black font-medium w-full">Organization / Company Info</div>
      ),
    },
    {
      label: "* Organization / Company Name",
      className: "basis-full",
      fields: [
        {
          name: "companyName",
          type: "text",
          placeholder: "Your company name",
          className: "basis-full",
        },
      ],
    },
    {
      label: "Organization / Company Name - Chinese (Optional)",
      className: "basis-full",
      fields: [
        {
          name: "companyNameChinese",
          type: "text",
          placeholder: "Your company name in Chinese",
          className: "basis-full",
        },
      ],
    },
    {
      label: "* Taiwan UBN (8-digit Uniform Business Number)",
      className: "basis-full",
      fields: [
        {
          name: "businessId",
          type: "text",
          placeholder: "8-digit Taiwan UBN",
          className: "basis-full",
        },
      ],
    },
    {
      label: "* Organization / Company Address",
      className: "basis-full",
      fields: [
        {
          name: "companyAddress",
          type: "text",
          placeholder: "Your company address",
          className: "basis-full",
        },
      ],
    },
  ];
}