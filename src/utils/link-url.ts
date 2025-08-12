export const linkUrl = (url: string) => ({
  href: url,
  target: url.startsWith("http") ? "_blank" : "_self",
});
