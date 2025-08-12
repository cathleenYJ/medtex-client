import { useState } from "react";

export const useTimeout = (defaultValue: boolean = false) => {
  const [waiting, setWait] = useState<boolean>(defaultValue);
  const setWaiting = (ms: number) => {
    setWait(true);
    setTimeout(() => setWait(false), ms);
  };
  return { waiting, setWaiting };
};
