import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Input,
  Button,
  Avatar,
  NavbarContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { auth } from "@/auth";
import * as actions from "@/actions";

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;
  if (session?.user) {
    authContent = (
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Avatar src={session.user.image || ''} size="sm" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-auto min-w-40 py-2 px-1">
            <p className="font-semibold text-gray-800">{session.user.name}</p>
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <div className="w-full h-[1px] my-3 bg-gray-200"></div>
            <form action={actions.signOut}>
              <Button className="w-full" variant="flat" color="default" size="sm" type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">Sign In</Button>
        </form>
      </>
    );
  }

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl">Dicuss</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search" size="sm" variant="bordered" className="w-[280px]" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {authContent}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
