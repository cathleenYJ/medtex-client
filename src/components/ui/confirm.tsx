import clsx from "clsx";
import { Button } from "@ui/button";
import { useModal } from "@modals/context";

export const Confirm: React.FC<{
  className?: string;
  children?: React.ReactNode;
  component?: React.ElementType;
  cancelClick?: () => void;
  cancelLink?: string;
  cancelText?: string;
}> = ({
  className,
  children,
  component,
  cancelClick,
  cancelLink,
  cancelText,
}) => {
  const { closeModal } = useModal();
  const props = {
    component,
    onClick: cancelLink ? undefined : cancelClick || closeModal,
    href: cancelLink,
  };
  return (
    <div
      className={clsx(
        className,
        "flex flex-col-reverse xs:flex-row gap-3 items-center justify-end text-sm"
      )}
    >
      <Button variant="cancel" {...props}>
        {cancelText || "Cancel"}
      </Button>
      {children}
    </div>
  );
};
