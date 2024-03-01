"use client";

import { NextUIProvider } from "@nextui-org/react";
import type { ProvidersProps } from "@/types/global.types";

export default function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>
}
