import { useState } from "react";
import { Send, Mic, Paperclip, Bot, User, Search, Globe, Code, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const mockMessages: Message[] = [];

const tools = [
  { name: "Google Search", icon: Search, status: "ready" },
  { name: "Web Browse", icon: Globe, status: "ready" },
  { name: "Code Exec", icon: Code, status: "idle" },
];

const RightSidebar = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { role: "user", content: input, time }]);
    setInput("");
    // Mock response
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Processing your request. Stand by.",
        time: `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, "0")}`,
      }]);
    }, 1200);
  };

  return (
    <div className="w-80 h-full flex flex-col glass-panel border-l border-primary/10">

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {msg.role === "assistant" ? (
                <Bot className="w-3 h-3 text-primary" strokeWidth={1.5} />
              ) : (
                <User className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
              )}
              <span className="text-label">{msg.role === "assistant" ? "JARVIS" : "USER"}</span>
              <span className="text-label text-muted-foreground/50">{msg.time}</span>
            </div>
            <div
              className={`text-mono text-[11px] leading-relaxed max-w-[95%] ${
                msg.role === "assistant"
                  ? "text-foreground/90 bg-card/60 border-l-2 border-primary/40 pl-3 pr-3 py-2 rounded-r-md"
                  : "text-foreground/70 text-right"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Suggestion chips */}
      <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
        {["Summarize", "Explain more", "Next task"].map((chip) => (
          <button
            key={chip}
            className="text-mono text-[9px] px-2.5 py-1 rounded-full border border-primary/15 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-primary/10">
        <div className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-2 border border-primary/10 focus-within:border-primary/30 focus-within:shadow-[0_0_15px_hsla(190,90%,50%,0.1)] transition-all">
          <Paperclip className="w-4 h-4 text-muted-foreground/50 cursor-pointer hover:text-primary/60 transition-colors" strokeWidth={1.5} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Enter command..."
            className="flex-1 bg-transparent text-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none"
          />
          <Mic className="w-4 h-4 text-primary/50 cursor-pointer hover:text-primary transition-colors" strokeWidth={1.5} />
          <button onClick={sendMessage} className="p-1 rounded hover:bg-primary/10 transition-colors">
            <Send className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
