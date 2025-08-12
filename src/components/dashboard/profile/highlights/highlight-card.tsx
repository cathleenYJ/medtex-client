import { Card } from "@ui/card";

export const HighlightCard: React.FC<{
  title?: React.ReactNode;
  children?: React.ReactNode;
  number?: React.ReactNode;
}> = ({ title, children, number }) => (
  <Card className="bg-b2b-lv4 text-white py-8 sm:py-7.5 md:py-15 px-6 sm:px-7.5 md:px-10 w-full lg:w-1/3 relative">
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute flex justify-end items-end w-full h-full text-[15rem]/[15rem] text-white/10 font-extrabold -right-6 -bottom-10">
        <span className="scale-x-125 w-min h-min block">{number}</span>
      </div>
    </div>
    <div className="relative flex flex-col gap-4 sm:gap-2.5 lg:gap-7.5">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</div>
      <div className="text-sm sm:text-base">{children}</div>
    </div>
  </Card>
);
