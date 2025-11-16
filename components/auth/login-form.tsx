"use client";

import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@apollo/client"
// import { LOGIN_MUTATION } from "@/lib/graphql-mutations"
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
import {useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm() {
  // const [loading, setLoading] = useState(false);
  const router=useRouter()
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const { login, user, loadingLogin } = useAuth();
  async function onSubmit(dataForm: z.infer<typeof formSchema>) {
    try {
      // setLoading(true);
      await login(dataForm);
      toast.success("You submitted the following values:", {
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
    <Card className="w-full bg-transparent text-white">
      <CardHeader>
        <CardTitle>Hola de nuevo!</CardTitle>
        <CardDescription>Ingrese con sus datos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}

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
                    type="email"
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
                    placeholder="••••••••"
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

          <Button type="submit" className="w-full" disabled={loadingLogin}>
            {loadingLogin ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
