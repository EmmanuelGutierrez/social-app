"use client";
import { useState, useRef } from "react";
import { Pencil, X, Plus } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import imageComp from "browser-image-compression";
import { toastCustom } from "@/lib/toastCustom";


type THFFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>
  previewUrl?: string | null  
}


export default function AvatarUploadEditButton<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
  previewUrl
}: THFFieldProps<TFieldValues, TName>) {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      toastCustom.error("Formato incorrecto", "Solo se aceptan JPG, PNG o WebP");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      const compressedFile = await imageComp(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1200,
        
      });
      field.onChange(new File([compressedFile], file.name, { type: compressedFile.type }));
    } else {
      field.onChange(file);
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
    }

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
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* Avatar Circle with Edit Button */}
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-muted to-muted/50 border-2 border-border flex items-center justify-center overflow-hidden">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar"
              width={130}
              height={130}
              className="w-full h-full object-cover"
            />
          ) : (
            <Plus className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Edit Button on Bottom Right */}
        <Button
          onClick={handleEditClick}
          type="button"
          className="absolute bottom-0 right-0 p-2.5 bg-accent hover:bg-accent/90 rounded-full transition-colors shadow-lg border-2 border-background"
          title="Cambiar foto"
        >
          <Pencil className="h-5 w-5 text-accent-foreground" />
        </Button>

        {/* Clear Button */}
        {preview && (
          <Button
            onClick={clearImage}
            className="absolute -top-2 -right-2 p-1 bg-destructive hover:bg-destructive/90 rounded-full transition-colors shadow-lg"
          >
            <X className="h-4 w-4 text-destructive-foreground" />
          </Button>
        )}
      </div>

      {/* Hidden Input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => {
          handleImageChange(e.target.files);

        }}
        className="hidden"
      />

    </div>
  );
}
