import clsx from "clsx";
import { forwardRef } from "react";
import { Button as HeadlessButton } from "@headlessui/react";

const variants = (variant?: string) => {
  switch (variant) {
    case "auth":
      return "block w-full xs:w-[120px] rounded-lg px-3 py-2 bg-[#131314] border border-white/20 text-white text-sm text-center transition-opacity active:opacity-80";
    case "modal":
      return "block w-full xs:w-[120px] rounded-lg px-3 py-2 bg-black border border-white/20 text-white text-sm text-center min-w-35";
    case "cancel":
      return "block w-full xs:w-[120px] rounded-lg px-3 py-2 bg-white border border-black/40 text-black text-sm text-center transition-colors active:border-[#131314]";
    case "userinfo":
      return "p-1 flex items-center rounded-sm hover:bg-black hover:text-white transition-all max-w-7 hover:max-w-full hover:[&_div]:max-w-full";
    case "select":
      return [
        "inline-flex",
        "h-12",
        "px-4",
        "py-2",
        "justify-center",
        "items-center",
        "gap-2.5",
        "flex-shrink-0",
        "rounded-lg",
        "border",
        "border-black/40",
        "bg-white",
        "text-black",
        "text-sm",
        "text-center",
        "transition-colors",
      ].join(" ");
    default:
      return null;
  }
};

export type ButtonProps<ComponentType extends React.ElementType> = {
  loading?: boolean;
  component?: ComponentType;
  variant?: "auth" | "userinfo" | "modal" | "select" | "cancel";
} & React.ComponentPropsWithoutRef<ComponentType>;

const Button = forwardRef(
  <ComponentType extends React.ElementType = typeof HeadlessButton>(
    {
      loading = false,
      component,
      variant,
      className,
      children,
      onClick,
      disabled,
      ...props
    }: ButtonProps<ComponentType>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = component || HeadlessButton;
    const isSelected = className?.includes("selected");
    
    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={clsx(
          className,
          variants(variant),
          "relative overflow-hidden",
          disabled && variant === "auth" && "!opacity-30",
          disabled && variant === "cancel" && "!opacity-30",
          disabled && variant !== "auth" && variant !== "cancel" && "!cursor-not-allowed !opacity-50",
          loading ? "cursor-wait !opacity-50" : "cursor-pointer",
          loading &&
            "before:content-[''] before:block before:absolute before:inset-0 before:bg-linear-90 before:from-transparent before:via-b2b-lv3/20 before:to-transparent before:animate-btn-loading",
          variant === "select" && isSelected && "!bg-[#131314] !text-white !border-[#131314]"
        )}
        onClick={onClick ? (loading ? undefined : onClick) : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button };
