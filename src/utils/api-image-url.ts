export const apiImageUrl = (
  imagePath: string | null | undefined,
  defaultImage?: string
) =>
  imagePath && imagePath !== ""
    ? imagePath
    : defaultImage || (process.env.NEXT_PUBLIC_PLACE_HOLDER_IMAGE as string);
