"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Smile, Send } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import UploadMultipleImages from "../common/upload-multiple-images";
import CircularProgress from "./circular-progress";
const EMOJI_LIST = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "👍",
  "👎",
  "👌",
  "✌️",
  "🤟",
  "🙌",
  "👏",
  "🎉",
  "🚀",
  "✨",
  "🔥",
  "💯",
  "⭐",
  "🌟",
  "💎",
  "🎁",
  "🍕",
  "🍔",
  "🍟",
  "🌮",
  "🍜",
  "☕",
  "🍺",
  "🍷",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😚",
  "😙",
  "🥲",
  "😋",
];

const formSchema = z.object({
  body: z.string().max(500, { error: "El maximo de caracteres es de 500" }),
  files: z.array(z.instanceof(File)).nullable().optional(),
  // .file({ error: "Error al subir el archivo" })
  // .refine((files) => {
  //   console.log("FILES", files);
  //   return !files || files.size <= 2 * 1024 * 1024;
  // }, "La imagen debe pesar menos de 2 MB")
  // .refine(
  //   (files) =>
  //     !files ||
  //     ["image/jpeg", "image/png", "image/webp"].includes(files.type),
  //   "Formato incorrecto"
  // ),
});

export function CreatePostForm() {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [loading, setLoading] = useState(false);
  const { handleSubmit, control, formState, setValue, getValues, reset } =
    useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { body: "", files: undefined },
      mode: "onChange",
    });
  // const [createPost, { loading }] = useMutation(CreatePostMutationDocument, {
  //   client: apolloClient,
  // });
  async function onSubmit({ files, ...dataForm }: z.infer<typeof formSchema>) {
    try {
      // setLoading(true);\
      console.log("dataf", dataForm);
      // await createPost({ variables: { data: dataForm, files: { files } } });
      reset();
    } catch (e) {
      console.log("e", e);
      toast.error("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>Datos incorrectos</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    } finally {
      // setLoading(false);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= 4) {
        alert("Máximo 4 imágenes permitidas");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          if (prev.length < 4) {
            return [...prev, reader.result as string];
          }
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const addEmoji = (emoji: string) => {
    // setContent((prev) => prev + emoji);
    const currentBody = getValues("body");
    setValue("body", currentBody + emoji);
  };

  const maxLength = 500;
  return (
    <div className="px-8 ">
      <Card className="w-full p-6 border-none shadow-sm rounded-md bg-primary-darker/20">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Text Area */}
          <Controller
            name="body"
            control={control}
            render={({ field, fieldState }) => {
              const progress = (field.value.length / maxLength) * 100;
              return (
                <Field
                  className="space-y-2 relative"
                  data-invalid={fieldState.invalid}
                >
                  <Textarea
                    {...field}
                    id="body"
                    placeholder="¿Qué estas pensando?"
                    className="min-h-24 resize-none text-base bg-input border-border focus-visible:ring-0"
                  />

                  <div className="flex gap-x-4 items-center">
                    <FieldLabel
                      htmlFor="form-rhf-demo-title"
                      className="text-white"
                    >
                      {field.value.length}/500
                    </FieldLabel>
                    <CircularProgress
                      size={30}
                      strokeWidth={3}
                      progress={progress}
                    />
                  </div>
                  {/* {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )} */}
                </Field>
              );
            }}
          />
          <div className="flex items-center justify-between pt-3 border-t border-primary-light bg-transparent mb-0">
            <div className="flex items-center gap-2">
              <Controller
                name="files"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    className="space-y-2"
                    data-invalid={fieldState.invalid}
                  >
                    <UploadMultipleImages field={field} />
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      name={field.name}
                      ref={field.ref}
                      multiple={false}
                      onBlur={field.onBlur}
                      // onChange={(e) => {
                      //   console.log("file eve", e.target);
                      //   // const files = e.target.files;
                      //   // if (files) {
                      //   //   // console.log('files',files[0].arrayBuffer)
                      //   //   // field.onChange(files[0]);
                      //   //   // setPreview(URL.createObjectURL(files[0]));
                      //   // }
                      // }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
                    {EMOJI_LIST.map((emoji) => (
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

              {/* Image Count */}
              {images.length > 0 && (
                <span className="text-xs text-muted-foreground ml-2">
                  {images.length}/4
                </span>
              )}
            </div>

            {/* Post Button */}
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="h-12  rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="size-5" />
              Postear
            </Button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </form>
      </Card>
    </div>
  );
}
