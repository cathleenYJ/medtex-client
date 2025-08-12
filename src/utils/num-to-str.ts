export const numToStr = (time: number, pad: number = 2) =>
  time.toString().padStart(pad, "0");
