import { motion } from "framer-motion";
import { Shield, Wifi } from "lucide-react";

const TopBar = () => {
  return (
    <div className="h-10 flex items-center justify-between px-5 border-b border-primary/10 bg-card/30 backdrop-blur-xl z-20 relative">
      <div className="flex items-center gap-3">
        <span className="text-mono text-xs tracking-[0.2em] text-primary font-medium neon-glow">JARVIS</span>
        <span className="text-label text-muted-foreground">// CORE_ACTIVE</span>
      </div>

      <div className="flex items-center gap-4 text-label">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
          <span className="text-emerald-400/80">ONLINE</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Shield className="w-3 h-3" strokeWidth={1.5} />
          <span>ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wifi className="w-3 h-3" strokeWidth={1.5} />
          <span>LIVEKIT</span>
        </div>
        <span className="text-mono text-[11px] text-primary/60" id="clock"></span>
      </div>
    </div>
  );
};

export default TopBar;
