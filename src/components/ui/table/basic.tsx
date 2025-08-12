export const Tr: React.FC<React.ComponentPropsWithoutRef<"tr">> = ({
  children,
  ...props
}) => {
  return <tr {...props}>{children}</tr>;
};

export const Th: React.FC<React.ComponentPropsWithoutRef<"th">> = ({
  children,
  ...props
}) => {
  return <th {...props}>{children}</th>;
};

export const Td: React.FC<React.ComponentPropsWithoutRef<"td">> = ({
  children,
  ...props
}) => {
  return <td {...props}>{children}</td>;
};
