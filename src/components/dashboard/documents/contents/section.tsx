export const Section: React.FC<{
  title: string;
  children?: React.ReactNode;
  orderList?: boolean;
}> = ({ title, children, orderList }) => {
  return (
    <div className="flex flex-col gap-5">
      {orderList ? (
        <li className="text-xl sm:text-3xl font-bold">{title}</li>
      ) : (
        <h2 className="text-xl sm:text-3xl font-bold">{title}</h2>
      )}
      {children}
    </div>
  );
};
