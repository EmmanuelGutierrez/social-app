"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Smile, Send, X, ImageIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "../ui/field";
import CircularProgress from "./circular-progress";
import { usePost } from "@/hooks/usePost";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import imageComp from "browser-image-compression";
import { toastCustom } from "@/lib/toastCustom";
import { EMOJIS } from "@/common/constants/emojis";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";


const formSchema = z.object({
  body: z.string().max(500, { error: "El maximo de caracteres es de 500" }),
  files: z.any().optional(),
  replyTo: z.string().optional(),

});

export function CreatePostForm({ replyTo }: { replyTo?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost } = usePost()
  const { user } = useAuth()
  const { handleSubmit, control, formState, setValue, getValues, reset, watch } =
    useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { body: "", replyTo },
      mode: "onChange",
    });


  async function onSubmit({ files, ...dataForm }: z.infer<typeof formSchema>) {
    try {
      await createPost(dataForm, files);
      reset();
    } catch (e) {
      console.log("e", e);
      toastCustom.error("Error", "Error al crear el post")
    } finally {
      // setLoading(false);
    }
  }


  const addEmoji = (emoji: string) => {
    // setContent((prev) => prev + emoji);
    const currentBody = getValues("body");
    setValue("body", currentBody + emoji);
  };

  const handleCompressFiles = async (files: FileList | null, prevFiles: File[] | null) => {
    if (!files) return

    const compressedFiles: File[] = [...(prevFiles || [])]

    if (!files || files.length === 0 || (files.length + (prevFiles?.length || 0)) > 4) {
      toastCustom.error("Error", "Se han superado las 4 imágenes")

      return compressedFiles
    };

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!validTypes.includes(file.type)) {
        toastCustom.error("Error", "Formato incorrecto")

        return compressedFiles;
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

    }
    return compressedFiles

  }

  // const clearImages = () => {
  //   setValue("files", [])
  //   setPreviews([])
  // }

  const maxLength = 500;
  const progress = (watch("body").length / maxLength) * 100;
  return (
    <div className="">
      <Card className=" w-full p-4 shadow-sm rounded-md bg-primary-darker border border-primary/20 ">
        <div className="flex w-full box-border gap-2">
          <div className="">
            <Avatar className="h-10 w-10">
              <AvatarImage className="object-cover"
                src={user?.profileImg?.secure_url || "/placeholder.svg"}
                alt={user?.name}
                width={48}
                height={48}
              />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full min-w-0">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">

                {/* Text Area */}
                <Controller
                  name="files"
                  control={control}
                  // rules={{
                  //   validate: (value) => value.length <= 4 || "Maximum 4 images allowed",
                  // }}
                  render={({ field }) => (
                    <>
                      <AnimatePresence>
                        {field.value?.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`grid gap-1 mt-3 rounded-xl overflow-hidden ${field.value.length === 1 ? "grid-cols-1" : "grid-cols-2"
                              }`}
                          >
                            {field.value.map((file: File, i: number) => (
                              i < 4 ? <motion.div
                                key={i}
                                className="relative aspect-video bg-muted rounded-lg overflow-hidden"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Image src={URL.createObjectURL(file) || "/placeholder.svg"} fill alt="" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImages = field.value.filter((_: File, idx: number) => idx !== i)
                                    field.onChange(newImages)
                                  }}
                                  className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground rounded-full p-1.5 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div> : <></>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple={!watch("files") || watch("files")?.length < 3}
                        accept="image/*"
                        onChange={async (e) => {
                          const compressedFiles = await handleCompressFiles(e.target.files, field.value)
                          field.onChange(compressedFiles);

                          e.target.value = ""
                        }}
                        className="hidden"
                      />
                    </>
                  )}
                />
                <Controller
                  name="body"
                  control={control}
                  render={({ field, fieldState }) => {

                    return (
                      <Field
                        className="space-y-2 relative"
                        data-invalid={fieldState.invalid}
                      >
                        <Textarea
                          {...field}
                          id="body"
                          placeholder="¿Qué estas pensando?"

                          className="resize-none text-base bg-transparent border-0 
                    border-b border-transparent focus-visible:border-primary 
                    rounded-none focus-visible:ring-0 ring-offset-0
                    min-h-4 w-full box-border whitespace-pre-wrap leading-relaxed
                    wrap-break-word 
                    "
                        />


                      </Field>
                    );
                  }}
                />
                <div className="flex items-center justify-between bg-transparent mb-0">
                  <div className="flex items-center gap-2">

                    <div className="my-auto">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                    </div>
                    {/* Emoji Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0">
                        <div className="grid grid-cols-8 gap-1 p-3">
                          {EMOJIS.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => addEmoji(emoji)}
                              className="p-2 text-xl hover:bg-accent/10 rounded transition-colors cursor-pointer"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>


                  </div>

                  {/* Post Button */}
                  <div className="flex gap-x-4 items-center">
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="text-white"
                    >
                      {watch("body").length}/500
                    </FieldLabel>
                    <CircularProgress
                      size={30}
                      strokeWidth={3}
                      progress={progress}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!formState.isValid}
                    className="h-12  rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Send className="size-5" />
                    Postear
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
