import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import React from "react";

export function NextProvider({children}: {children: React.ReactNode}) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default NextProvider;
