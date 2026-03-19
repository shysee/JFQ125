'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, ShieldAlert, Droplet } from 'lucide-react';

export function Topbar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
      {/* Left: Device & Time */}
      <div className="flex items-center gap-6 text-zinc-300">
        <div className="font-mono text-sm">
          <span className="text-zinc-500 mr-2">DEVICE:</span>
          <span className="text-white">JFQ125-01</span>
        </div>
        <div className="font-mono text-sm">
          <span className="text-zinc-500 mr-2">TIME:</span>
          <span className="text-white">{time}</span>
        </div>
      </div>

      {/* Center: Main Status */}
      <div className="flex items-center justify-center flex-1">
        <div className="bg-emerald-900/30 border border-emerald-500/30 px-6 py-1.5 rounded-full flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-bold tracking-widest text-sm">自动运行</span>
          <span className="text-emerald-500/50">|</span>
          <span className="text-emerald-400/80 text-xs font-mono">AUTO MODE</span>
        </div>
      </div>

      {/* Right: Indicators */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-zinc-700/50">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-zinc-400 font-mono">安全门: 闭合</span>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-zinc-700/50">
          <Droplet className="w-4 h-4 text-zinc-500" />
          <span className="text-xs text-zinc-400 font-mono">润滑: 待机</span>
        </div>
        <div className="flex items-center gap-2 bg-red-950/30 px-3 py-1.5 rounded-md border border-red-900/30">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-xs text-red-400 font-mono">报警: 0</span>
        </div>
      </div>
    </header>
  );
}
