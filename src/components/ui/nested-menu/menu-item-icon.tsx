export const MenuItemIcon: React.FC<{
  text?: string;
  icon?: React.ReactNode;
}> = ({ text, icon }) => (
  <div className="flex gap-1 items-center">
    <span>{text}</span>
    {icon}
  </div>
);
