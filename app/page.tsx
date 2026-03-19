'use client';

import { Play, Square, RotateCcw, Settings2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">P01 生产监控</h2>
        <div className="flex gap-3">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <Play className="w-4 h-4 fill-current" />
            启动
          </button>
          <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <Square className="w-4 h-4 fill-current" />
            停止
          </button>
          <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <RotateCcw className="w-4 h-4" />
            复位
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Top Left: Batch & Lane Progress */}
        <div className="col-span-8 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
            <h3 className="font-medium text-zinc-300">批次与订单进度</h3>
            <div className="flex gap-4 text-sm font-mono text-zinc-400">
              <span>批次: <strong className="text-white">B20260318-01</strong></span>
              <span>母卷宽: <strong className="text-white">1250 mm</strong></span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>卷料进度 (2450m / 5000m)</span>
                <span>49%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[49%]" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/50 font-mono">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-md">条带#</th>
                    <th className="px-4 py-3">订单号</th>
                    <th className="px-4 py-3">条宽(mm)</th>
                    <th className="px-4 py-3">定尺(mm)</th>
                    <th className="px-4 py-3">已完/计划</th>
                    <th className="px-4 py-3 w-48">进度</th>
                    <th className="px-4 py-3 rounded-tr-md">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 font-mono">
                  {[1, 2, 3, 4, 5].map((lane) => (
                    <tr key={lane} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-400">{lane}</td>
                      <td className="px-4 py-3 text-white">ORD-{202600 + lane}</td>
                      <td className="px-4 py-3 text-emerald-400">200.0</td>
                      <td className="px-4 py-3 text-blue-400">1500.0</td>
                      <td className="px-4 py-3 text-zinc-300">45 / 100</td>
                      <td className="px-4 py-3">
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[45%]" />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-xs">生产中</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Right: Main Drive & Encoder */}
        <div className="col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">主辊与编码器</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-6">
            <div className="bg-zinc-950 rounded-lg p-6 border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
              <span className="text-zinc-500 font-mono text-sm mb-2">当前速度 (mm/s)</span>
              <span className="text-5xl font-mono font-light text-emerald-400 tracking-tighter">125.4</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                <span className="block text-zinc-500 font-mono text-xs mb-1">已切长度 (mm)</span>
                <span className="text-xl font-mono text-white">2450000</span>
              </div>
              <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                <span className="block text-zinc-500 font-mono text-xs mb-1">横切刀位置 (mm)</span>
                <span className="text-xl font-mono text-blue-400">1400.0</span>
              </div>
            </div>

            <div className="mt-auto bg-zinc-950 rounded-lg p-4 border border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400 font-mono text-sm">主辊状态</span>
              <span className="text-emerald-400 font-mono text-sm">运行中 (Running)</span>
            </div>
          </div>
        </div>

        {/* Bottom Left: Process Status */}
        <div className="col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">流程状态</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <span className="block text-zinc-500 font-mono text-xs mb-2">主状态</span>
              <span className="text-2xl font-bold text-emerald-400">自动运行</span>
            </div>
            <div>
              <span className="block text-zinc-500 font-mono text-xs mb-2">当前切哪条</span>
              <span className="text-2xl font-mono text-white">Lane 3</span>
            </div>
            <div>
              <span className="block text-zinc-500 font-mono text-xs mb-2">空白宽度</span>
              <span className="text-2xl font-mono text-white">2.5%</span>
            </div>
            <div className="flex items-end">
              <button className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors w-full justify-center">
                <Settings2 className="w-4 h-4" />
                手动模式
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Right: Quick Actions / Alerts */}
        <div className="col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">系统提示</h3>
          </div>
          <div className="p-6 flex flex-col gap-3 overflow-y-auto">
            <div className="bg-zinc-950 border-l-2 border-emerald-500 p-3 rounded-r-md">
              <p className="text-sm text-zinc-300 font-mono">系统运行正常，各项参数在允许范围内。</p>
              <span className="text-xs text-zinc-600 font-mono mt-1 block">16:05:22</span>
            </div>
            <div className="bg-zinc-950 border-l-2 border-blue-500 p-3 rounded-r-md">
              <p className="text-sm text-zinc-300 font-mono">订单 ORD-202601 即将完成，请准备下一批次。</p>
              <span className="text-xs text-zinc-600 font-mono mt-1 block">15:50:10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
