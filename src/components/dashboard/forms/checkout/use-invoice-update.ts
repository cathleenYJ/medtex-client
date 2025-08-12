"use client";

import * as z from "zod/v4";
import { useSession } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "@/data/fetch-data";
import { CheckoutSchema } from "./state";
import type { InvoiceData } from "@/types";

/**
 * Custom hook for updating invoice information
 * Uses the InvoiceData type from @/types/invoiceData for type safety
 * 
 * @returns Object containing isPending state, updateInvoice function, and success callback setter
 */
export const useInvoiceUpdate = () => {
  const { data: session } = useSession();
  
  const { mutate: updateInvoiceInfo, isPending } = useMutation({
    mutationKey: ["update-invoice-info"],
    mutationFn: (data: InvoiceData) => fetchData.sellers.invoiceInfoUpdate(data, session),
    onSuccess: (response) => {
      console.log("Invoice info updated successfully:", response);
      // You can add success handling here (e.g., show success message)
    },
    onError: (error) => {
      console.error("Failed to update invoice info:", error);
      // You can add error handling here (e.g., show error message)
    },
  });

  const updateInvoice: SubmitHandler<z.infer<typeof CheckoutSchema>> = (data) => {
    // Prepare the API payload by mapping form fields to API fields
    const apiData: InvoiceData = {};

    // Map form fields to API fields
    // tax_email -> invoice_email
    if (data.tax_email) apiData.invoice_email = data.tax_email;
    
    // tax_id -> invoice_business_id
    if (data.tax_id) apiData.invoice_business_id = data.tax_id;
    
    // tax_title -> invoice_company_name
    if (data.tax_title) apiData.invoice_company_name = data.tax_title;

    console.log("Sending invoice API data:", apiData);
    updateInvoiceInfo(apiData);
  };

  return { isPending, updateInvoice };
};
