'use client';

import { useState } from 'react';
import { ArrowLeftToLine, ArrowRightToLine, ArrowDownToLine, ArrowUpToLine, Settings2, AlertCircle } from 'lucide-react';

export default function CrossCutPage() {
  const [knifePos, setKnifePos] = useState(1400.0);
  const [isLeftPark, setIsLeftPark] = useState(false);
  const [isRightPark, setIsRightPark] = useState(true);
  
  // Cylinder states
  const [clampUp, setClampUp] = useState(true);
  const [clampDown, setClampDown] = useState(false);
  const [cutterUp, setCutterUp] = useState(true);
  const [cutterDown, setCutterDown] = useState(false);
  const [cutterHome, setCutterHome] = useState(true);

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">P03 横切刀控制</h2>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-md">
          <span className="text-sm text-zinc-400">横切步骤:</span>
          <span className="text-sm font-medium text-blue-400">等待指令 (WaitCmd)</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Top: Position & Status */}
        <div className="col-span-12 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">位置与状态</h3>
          </div>
          <div className="p-8 flex flex-col gap-8">
            {/* Large Position Display */}
            <div className="flex items-center justify-between bg-zinc-950 p-6 rounded-xl border border-zinc-800">
              <div className="flex flex-col">
                <span className="text-zinc-500 font-mono text-sm mb-2">横切刀当前位置 (mm)</span>
                <span className="text-6xl font-mono font-light text-blue-400 tracking-tighter">{knifePos.toFixed(1)}</span>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-zinc-400">左停机位 (0mm)</span>
                  <div className={`w-4 h-4 rounded-full border-2 ${isLeftPark ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 border-zinc-700'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-zinc-400">右停机位 (1400mm)</span>
                  <div className={`w-4 h-4 rounded-full border-2 ${isRightPark ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 border-zinc-700'}`} />
                </div>
              </div>
            </div>

            {/* Visual Track */}
            <div className="relative h-16 bg-zinc-950 rounded-lg border border-zinc-800 px-8 flex items-center">
              <div className="absolute left-8 right-8 h-1 bg-zinc-800 rounded-full" />
              <div className="absolute left-8 w-2 h-6 bg-zinc-600 -translate-y-1/2 top-1/2" />
              <div className="absolute right-8 w-2 h-6 bg-zinc-600 -translate-y-1/2 top-1/2" />
              
              {/* Knife Indicator */}
              <div 
                className="absolute w-6 h-10 bg-blue-500 rounded-sm -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500"
                style={{ left: `calc(2rem + (100% - 4rem) * (${knifePos} / 1400))` }}
              >
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-blue-400">{knifePos.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left: Cylinder Status */}
        <div className="col-span-12 lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">气缸状态 (传感器)</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-mono text-sm">压板上位 (I1.4)</span>
              <div className={`w-3 h-3 rounded-full ${clampUp ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-mono text-sm">压板下位 (I1.5)</span>
              <div className={`w-3 h-3 rounded-full ${clampDown ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-mono text-sm">拉刀上位 (I1.2)</span>
              <div className={`w-3 h-3 rounded-full ${cutterUp ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-mono text-sm">拉刀下位 (I1.3)</span>
              <div className={`w-3 h-3 rounded-full ${cutterDown ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
            </div>
            <div className="col-span-2 bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 font-mono text-sm">原点信号 (I2.1)</span>
              <div className={`w-3 h-3 rounded-full ${cutterHome ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} />
            </div>
            
            <div className="col-span-2 mt-2 flex items-center gap-2 text-zinc-500 text-xs font-mono">
              <AlertCircle className="w-4 h-4" />
              <span>切割行程固定为 6.2 mm</span>
            </div>
          </div>
        </div>

        {/* Bottom Right: Manual Operations */}
        <div className="col-span-12 lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col relative overflow-hidden">
          {/* Manual Mode Overlay (if not in manual mode) */}
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center border border-zinc-800 rounded-xl">
            <Settings2 className="w-8 h-8 text-zinc-500 mb-3" />
            <p className="text-zinc-300 font-medium">手动操作区</p>
            <p className="text-zinc-500 text-sm mt-1">请先切换至 Manual 模式</p>
            <button className="mt-4 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-md text-sm hover:bg-blue-600/30 transition-colors">
              请求手动模式
            </button>
          </div>

          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">手动操作 (Manual)</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowDownToLine className="w-4 h-4" />
              压板压下
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowUpToLine className="w-4 h-4" />
              压板释放
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowDownToLine className="w-4 h-4" />
              拉刀下降
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowUpToLine className="w-4 h-4" />
              拉刀上升
            </button>
            
            <div className="col-span-2 h-px bg-zinc-800 my-2" />
            
            <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowLeftToLine className="w-4 h-4" />
              回左停机位 (0mm)
            </button>
            <button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <ArrowRightToLine className="w-4 h-4" />
              回右停机位 (1400mm)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
