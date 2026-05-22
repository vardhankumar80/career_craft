import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  TrendingUp,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    // Unique Floating Dock: Minimalist White Glass
    <header className="fixed top-6 left-0 right-0 mx-auto w-[90%] max-w-6xl z-50">
      <nav className="relative overflow-hidden rounded-full border border-black/[0.05] bg-white/70 backdrop-blur-2xl px-8 h-14 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)]">
        
        {/* Brand: Classic Modern Typeface */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-black p-1.5 rounded-full group-hover:rotate-[360deg] transition-transform duration-700">
             <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-medium tracking-tighter text-black flex items-center">
            Career<span className="font-serif italic font-normal text-zinc-400">Craft</span>
          </span>
        </Link>

        {/* Center: Unique Aligned Navigation Items */}
      

        <div className="flex items-center gap-4">
          <SignedIn>
            {/* Studio Trigger: Structural Minimalist Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-black hover:bg-zinc-800 text-white rounded-full px-6 h-9 flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-black/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black italic">Studio</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4 bg-white/95 border-black/5 backdrop-blur-xl text-black p-2 rounded-2xl shadow-2xl">
                <DropdownMenuItem asChild className="rounded-xl focus:bg-zinc-50 cursor-pointer py-3 transition-colors">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Industry Insights</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-zinc-50 cursor-pointer py-3 transition-colors">
                  <Link href="/resume" className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-zinc-50 cursor-pointer py-3 transition-colors">
                  <Link href="/ai-cover-letter" className="flex items-center gap-3">
                    <PenBox className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-zinc-50 cursor-pointer py-3 transition-colors">
                  <Link href="/interview" className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="text-[11px] uppercase tracking-widest font-bold text-black hover:bg-black/5 px-6 rounded-full">
                Access
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="pl-4 border-l border-black/5">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-1 ring-black/5 hover:ring-black/20 transition-all",
                    userButtonPopoverCard: "shadow-2xl border border-black/5 bg-white rounded-3xl",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}