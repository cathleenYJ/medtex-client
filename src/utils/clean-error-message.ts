export const cleanErrorMessage = (message?: string) =>
  message?.replace(
    " Read more at https://errors.authjs.dev#credentialssignin",
    ""
  );

export const handleMultipleErrors = (errors?: Record<string, string[]>) => {
  if (!errors) return "";
  return Object.values(errors).flat().join(", ");
};
