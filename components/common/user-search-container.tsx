"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { UserSearch } from "./user-search";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export const UserSearchContainer = () => {
  return (
    <div>
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full h-10 w-10">
              <Search className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full h-2/3 flex flex-col">
            <DialogHeader className="flex justify-center h-10">
              <DialogTitle>Buscar usuarios</DialogTitle>
            </DialogHeader>
            <div>
              <UserSearch />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="hidden md:block">
        <UserSearch />
      </div>
    </div>
  );
};
