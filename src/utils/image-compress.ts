import Resizer from "react-image-file-resizer";

export const imageCompress = async (file: File): Promise<File> =>
  await new Promise((resolve) =>
    Resizer.imageFileResizer(
      file,
      1080,
      1080,
      "webp",
      100,
      0,
      (uri) => resolve(uri as File),
      "file"
    )
  );
