"use client";

import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            border: "1px solid rgba(28,24,21,0.12)",
            color: "#1c1815",
          },
        }}
      />
    </>
  );
}
