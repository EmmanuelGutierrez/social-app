
import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "../../media/logo/logo-dark-transparent.png";
import Image from "next/image";
import { UserDropdown } from "../user/user-dropdown";
export const Header =  () => {
  return (
    <header className=" h-18 flex justify-between px-20 items-center border-b border-border/20">
      <div>
        <Button className="h-full" variant={"ghost"}>
          <Image alt="logo" src={logo} height={110} width={110} />
        </Button>
      </div>
      <div></div>
      <div className=" flex gap-2">
        {/* <Button className="">
          <Bell />
        </Button>
        <Button className="">
          <Settings />
        </Button> */}
        <UserDropdown />
        {/* <UserSheet /> */}
        {/* <Avatar className="ml-4">
          <AvatarImage />
          <AvatarFallback className="bg-gray-600">MG</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
};
