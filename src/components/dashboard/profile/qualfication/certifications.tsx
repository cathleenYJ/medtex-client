import { Tag } from "@ui/tag";

export const Certifications: React.FC<{ items: Record<string, string> }> = ({
  items,
}) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {Object.entries(items).map(([key, certification]) => (
        <Tag key={`certification-${key}`}>{certification}</Tag>
      ))}
    </div>
  );
};
