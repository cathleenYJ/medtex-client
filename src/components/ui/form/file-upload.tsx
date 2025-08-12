"use client";

import clsx from "clsx";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useModal } from "@modals/context";
import { Message } from "@modals/views";
import { imageCompress } from "@/utils/image-compress";
import { Validate } from "./validate";

type FileUploadProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "onChange"
> & {
  onChange: (file: File) => void;
  fileType?: string;
  error?: string;
  current?: File;
};

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      onChange,
      className,
      placeholder,
      error,
      children,
      fileType = "image",
      current,
      ...props
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(null);
    const { openModal, closeModal } = useModal();
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!new RegExp(`${fileType}/`).test(file.type))
        return openModal(
          <Message btnCancel="Close" closeModal={closeModal}>
            Invalid file type
          </Message>
        );
      const image = /svg$|webp$/g.test(file.name)
        ? file
        : await imageCompress(file);
      onChange(image);
      setPreview(URL.createObjectURL(image));
    };
    return (
      <Field
        className={clsx(
          className || "basis-full",
          "relative w-full rounded-sm border-none bg-black/6 px-3 py-2 text-sm text-white",
          "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
        )}
      >
        <Label className="cursor-pointer flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
          {preview ? (
            <div className="grow flex gap-3 justify-center px-4 py-3">
              <Image
                className="object-contain bg-white rounded-lg"
                src={preview}
                width={100}
                height={100}
                alt="preview"
              />
              <div className="flex gap-3 items-center text-black/80">
                <div>{current?.name}</div>
                <XCircleIcon className="size-5 shrink-0" />
              </div>
            </div>
          ) : (
            <div className="text-black/40">{placeholder}</div>
          )}
          {!preview && (
            <div className="px-6 py-1.5 rounded-sm bg-black text-white border border-white/20">
              Upload
            </div>
          )}
        </Label>
        <Input
          className="size-0 opacity-0 absolute"
          {...props}
          ref={ref}
          type="file"
          onChange={handleFileUpload}
        />
        <div className="text-xs text-black/80">{children}</div>
        <Validate className="absolute -bottom-2 -left-3" error={error} />
      </Field>
    );
  }
);

FileUpload.displayName = "FileUpload";
export { FileUpload };
