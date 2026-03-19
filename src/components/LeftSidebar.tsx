import { Cpu, HardDrive, Wifi, Mic, Zap, Thermometer } from "lucide-react";

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  percent?: number;
  color?: string;
}

const Metric = ({ icon, label, value, percent, color = "bg-primary" }: MetricProps) => (
  <div className="py-2.5 border-t border-primary/5">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2 text-label">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-mono text-[11px] text-foreground">{value}</span>
    </div>
    {percent !== undefined && (
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${percent}%`, opacity: 0.7 }} />
      </div>
    )}
  </div>
);

const LeftSidebar = () => {
  return (
    <div className="w-64 h-full flex flex-col glass-panel border-r border-primary/10 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-label text-primary mb-3 flex items-center gap-2">
          <Zap className="w-3 h-3" strokeWidth={1.5} />
          SYSTEM STATUS
        </h3>
        <Metric icon={<Cpu className="w-3 h-3" strokeWidth={1.5} />} label="CPU" value="67%" percent={67} />
        <Metric icon={<HardDrive className="w-3 h-3" strokeWidth={1.5} />} label="MEMORY" value="7.8 / 16 GB" percent={49} />
        <Metric icon={<HardDrive className="w-3 h-3" strokeWidth={1.5} />} label="STORAGE" value="303 / 512 GB" percent={59} />
        <Metric icon={<Wifi className="w-3 h-3" strokeWidth={1.5} />} label="NETWORK" value="CONNECTED" />
        <Metric icon={<Mic className="w-3 h-3" strokeWidth={1.5} />} label="MIC" value="ACTIVE" />
        <Metric icon={<Thermometer className="w-3 h-3" strokeWidth={1.5} />} label="CORE TEMP" value="63°C" percent={63} color="bg-amber-500/70" />
        <Metric icon={<Zap className="w-3 h-3" strokeWidth={1.5} />} label="BATTERY" value="85%" percent={85} color="bg-emerald-500/70" />
      </div>
    </div>
  );
};

export default LeftSidebar;