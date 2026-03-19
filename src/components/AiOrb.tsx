import { motion } from "framer-motion";

interface AiOrbProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

const stateConfig = {
  idle: { label: "IDLE", coreScale: 1, pulseOpacity: 0.2 },
  listening: { label: "LISTENING", coreScale: 1.05, pulseOpacity: 0.5 },
  processing: { label: "PROCESSING", coreScale: 1, pulseOpacity: 0.4 },
  speaking: { label: "SPEAKING", coreScale: 1.08, pulseOpacity: 0.6 },
};

const quintic = [0.23, 1, 0.32, 1] as const;

const RIPPLE_COUNT = 4;
const RIPPLE_INTERVAL = 2; // seconds between each ripple spawn

const AiOrb = ({ state }: AiOrbProps) => {
  const cfg = stateConfig[state];

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [cfg.pulseOpacity * 0.5, cfg.pulseOpacity, cfg.pulseOpacity * 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 rounded-full blur-3xl bg-primary/10"
      />

      {/* Ripple waves */}
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 112,
            height: 112,
            border: "1.5px solid hsla(190, 90%, 55%, 0.6)",
            boxShadow: "0 0 8px hsla(190, 90%, 55%, 0.3), inset 0 0 4px hsla(190, 90%, 55%, 0.1)",
          }}
          animate={{
            scale: [1, 3.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: RIPPLE_COUNT * RIPPLE_INTERVAL,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * RIPPLE_INTERVAL,
          }}
        />
      ))}

      {/* Core sphere */}
      <motion.div
        animate={{ scale: state === "speaking" ? [1, cfg.coreScale, 1] : cfg.coreScale }}
        transition={state === "speaking" ? { duration: 1.2, repeat: Infinity, ease: quintic as any } : { duration: 0.6 }}
        className="relative w-28 h-28 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 35%, hsla(190,90%,60%,0.25), hsla(190,90%,50%,0.08) 60%, transparent 80%)",
          boxShadow: "0 0 50px hsla(190,90%,50%,0.25), inset 0 0 30px hsla(190,90%,50%,0.1)",
          border: "1px solid hsla(190,90%,50%,0.2)",
        }}
      >
        <span
          className="text-mono font-bold tracking-[0.25em] text-xs"
          style={{
            color: "hsla(190, 90%, 65%, 0.9)",
            textShadow: "0 0 10px hsla(190,90%,50%,0.8), 0 0 30px hsla(190,90%,50%,0.4)",
          }}
        >
          JARVIS
        </span>
      </motion.div>

      {/* State indicator */}
      <div className="absolute -bottom-16 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            style={{ boxShadow: "0 0 8px hsla(190,90%,50%,0.8)" }}
          />
          <span className="text-mono text-xs tracking-[0.2em] text-primary neon-glow">{cfg.label}</span>
        </div>
      </div>
    </div>
  );
};

export default AiOrb;
