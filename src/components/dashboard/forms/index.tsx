import { useMemo } from "react";
import { notFound } from "next/navigation";

export const Forms: React.FC<{
  total: string;
  step: string;
  steps: React.ReactNode[];
}> = ({ total, step, steps }) => {
  const totalNumber = Number(total);
  const stepNumber = Number(step);
  const stepsMap = useMemo(
    () => new Map(steps.map((s, i) => [i + 1, s])),
    [steps]
  );
  if (!totalNumber || !stepNumber || totalNumber !== steps.length) notFound();
  return stepsMap.get(stepNumber) || notFound();
};
