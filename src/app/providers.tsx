"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { ProvidersProps } from "@/types/global.types";

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  )
}
