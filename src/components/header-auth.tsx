"use client";

import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Avatar src={session.data?.user.image || ''} size="sm" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-auto min-w-40 py-2 px-1">
            <p className="font-semibold text-gray-800">{session.data?.user.name}</p>
            <span className="text-sm text-gray-500">{session.data?.user.email}</span>
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

  return authContent;
}
