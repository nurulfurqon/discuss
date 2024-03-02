"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

import type { ProvidersProps } from "@/types/global.types";

export default function FormButton({ children }: ProvidersProps) {
  const { pending } = useFormStatus();

  return <Button type="submit" color="primary" isLoading={pending}>
    {children}
  </Button>
};