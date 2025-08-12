import { Card } from "@ui/card";

export const HighlightCard2: React.FC<{
  icon: React.JSX.Element;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card className="bg-b2b-lv6 even:bg-b2b-lv5 py-8 sm:py-7.5 md:py-10 px-6 sm:px-7.5 md:px-12 basis-full flex flex-wrap gap-y-4 sm:gap-y-7.5">
      <div className="sm:basis-1/2 basis-full flex gap-5">
        <div className="w-7 sm:w-8 md:w-9 aspect-square">{icon}</div>
        <div className="text-b2b-lv2 text-base sm:text-xl md:text-3xl font-medium">
          {title}
        </div>
      </div>
      <div className="sm:basis-1/2 basis-full text-white text-sm sm:text-base">
        {description}
      </div>
    </Card>
  );
};
