"use client";
import { Bell, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export const UserDropdown = () => {
  const { user, logoutUser } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-primary-darker h-12 w-12 flex items-center justify-center rounded-full border-3 border-primary">
          {user?.profileImg ? (
            <Image
              className="h-full w-full flex items-center justify-center rounded-full object-cover "
              src={user.profileImg.secure_url}
              alt="user-profile-pic"
              width={100}
              height={100}
            />
          ) : (
            <User />
          )}
        </div>
      </DropdownMenuTrigger>
      {user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notificaciones
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Configuracion
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutUser}>
            <LogOut />
            Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <></>
      )}
    </DropdownMenu>
  );
};
