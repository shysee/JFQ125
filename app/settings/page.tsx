'use client';

import { useState } from 'react';
import { Save, RotateCcw, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('timeout');

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">P12 系统参数</h2>
        <div className="flex gap-3">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors border border-zinc-700">
            <RotateCcw className="w-4 h-4" />
            恢复默认
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            保存参数
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 gap-6">
        {/* Sidebar Tabs */}
        <div className="w-48 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('timeout')}
            className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${activeTab === 'timeout' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent'}`}
          >
            超时参数组
          </button>
          <button 
            onClick={() => setActiveTab('threshold')}
            className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${activeTab === 'threshold' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent'}`}
          >
            阈值参数组
          </button>
          <button 
            onClick={() => setActiveTab('speed')}
            className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${activeTab === 'speed' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent'}`}
          >
            速度参数组
          </button>
          <button 
            onClick={() => setActiveTab('lube')}
            className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${activeTab === 'lube' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent'}`}
          >
            润滑泵定时组
          </button>
          
          <div className="mt-auto bg-red-950/30 border border-red-900/50 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 text-red-400">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-xs font-bold">工程师权限</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              修改系统参数可能影响设备运行安全与产品质量，请谨慎操作。
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">
              {activeTab === 'timeout' && '超时参数组 (ms)'}
              {activeTab === 'threshold' && '阈值参数组'}
              {activeTab === 'speed' && '速度参数组'}
              {activeTab === 'lube' && '润滑泵定时组'}
            </h3>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === 'timeout' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ParameterInput label="主辊停稳超时" address="iArray[20]" defaultValue="3000" min="1000" max="10000" unit="ms" />
                <ParameterInput label="压板动作超时" address="iArray[21]" defaultValue="2000" min="500" max="5000" unit="ms" />
                <ParameterInput label="拉刀下降超时" address="iArray[22]" defaultValue="2000" min="500" max="5000" unit="ms" />
                <ParameterInput label="拉刀上升超时" address="iArray[23]" defaultValue="2000" min="500" max="5000" unit="ms" />
                <ParameterInput label="横切移动超时" address="iArray[24]" defaultValue="5000" min="1000" max="15000" unit="ms" />
                <ParameterInput label="单刀精定位超时" address="iArray[25]" defaultValue="8000" min="2000" max="20000" unit="ms" />
                <ParameterInput label="摆杆动作超时" address="iArray[26]" defaultValue="2000" min="500" max="5000" unit="ms" />
                <ParameterInput label="矫平移动超时" address="iArray[27]" defaultValue="3000" min="500" max="5000" unit="ms" />
                <ParameterInput label="对中移动超时" address="iArray[28]" defaultValue="8000" min="2000" max="15000" unit="ms" />
                <ParameterInput label="提刀恢复超时" address="iArray[29]" defaultValue="3000" min="500" max="5000" unit="ms" />
              </div>
            )}

            {activeTab === 'threshold' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ParameterInput label="主辊停稳速度阈值" address="rArray[80]" defaultValue="0.5" min="0.1" max="50.0" unit="mm/s" />
                <ParameterInput label="对中到位容差" address="rArray[75]" defaultValue="0.5" min="0.1" max="5.0" unit="mm" />
                <ParameterInput label="矫平到位容差" address="rArray[76]" defaultValue="0.2" min="0.05" max="1.0" unit="mm" />
                <ParameterInput label="摆杆到位容差" address="rArray[77]" defaultValue="0.1" min="0.05" max="0.5" unit="mm" />
              </div>
            )}

            {activeTab === 'speed' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ParameterInput label="主辊点动速度" address="rArray[78]" defaultValue="150.0" min="10.0" max="500.0" unit="mm/s" />
                <ParameterInput label="调刀反转速度" address="固定值" defaultValue="745.3" min="-" max="-" unit="mm/s" disabled />
              </div>
            )}

            {activeTab === 'lube' && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <ParameterInput label="润滑间隔" address="Lube.Interval" defaultValue="30" min="5" max="120" unit="分钟" />
                <ParameterInput label="每次运行时长" address="Lube.Duration" defaultValue="30" min="10" max="120" unit="秒" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParameterInput({ label, address, defaultValue, min, max, unit, disabled = false }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        <span className="text-[10px] text-zinc-500 font-mono">{address}</span>
      </div>
      <div className="relative">
        <input 
          type="number" 
          defaultValue={defaultValue}
          disabled={disabled}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono disabled:opacity-50 disabled:cursor-not-allowed pr-12"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-mono">{unit}</span>
      </div>
      <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div>
    </div>
  );
}
