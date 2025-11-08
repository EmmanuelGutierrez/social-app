"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
export function UserSheet() {
  const { user } = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-gray-600 hover:bg-gray-500">
          <User />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {user ? (
          <>
            <SheetHeader>
              <SheetTitle>@{user?.username}</SheetTitle>
              {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                
              </div>
              <div className="grid gap-3">
                <h3 className="font-bold">Nombre</h3>
                <p className="font-light">{`${user.name} ${user.lastname}`}</p>
              </div>
              <div className="grid gap-2">
                <h3 className="font-bold">Email</h3>
                <p className="font-light">{user.email}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
