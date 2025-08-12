/**
 * Types for invoice information management
 * Used for checkout form and AUTH_UPDATE_INVOICE_INFO API endpoint
 */

/**
 * Invoice data structure for API requests
 */
export interface InvoiceData {
  invoice_email?: string;
  invoice_business_id?: string;
  invoice_company_name?: string;
}

/**
 * Response structure for invoice update API
 */
export interface InvoiceUpdateResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Form data structure for invoice form
 * Maps form field names to InvoiceData structure
 */
export interface InvoiceFormData {
  tax_email: string;
  tax_id: string;
}
