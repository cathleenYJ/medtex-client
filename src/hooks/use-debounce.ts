import { useRef } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { AtomFamily } from "jotai/vanilla/utils/atomFamily";

export const useDebounce = (
  family: AtomFamily<boolean, PrimitiveAtom<boolean>>
) => {
  const [isWaiting, setWait] = useAtom<boolean>(family(false));
  const timeout = useRef<NodeJS.Timeout>(null);
  const setWaiting = (ms: number) => {
    setWait(true);
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setWait(false);
      timeout.current = null;
    }, ms);
  };
  return { isWaiting, setWaiting };
};
