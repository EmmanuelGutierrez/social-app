"use client";
import { useState, useRef } from "react";
import { X, Plus, Smile, PictureInPicture, Image as ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import imageComp from "browser-image-compression";
import { UploadMultipleImagesI } from "@/common/interfaces/uploadMultipleImages.interface";

export default function UploadImagesButton({ field, setPreviews }: UploadMultipleImagesI) {
    // const [previews, setPreviews] = useState<string[]>([]);
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
        setPreviews?.(newPreviews);

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
        setPreviews?.([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    return (
        <div className="my-auto">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                onClick={handleEditClick}
            >
                <ImageIcon className="w-5 h-5" />
            </Button>
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
