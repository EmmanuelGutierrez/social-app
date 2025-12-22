"use client";

import type React from "react";

import { useState } from "react";
// import { useMutation } from "@apollo/client"
// import { REGISTER_MUTATION } from "@/lib/graphql-mutations"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import AvatarUploadEditButton from "../common/upload-profile-img";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(2),
  lastname: z.string().min(2),
  username: z.string().min(2),
  birth_date: z.date(),
  file: z
    .file('Error al subir el archivo')
    .refine((files) => {
      console.log("FILES", files);
      return !files || files.size <= 2 * 1024 * 1024;
    }, "La imagen debe pesar menos de 2 MB")
    .refine(
      (files) =>
        !files ||
        ["image/jpeg", "image/png", "image/webp"].includes(files.type),
      "Formato incorrecto"
    ).optional(),
});
export function RegisterForm() {
  const router = useRouter();
  const [openCalendar, setOpenCalendar] = useState(false);
  const { handleSubmit, control, } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      birth_date: new Date(),
      lastname: "",
      name: "",
      username: "",
      file: undefined,
    },
  });
  const { register, user, loadingRegister } = useAuth();
  async function onSubmit({
    birth_date,
    file,
    ...dataForm
  }: z.infer<typeof formSchema>) {
    try {
      await register(
        {
          ...dataForm,
          birth_date: new Date(birth_date).getTime(),
        },
        file
      );
      toast.success("Registro con exito:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>Bienvenido {user?.name}</code>
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
      router.push("/main");
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

  return (
    <Card className="w-full text-white">
      <CardHeader>
        <CardTitle>Register Now!</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    className="space-y-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      type="name"
                      placeholder="Jane"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="lastname"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    className="space-y-2"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor="lastname">Apellido</FieldLabel>
                    <Input
                      {...field}
                      id="lastname"
                      type="lastname"
                      placeholder="Doe"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="space-y-2 ">

            <Controller
              name="file"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="file">Foto de perfil</FieldLabel>
                  <AvatarUploadEditButton field={field} />
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
          </div>
          <div className="space-y-2">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Correo</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="text"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Nombre de usuario</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="*******"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              name="birth_date"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date">Fechade nacimiento</FieldLabel>

                  <Popover
                    {...field}
                    open={openCalendar}
                    onOpenChange={setOpenCalendar}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(data) => {
                          setOpenCalendar(false);
                          field.onChange(data);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!!user || loadingRegister}>
            {!!user || loadingRegister ? "Creating account..." : "Register Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
