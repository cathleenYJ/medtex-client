import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const filterWaitFamily = atomFamily((waiting: boolean) =>
  atom<boolean>(waiting)
);
