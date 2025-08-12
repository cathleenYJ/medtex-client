export const cleanDuplicate = (defaultClassName: string, custom?: string) => {
  return custom
    ? defaultClassName
        .split(" ")
        .filter((d) => !new RegExp(d.match(/(\S+-)/)?.[0] || "").test(custom))
        .join(" ")
    : defaultClassName;
};
