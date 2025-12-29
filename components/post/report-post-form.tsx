"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "../ui/field";
import CircularProgress from "./circular-progress";
import { toastCustom } from "@/lib/toastCustom";
import { useReportPost } from "@/hooks/useReportPost";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  description: z
    .string()
    .max(500, { error: "El maximo de caracteres es de 500" })
    .min(10, { error: "La descripcion debe tener al menos 10 caracteres" }),
  reason: z
    .string()
    .max(100, { error: "El maximo de caracteres es de 100" })
    .min(1, { error: "Seleccione una razon" }),
  postId: z.string(),
});

export function ReportPostForm({
  postId,
  submitCallback,
}: {
  postId: string;
  submitCallback?: () => void;
}) {
  const { reportPost, loadingReport } = useReportPost();
  const { handleSubmit, control, formState, reset,  } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "", reason: "", postId },
    mode: "onChange",
  });
  const descriptionWatched = useWatch({
    control,
    name: "description",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await reportPost(data);
      submitCallback?.();
      reset();
    } catch (e) {
      console.log("e", e);
      toastCustom.error("Error", "Error al reportar el post");
    } finally {
      // setLoading(false);
    }
  }

  const maxLength = 500;
  const progress = ((descriptionWatched.length || 0) / maxLength) * 100;
  return (
    <div className="">
      <div className="flex w-full box-border gap-2">
        <div className="w-full min-w-0">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="reason"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <Select
                        {...field}
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una razon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Spam">Spam</SelectItem>
                            <SelectItem value="Abuso">Abuso</SelectItem>
                            <SelectItem value="Falso">Falso</SelectItem>
                            <SelectItem value="Inapropiado">
                              Inapropiado
                            </SelectItem>
                            <SelectItem value="Propiedad">Propiedad</SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  );
                }}
              />
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Field
                      className="space-y-2 relative"
                      data-invalid={fieldState.invalid}
                    >
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Describe el problema"
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
                {/* Post Button */}
                <div className="flex gap-x-4 items-center">
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="text-white"
                  >
                    {descriptionWatched.length || 0}/500
                  </FieldLabel>
                  <CircularProgress
                    size={30}
                    strokeWidth={3}
                    progress={progress}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!formState.isValid || loadingReport}
                  className="h-12  rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {/* <X className="size-5" /> */}
                  Reportar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
