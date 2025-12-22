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
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import AvatarUploadEditButton from "../common/upload-profile-img";
import { toastCustom } from "@/lib/toastCustom";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import BannerUploadEditButton from "../common/upload-banner-img";
import { UserByUsernameQuery } from "@/graphql/types/graphql";

const formSchema = z.object({
    name: z.string().min(2),
    lastname: z.string().min(2),
    username: z.string().min(2),
    birth_date: z.date(),
    profileImg: z
        .file('Error al subir el archivo')
        .refine(
            (files) =>
                !files ||
                ["image/jpeg", "image/png", "image/webp"].includes(files.type),
            "Formato incorrecto"
        ).optional(),
    bannerImg: z
        .file('Error al subir el archivo')
        .refine(
            (files) =>
                !files ||
                ["image/jpeg", "image/png", "image/webp"].includes(files.type),
            "Formato incorrecto"
        ).optional(),
});
export function UpdateUserForm({
    userData,
}: {
    userData: UserByUsernameQuery['userByUsername']['user']
}) {
    // const router = useRouter();
    const [openCalendar, setOpenCalendar] = useState(false);
    const { handleSubmit, control,  } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userData.name,
            lastname: userData.lastname,
            username: userData.username,
            birth_date: userData.birth_date ? new Date(userData.birth_date) : new Date(),
        },
    });
    const { updateUser, updateUserLoading } = useUpdateUser();
    async function onSubmit({
        birth_date,
        bannerImg,
        profileImg,
        ...dataForm
    }: z.infer<typeof formSchema>) {
        try {
            await updateUser(
                {
                    ...dataForm,
                    birth_date: new Date(birth_date).getTime(),
                },
                profileImg,
                bannerImg
            );
            toastCustom.success("Actualizacion exitosa", "Perfil actualizado con exito")
        } catch (e) {
            console.log("e", e);
            toastCustom.error("Actualizacion fallida", "Error al actualizar el perfil")
        } finally {
            // setLoading(false);
        }
    }

    return (
        <Card className="w-full text-white border-primary-dark/20">

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
                            name="bannerImg"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="file">Banner</FieldLabel>
                                    <BannerUploadEditButton field={field} previewUrl={userData.bannerImg?.secure_url} />
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

                    <div className="space-y-2 ">

                        <Controller
                            name="profileImg"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="file">Foto de perfil</FieldLabel>
                                    <AvatarUploadEditButton field={field} previewUrl={userData.profileImg?.secure_url} />
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
                            name="birth_date"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="date">Fecha de nacimiento</FieldLabel>
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

                    <Button type="submit" className="w-full" disabled={updateUserLoading}>
                        {updateUserLoading ? "Actualizando..." : "Actualizar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
