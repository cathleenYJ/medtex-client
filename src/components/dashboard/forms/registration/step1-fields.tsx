import type { FieldsGroup } from "@/types";
import { RegistrationFormSchema } from "./state";
// 手機號碼自動格式化
const phoneTransform = (value: string) => {
	value = value.replace(/\D/g, "");
	return value.length < 7
		? value.replace(/^(\d{3})(\d+)$/, "$1-$2")
		: value.replace(/^(\d{3})(\d{3})(\d+)$/, "$1-$2-$3");
};

export const step1Fields: FieldsGroup<typeof RegistrationFormSchema>[] = [
	{
		children: (
			<div className="text-xl text-black font-medium">Participant Details</div>
		),
	},
	{
		label: "* Full Name",
		className:
			"basis-full [&_[data-labels]]:flex [&_[data-labels]]:flex-col [&_[data-labels]]:gap-5 xs:[&_[data-labels]]:flex-row",
		fields: [
			{
				name: "firstName",
				type: "text",
				placeholder: "First Name",
				className: "w-full xs:flex-1",
			},
			{
				name: "lastName",
				type: "text",
				placeholder: "Last Name",
				className: "w-full xs:flex-1",
			},
		],
	},
	{
		label: "* Organization / Company Name",
		className: "basis-full",
		fields: [
			{
				name: "companyName",
				type: "text",
				placeholder: "Your organization or company name",
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
				placeholder: "公司或機構名稱（中文）",
				className: "basis-full",
			},
		],
	},
	{
		label: "* Job Title / Position",
		className: "basis-full",
		fields: [
			{
				name: "jobTitle",
				type: "text",
				placeholder: "Your job title or position",
				className: "basis-full",
			},
		],
	},
	{
		label: "* Contact Phone",
		className: "basis-full xs:basis-(--1-2-basis-gap-5)",
		fields: [
			{
				name: "contactPhoneCode",
				type: "combobox",
				className: "w-20 shrink-0",
				items: [{ id: "TW", name: "886" }],
				optionsWidthAuto: true,
			},
			{
				name: "mobileNumber",
				type: "text",
				className: "grow",
				placeholder: "000-000-000",
				transform: {
					input: (value) => typeof value === "string" ? phoneTransform(value) : value,
					output: (event: React.ChangeEvent<HTMLInputElement>) => phoneTransform(event.target.value),
				},
			},
		],
	},
	{
		label: "* Email Address",
		className: "basis-full xs:basis-(--1-2-basis-gap-5)",
		fields: [
			{
				name: "emailAddress",
				type: "email",
				placeholder: "you@example.com",
				className: "w-full xs:flex-1",
			},
		],
	},
	{
		label: "* Dietary Preferences",
		className: "basis-full",
		fields: [
			{
				name: "dietaryPreferences",
				type: "select",
				className: "w-full",
				items: [
					{ id: "regular", name: "Regular" },
					{ id: "vegetarian", name: "Vegetarian" },
				],
			},
		],
	},
];
