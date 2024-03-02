import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Input,
  NavbarContent,
} from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";

export default function Header() {
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
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
