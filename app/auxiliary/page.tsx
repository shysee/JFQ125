'use client';

import { useState } from 'react';
import { ArrowDownToLine, ArrowUpToLine, ArrowLeftToLine, ArrowRightToLine, Play, Square, Settings2, RefreshCw, Gauge, ArrowLeftRight, AlignHorizontalSpaceAround } from 'lucide-react';

export default function AuxiliaryPage() {
  // Pinch Roll State
  const [pinchDown, setPinchDown] = useState(true);
  const [pinchPressure, setPinchPressure] = useState('4.5');

  // Leveling Roll State
  const [levelingSpeed, setLevelingSpeed] = useState('80.0');
  const [levelingGap, setLevelingGap] = useState('1.5');
  const [levelingRunning, setLevelingRunning] = useState(false);

  // Centering Device State
  const [centeringAuto, setCenteringAuto] = useState(true);
  const [targetWidth, setTargetWidth] = useState('1250.0');
  const [leftPos, setLeftPos] = useState(625.0);
  const [rightPos, setRightPos] = useState(625.0);

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto w-full overflow-y-auto pb-6 pr-2">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold tracking-tight">P05 辅助辊道与对中</h2>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-md">
          <span className="text-sm text-zinc-400">系统模式:</span>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">Auto (自动)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 shrink-0">
        {/* Pinch Roll (压料辊道) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-full">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5 text-zinc-400" />
              <h3 className="font-medium text-zinc-300">压料辊道 (Pinch Roll)</h3>
            </div>
            <div className="p-6 flex flex-col gap-8 flex-1">
              {/* Status */}
              <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                <span className="text-sm font-mono text-zinc-400">当前状态</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${pinchDown ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-600'}`} />
                  <span className={`text-sm font-mono ${pinchDown ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {pinchDown ? '已压下 (Down)' : '已抬起 (Up)'}
                  </span>
                </div>
              </div>

              {/* Pressure */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    气缸压力设定 (Bar)
                  </label>
                  <span className="text-xs text-zinc-500 font-mono">当前: {pinchPressure} Bar</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={pinchPressure}
                    onChange={(e) => setPinchPressure(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-center"
                  />
                  <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded-md font-medium transition-colors border border-zinc-700">
                    写入
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button 
                  onClick={() => setPinchDown(true)}
                  className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border ${pinchDown ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'}`}
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  压下
                </button>
                <button 
                  onClick={() => setPinchDown(false)}
                  className={`py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border ${!pinchDown ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'}`}
                >
                  <ArrowUpToLine className="w-4 h-4" />
                  抬起
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leveling Roll (矫平辊道) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-full">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-zinc-400" />
              <h3 className="font-medium text-zinc-300">矫平辊道 (Leveling Roll)</h3>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              {/* Status */}
              <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                <span className="text-sm font-mono text-zinc-400">运行状态</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${levelingRunning ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-zinc-600'}`} />
                  <span className={`text-sm font-mono ${levelingRunning ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {levelingRunning ? '运行中 (Running)' : '已停止 (Stopped)'}
                  </span>
                </div>
              </div>

              {/* Speed & Gap Settings */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400 flex justify-between">
                    <span>速度设定 (mm/s)</span>
                    <span className="text-xs text-zinc-500 font-mono">当前: {levelingRunning ? levelingSpeed : '0.0'}</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={levelingSpeed}
                      onChange={(e) => setLevelingSpeed(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-center"
                    />
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded-md font-medium transition-colors border border-zinc-700">
                      写入
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-400 flex justify-between">
                    <span>辊间隙设定 (mm)</span>
                    <span className="text-xs text-zinc-500 font-mono">当前: {levelingGap}</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={levelingGap}
                      onChange={(e) => setLevelingGap(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-center"
                    />
                    <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded-md font-medium transition-colors border border-zinc-700">
                      调整
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button 
                  onClick={() => setLevelingRunning(true)}
                  className="py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  正转
                </button>
                <button 
                  onClick={() => setLevelingRunning(false)}
                  className="py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Square className="w-4 h-4 fill-current" />
                  停止
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Centering Device (对中装置) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-full">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlignHorizontalSpaceAround className="w-5 h-5 text-zinc-400" />
                <h3 className="font-medium text-zinc-300">对中装置 (Centering)</h3>
              </div>
              <button 
                onClick={() => setCenteringAuto(!centeringAuto)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${centeringAuto ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
              >
                {centeringAuto ? '自动模式' : '手动模式'}
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              {/* Visual Centering */}
              <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex flex-col items-center gap-4">
                <div className="w-full relative h-12 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center overflow-hidden">
                  {/* Center Line */}
                  <div className="absolute top-0 bottom-0 w-px bg-emerald-500/50 z-10" />
                  
                  {/* Left Pusher */}
                  <div className="absolute top-0 bottom-0 left-0 bg-blue-900/40 border-r-2 border-blue-500 transition-all duration-500" style={{ width: `calc(50% - ${(leftPos / 1250) * 50}%)` }} />
                  
                  {/* Right Pusher */}
                  <div className="absolute top-0 bottom-0 right-0 bg-blue-900/40 border-l-2 border-blue-500 transition-all duration-500" style={{ width: `calc(50% - ${(rightPos / 1250) * 50}%)` }} />
                  
                  {/* Coil Representation */}
                  <div className="h-8 bg-zinc-700 rounded-sm z-0 transition-all duration-500" style={{ width: `${((leftPos + rightPos) / 1250) * 50}%` }} />
                </div>
                
                <div className="flex w-full justify-between text-xs font-mono text-zinc-500">
                  <span>左挡板: {leftPos.toFixed(1)}</span>
                  <span className="text-emerald-400">偏差: {Math.abs(leftPos - rightPos).toFixed(1)}</span>
                  <span>右挡板: {rightPos.toFixed(1)}</span>
                </div>
              </div>

              {/* Target Width */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">目标钢卷宽度 (mm)</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-center"
                    disabled={centeringAuto}
                  />
                  <button 
                    disabled={centeringAuto}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 rounded-md font-medium transition-colors border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    设定
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button 
                  disabled={centeringAuto}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightToLine className="w-4 h-4" />
                  左挡板向内
                </button>
                <button 
                  disabled={centeringAuto}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeftToLine className="w-4 h-4" />
                  右挡板向内
                </button>
                <button 
                  disabled={centeringAuto}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeftToLine className="w-4 h-4" />
                  左挡板向外
                </button>
                <button 
                  disabled={centeringAuto}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightToLine className="w-4 h-4" />
                  右挡板向外
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
