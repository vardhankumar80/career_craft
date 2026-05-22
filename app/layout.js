import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "../components/header"; // Fixed path
import { ThemeProvider } from "../components/theme-provider"; // Fixed path
import Chatbot from "../components/chatbot"; // Fixed path

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Instrument_Serif({ 
  weight: "400", 
  subsets: ["latin"], 
  style: "italic",
  variable: "--font-serif" 
});

export const metadata = {
  title: "Career Craft | AI Strategy",
  description: "High-performance career acceleration tools.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <body 
          className={`${inter.variable} ${instrumentSerif.variable} font-sans bg-[#fcfcfc] text-zinc-900 antialiased selection:bg-indigo-600/10 selection:text-indigo-900`}
        >
          {/* HIGH-RES TOUCH: Technical Blueprint Grid */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
               style={{ 
                 backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
                 backgroundSize: '40px 40px' 
               }} 
          />

          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Header />
            
            <main className="relative min-h-screen flex flex-col pt-24 z-10">
              <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:border-x lg:border-black/[0.03] bg-white/20">
                {children}
              </div>

              <footer className="mt-40 border-t border-black/[0.05] bg-white py-24 px-6">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                  <div className="flex flex-col gap-4">
                    <span className="text-3xl font-medium tracking-tighter text-black">
                      Career<span className="font-serif italic text-zinc-400">Craft.</span>
                    </span>
                    <p className="text-sm text-zinc-500 max-w-[280px] leading-relaxed font-light italic">
                      "The future belongs to those who architect their professional identity with precision."
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-8">
                    <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
                      <a href="#" className="hover:text-black transition-colors">Privacy</a>
                      <a href="#" className="hover:text-black transition-colors">Terms</a>
                      <a href="#" className="hover:text-black transition-colors">Infrastructure</a>
                    </div>
                    
                    <div className="flex flex-col md:items-end gap-2">
                       <div className="px-5 py-2 rounded-full border border-black/[0.05] text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-mono">
                        Build_v2.0.26 // <span className="text-black">Vardhan Kumar</span>
                      </div>
                      <span className="text-[9px] text-zinc-300 font-mono uppercase mr-2">Loc: 12.9716° N, 77.5946° E</span>
                    </div>
                  </div>
                </div>
              </footer>
            </main>

            {/* Floating Chatbot Component */}
            <Chatbot />

            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.05)',
                  color: '#000',
                  borderRadius: '0px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                },
              }} 
              richColors 
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}