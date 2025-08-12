import clsx from "clsx";

export const Hamburger: React.FC = () => {
  const before =
    "before:absolute before:rounded-xs before:bg-white before:h-0.5 before:w-full before:-translate-y-1.5 before:-translate-x-1/2";
  const after =
    "after:absolute after:rounded-xs after:bg-white after:h-0.5 after:w-full after:translate-y-1.5 after:-translate-x-1/2";
  return (
    <div className="w-full aspect-square relative flex items-center justify-center">
      <span
        className={clsx(
          "block absolute rounded-xs bg-white h-0.5 w-10/12",
          before,
          after
        )}
      />
    </div>
  );
};
