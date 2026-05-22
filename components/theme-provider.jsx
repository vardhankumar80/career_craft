"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // Modern standard: default to Dark Mode
      enableSystem={false} // Prevents jarring flash if system is light but site is dark
      disableTransitionOnChange={false} // Keep this false to allow our custom smooth CSS transitions
      {...props}
    >
      {/* Skill Tip: Wrapping children in a div with a global transition 
          ensures that the theme "melts" from one to another.
      */}
      <div className="selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen transition-colors duration-500 ease-in-out">
        {children}
      </div>
    </NextThemesProvider>
  );
}