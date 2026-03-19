import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import AiOrb from "@/components/AiOrb";
import ParticleBackground from "@/components/ParticleBackground";

const states = ["idle", "listening", "processing", "speaking"] as const;

const Index = () => {
  const [aiState, setAiState] = useState<typeof states[number]>("idle");

  // Cycle through states for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setAiState((prev) => {
        const idx = states.indexOf(prev);
        return states[(idx + 1) % states.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live clock
  useEffect(() => {
    const el = document.getElementById("clock");
    if (!el) return;
    const tick = () => {
      const now = new Date();
      el.textContent = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <ParticleBackground />
      <TopBar />
      <div className="flex flex-1 relative z-10 overflow-hidden">
        <LeftSidebar />
        {/* Center Area */}
        <div className="flex-1 flex items-center justify-center relative">
          <AiOrb state={aiState} />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
