"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm your **Career Craft** assistant. How can I help you architect your professional path today?" 
    }
  ]);
  
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "I'm sorry, I'm having trouble connecting to the brain. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 h-[500px] w-[350px] overflow-hidden rounded-2xl border bg-white shadow-2xl flex flex-col animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex flex-col">
              <h3 className="font-black text-xs tracking-widest uppercase">Career Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] opacity-80 font-medium">Online & Ready</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef} 
            className="flex-1 p-4 text-sm overflow-y-auto space-y-4 bg-zinc-50/50 scrollbar-thin scrollbar-thumb-zinc-200"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-2xl max-w-[88%] shadow-sm ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-white border border-zinc-100 text-zinc-800 rounded-tl-none"
                }`}>
                  <ReactMarkdown 
                    className={`prose prose-sm max-w-none break-words leading-relaxed ${
                      msg.role === "user" ? "prose-invert" : ""
                    }`}
                    components={{
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({children}) => <span className="font-bold underline-offset-2">{children}</span>,
                      ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                      li: ({children}) => <li className="mb-1">{children}</li>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2 bg-zinc-100 p-2 rounded-xl focus-within:ring-2 focus-within:ring-indigo-600/20 transition-all">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about resumes or jobs..." 
                className="flex-1 bg-transparent text-sm outline-none px-2 py-1 text-zinc-800 placeholder:text-zinc-400"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                size="icon" 
                className={`h-8 w-8 rounded-lg transition-all ${
                  input.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-zinc-300"
                }`}
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
             <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
             <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 border-2 border-indigo-600 rounded-full" />
          </div>
        )}
      </button>
    </div>
  );
}