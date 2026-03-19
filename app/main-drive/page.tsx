'use client';

import { useState } from 'react';
import { Play, Square, FastForward, Rewind, RefreshCw, AlertTriangle, Scissors, Settings2 } from 'lucide-react';

const mockBlades = [
  { id: 1, pos: 10.0, enabled: true },
  { id: 2, pos: 256.0, enabled: true },
  { id: 3, pos: 625.0, enabled: true },
  { id: 4, pos: 809.5, enabled: true },
  { id: 5, pos: 1055.5, enabled: true },
  { id: 6, pos: 1240.0, enabled: true },
  { id: 7, pos: 1320.0, enabled: false },
  { id: 8, pos: 1360.0, enabled: false },
];

export default function MainDrivePage() {
  const [setSpeed, setSetSpeed] = useState('150.0');
  const [actSpeed, setActSpeed] = useState(125.4);
  const [encLength, setEncLength] = useState(2450000);

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto w-full overflow-y-auto pb-6 pr-2">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold tracking-tight">P02 主辊控制</h2>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-md">
          <span className="text-sm text-zinc-400">主辊状态:</span>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">Running (运行中)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 shrink-0">
        {/* Left Column: Speed Control */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col flex-1">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h3 className="font-medium text-zinc-300">速度控制</h3>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center flex-1 relative overflow-hidden">
              {/* Speed Gauge / Display */}
              <div className="w-64 h-64 rounded-full border-[8px] border-zinc-800 flex flex-col items-center justify-center relative bg-zinc-950 shadow-inner">
                <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-t-transparent border-l-transparent rotate-45 opacity-20" />
                <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-b-transparent border-r-transparent -rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                
                <span className="text-zinc-500 font-mono text-sm mb-1">当前速度 (mm/s)</span>
                <span className="text-6xl font-mono font-light text-emerald-400 tracking-tighter">{actSpeed.toFixed(1)}</span>
                <span className="text-zinc-500 font-mono text-xs mt-2">{(actSpeed * 60 / 895.353).toFixed(1)} rpm</span>
              </div>

              {/* Speed Setting */}
              <div className="mt-12 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-400">目标速度设定 (mm/s)</label>
                  <span className="text-xs text-zinc-500 font-mono">Max: 500.0</span>
                </div>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    value={setSpeed}
                    onChange={(e) => setSetSpeed(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-4 py-3 text-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-center"
                  />
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 rounded-md font-medium transition-colors border border-zinc-700">
                    写入
                  </button>
                </div>
                <div className="flex justify-between text-xs font-mono text-zinc-500">
                  <span>对应转速: {(parseFloat(setSpeed || '0') * 60 / 895.353).toFixed(1)} rpm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Operations & Encoder */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          {/* Operations */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h3 className="font-medium text-zinc-300">操作面板</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <button className="col-span-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-lg">
                <Play className="w-5 h-5 fill-current" />
                正转启动 (Auto)
              </button>
              <button className="col-span-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-lg">
                <Square className="w-5 h-5 fill-current" />
                停止 (Stop)
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-4 rounded-lg font-medium flex flex-col items-center justify-center gap-2 transition-colors active:bg-zinc-600">
                <FastForward className="w-5 h-5" />
                <span className="text-sm">正转点动 (按住)</span>
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-4 rounded-lg font-medium flex flex-col items-center justify-center gap-2 transition-colors active:bg-zinc-600 opacity-50 cursor-not-allowed" title="仅维护模式可用">
                <Rewind className="w-5 h-5" />
                <span className="text-sm">反转点动 (按住)</span>
              </button>
            </div>
          </div>

          {/* Encoder */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col flex-1">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
              <h3 className="font-medium text-zinc-300">编码器数据</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-400 font-mono">状态正常</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              <div className="bg-zinc-950 rounded-lg p-6 border border-zinc-800">
                <span className="block text-zinc-500 font-mono text-sm mb-2">累积长度 (mm)</span>
                <span className="text-4xl font-mono text-white tracking-tight">{encLength.toLocaleString()}</span>
              </div>
              
              <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 flex justify-between items-center">
                <span className="text-zinc-500 font-mono text-sm">测量轮速度</span>
                <span className="text-lg font-mono text-zinc-300">{actSpeed.toFixed(1)} mm/s</span>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800/50">
                <button 
                  onClick={() => {
                    if (confirm('确定要将编码器清零吗？此操作通常在换卷时进行。')) {
                      setEncLength(0);
                    }
                  }}
                  className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 text-orange-400 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  编码器清零
                </button>
                <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-3 h-3" />
                  清零操作需二次确认
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slitting Blades Real-time Position & Adjustment */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-zinc-400" />
            <h3 className="font-medium text-zinc-300">分切刀盘实时位置与调整</h3>
          </div>
          <div className="flex gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> 工作中</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-zinc-600 rounded-full"></div> 停机位</span>
          </div>
        </div>
        
        <div className="p-8 overflow-x-auto">
          <div className="min-w-[800px] relative h-32 bg-zinc-950 border border-zinc-800 rounded-lg mt-4 mb-2">
            {/* Ruler marks */}
            <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs font-mono text-zinc-500 px-4">
              <span>0mm</span>
              <span>1400mm</span>
            </div>
            
            {/* Coil Area (0 - 1250) */}
            <div className="absolute top-0 bottom-0 left-4 bg-blue-900/10 border-x border-blue-500/20" style={{ width: 'calc((1250 / 1400) * (100% - 2rem))' }}>
              <span className="absolute bottom-2 left-2 text-xs font-mono text-blue-500/40">母卷工作区 (1250mm)</span>
            </div>
            
            {/* Park Area (1250 - 1400) */}
            <div className="absolute top-0 bottom-0 right-4 bg-zinc-800/30 border-r border-zinc-700" style={{ width: 'calc((150 / 1400) * (100% - 2rem))' }}>
              <span className="absolute bottom-2 right-2 text-xs font-mono text-zinc-500">停机位</span>
            </div>

            {/* Main Roller Line */}
            <div className="absolute top-1/2 left-4 right-4 h-2 bg-zinc-800 -translate-y-1/2 rounded-full shadow-inner" />

            {/* Blades */}
            {mockBlades.map(blade => (
              <div 
                key={blade.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group z-10 transition-all duration-500"
                style={{ left: `calc(1rem + (${blade.pos} / 1400) * (100% - 2rem))` }}
              >
                <div className={`text-[10px] font-mono mb-1 px-1.5 py-0.5 rounded ${blade.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                  {blade.pos.toFixed(1)}
                </div>
                <div className={`w-1 h-8 ${blade.enabled ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'} rounded-full relative`}>
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${blade.enabled ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                </div>
                <div className="text-[10px] font-mono mt-3 text-zinc-500 font-medium">刀{blade.id}</div>
              </div>
            ))}
          </div>

          {/* Blade Adjustment Controls */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col gap-3">
              <span className="text-sm font-medium text-zinc-400">上刀盘间隙目标</span>
              <div className="flex gap-2">
                <input type="number" defaultValue="2.5" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
                <span className="text-zinc-500 font-mono text-sm self-center">mm</span>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col gap-3">
              <span className="text-sm font-medium text-zinc-400">下刀盘横向微调</span>
              <div className="flex gap-2">
                <input type="number" defaultValue="0.5" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
                <span className="text-zinc-500 font-mono text-sm self-center">mm</span>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex flex-col gap-3">
              <span className="text-sm font-medium text-zinc-400">调刀状态</span>
              <div className="flex items-center gap-2 h-full">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-mono text-blue-400">正在调整刀盘 3...</span>
              </div>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                <Settings2 className="w-4 h-4" />
                执行自动调刀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
