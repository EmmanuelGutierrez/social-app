// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "../../media/logo/logo-dark-transparent.png";
import Image from "next/image";
import { UserDropdown } from "../user/user-dropdown";
import Link from "next/link";
import { UserSearchContainer } from "../common/user-search-container";
export const Header = () => {
  return (
    <header className=" h-18 flex justify-between px-20 items-center border-b border-border/20">
      <div>
        <Link href="/">
          <Image alt="logo" src={logo} height={110} width={110} />
        </Link>
      </div>
      <div>
        <UserSearchContainer />
      </div>
      <div className=" flex gap-2">
        <UserDropdown />
      </div>
    </header>
  );
};
