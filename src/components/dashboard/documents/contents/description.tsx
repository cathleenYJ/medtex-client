export const Description: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => (
  <div className="flex flex-col gap-1.5">
    <h1 className="text-3xl sm:text-5xl font-bold">{title}</h1>
    <div>{children}</div>
  </div>
);
