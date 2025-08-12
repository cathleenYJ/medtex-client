import { PlayIcon } from "@heroicons/react/24/solid";

export const Criteria: React.FC<{
  items: { title: string; description: string }[];
}> = ({ items }) => (
  <div className="flex flex-wrap gap-4">
    {items.map(({ title }) => (
      <div
        key={title}
        className="basis-full sm:basis-(--1-2-basis-gap-4) md:basis-full text-sm sm:text-lg flex items-center gap-2.5"
      >
        <PlayIcon className="text-b2b-lv4 size-2.5" />
        {title}
      </div>
    ))}
  </div>
);
