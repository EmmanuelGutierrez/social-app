"use client";
import { useState, useRef } from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import imageComp from "browser-image-compression";
import { UploadMultipleImagesI } from "@/common/interfaces/uploadMultipleImages.interface";

export default function UploadMultipleImages({ field }: UploadMultipleImagesI) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (files: FileList | null) => {
    const newPreviews: string[] = [];
    const compressedFiles: File[] = []
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!validTypes.includes(file.type)) {
        alert("Solo se aceptan JPG, PNG o WebP");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        const compressedFile = await imageComp(file, {
          maxSizeMB: 2,
          maxWidthOrHeight: 1200,
        });
        compressedFiles.push(compressedFile)
      } else {
        compressedFiles.push(file)
      }

      newPreviews.push(URL.createObjectURL(file));
    }
    field.onChange(compressedFiles);
    setPreviews(newPreviews);

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setPreview(reader.result as string);
    // };
    // reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block">

        <div className=" group">
          <div
            className={`select-none relative grid gap-1 border-2 border-dashed border-border rounded-xl p-1 bg-muted/10
          ${previews.length === 0
                ? "place-items-center w-20 h-20"
                : "grid-cols-2 grid-rows-2 w-20 h-20"
              }`}
            onClick={handleEditClick}
          >
            {previews.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Plus className="w-8 h-8" />
              </div>
            ) : (
              previews.map((src, index) =>
                index < 4 ? (
                  <div key={index} className="relative w-full h-full ">
                    {index === 3 && previews.length > 4 ? (
                      <div className="absolute z-10 rounded-md top-0 left-0 w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-black/80">
                        <p>{previews.length - 4}+</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    <Image
                      src={src}
                      alt={`Preview-${index + 1}`}
                      fill
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                ) : null
              )
            )}
          </div>
          <Button
            onClick={() => clearImage()}
            type="button"
            className="absolute h-7 w-7 top-1 right-1 p-1 bg-destructive/80 hover:bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition"
            title="Cambiar foto"
          >
            <X className="w-3 h-3 text-white" />
          </Button>
        </div>

      </div>
      <Input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          handleImageChange(e.target.files);
        }}
        className="hidden"
      />
    </div>
  );
}
