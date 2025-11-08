"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

export function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div
          className={`flex flex-col md:flex-row gap-8 items-center justify-center`}
        >
          {/* Decorative sidebar on desktop */}
          <div className="hidden md:flex-col md:flex w-1/3 text-white text-center">
            <div className="text-6xl font-bold opacity-20 mb-4">
              {isLogin ? "Bienvenido" : "Unete"}
            </div>
            <p className="text-lg text-slate-300">
              {isLogin
                ? "Accede a tu cuenta y explora."
                : "Registrate en segundos"}
            </p>
          </div>

          {/* Forms */}
          <div className={` w-full md:w-1/3`}>
            <div
              className={`flex h-12 bg-white/20 items-center justify-center rounded-t-xl mx-8`}
            >
              {/* <div className={` h-40 relative`}> */}
              <Button
                onClick={() => setIsLogin(true)}
                variant={"ghost"}
                className="py-6 w-1/2  text-lg rounded-none rounded-t-md rounded-tr-none transition-all transform "
              >
                Login
              </Button>
              <div className="h-1/2 ">
                <Separator orientation="vertical" className="bg-border/30" />
              </div>
              {/* </div> */}
              {/* <div className={`h-40`}> */}
              <Button
                onClick={() => setIsLogin(false)}
                variant={"ghost"}
                className=" py-6  w-1/2 text-lg rounded-none rounded-t-md rounded-tl-none  transition-all transform "
              >
                Register
              </Button>
              {/* </div> */}
            </div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
