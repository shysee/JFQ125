'use client';

import { useState, useRef } from 'react';
import { AlignCenter, CheckCircle2, XCircle, ChevronRight, Calculator, Upload, Image as ImageIcon, FileSpreadsheet, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

const mockCandidates = [
  { id: 1, lanes: 5, waste: 15.0, adjustCost: 3, priorityCovered: true, score: 85, selected: true },
  { id: 2, lanes: 4, waste: 45.0, adjustCost: 1, priorityCovered: true, score: 72, selected: false },
  { id: 3, lanes: 6, waste: 5.0, adjustCost: 6, priorityCovered: false, score: 68, selected: false },
];

export default function NestingPage() {
  const [coilWidth, setCoilWidth] = useState('1250');
  const [leftTrim, setLeftTrim] = useState('10');
  const [rightTrim, setRightTrim] = useState('10');
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportMessage('正在识别图片中的订单数据...');

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: file.type,
                },
              },
              {
                text: 'Extract the steel coil slitting orders from this image. Return a JSON array of objects, each with "orderId" (string), "width" (number in mm), and "quantity" (number).',
              },
            ],
          },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  orderId: { type: Type.STRING },
                  width: { type: Type.NUMBER },
                  quantity: { type: Type.NUMBER },
                },
                required: ["orderId", "width", "quantity"],
              },
            },
          },
        });

        const orders = JSON.parse(response.text || '[]');
        console.log('Extracted orders:', orders);
        setImportMessage(`成功导入 ${orders.length} 条订单记录！`);
        setTimeout(() => setImportMessage(''), 3000);
        setIsImporting(false);
      };
    } catch (error) {
      console.error('OCR Error:', error);
      setImportMessage('图片识别失败，请重试。');
      setTimeout(() => setImportMessage(''), 3000);
      setIsImporting(false);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportMessage('正在解析表格数据...');

    try {
      const text = await file.text();
      // Simple CSV parsing simulation
      const lines = text.split('\n').filter(line => line.trim());
      setImportMessage(`成功导入 ${lines.length > 0 ? lines.length - 1 : 0} 条订单记录！`);
      setTimeout(() => setImportMessage(''), 3000);
    } catch (error) {
      console.error('CSV Error:', error);
      setImportMessage('表格解析失败，请重试。');
      setTimeout(() => setImportMessage(''), 3000);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">P08 拼单排样</h2>
          {importMessage && (
            <span className="text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-2">
              {isImporting && <Loader2 className="w-3 h-3 animate-spin" />}
              {importMessage}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <input type="file" accept=".csv,.xlsx,.xls" className="hidden" ref={fileInputRef} onChange={handleCsvUpload} />
          <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageUpload} />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors border border-zinc-700 disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4" />
            导入表格
          </button>
          <button 
            onClick={() => imageInputRef.current?.click()}
            disabled={isImporting}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors border border-zinc-700 disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4" />
            图片识别
          </button>
          <div className="w-px h-6 bg-zinc-800 self-center mx-1" />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <Calculator className="w-4 h-4" />
            重新计算排样
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <CheckCircle2 className="w-4 h-4" />
            确认并下发
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: Parameters & Candidates */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          {/* Parameters */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h3 className="font-medium text-zinc-300">排样参数</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-zinc-400 mb-1">母卷编号</label>
                <input type="text" defaultValue="COIL-20260318-A" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">母卷宽度 (mm)</label>
                <input type="number" value={coilWidth} onChange={e => setCoilWidth(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">母卷总长 (m)</label>
                <input type="number" defaultValue="5000" className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">左边料 (mm)</label>
                <input type="number" value={leftTrim} onChange={e => setLeftTrim(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">右边料 (mm)</label>
                <input type="number" value={rightTrim} onChange={e => setRightTrim(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col flex-1 min-h-0">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
              <h3 className="font-medium text-zinc-300">候选方案</h3>
              <span className="text-xs text-zinc-500 font-mono">系统推荐: 方案 #1</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {mockCandidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    candidate.selected 
                      ? 'bg-emerald-900/20 border-emerald-500/50' 
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-white">方案 #{candidate.id}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${candidate.selected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                      评分: {candidate.score}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm font-mono">
                    <span className="text-zinc-500">条带数: <span className="text-zinc-300">{candidate.lanes}</span></span>
                    <span className="text-zinc-500">废料: <span className={candidate.waste > 20 ? 'text-orange-400' : 'text-emerald-400'}>{candidate.waste} mm</span></span>
                    <span className="text-zinc-500">调刀代价: <span className="text-zinc-300">{candidate.adjustCost} 刀</span></span>
                    <span className="text-zinc-500">高优覆盖: {candidate.priorityCovered ? <CheckCircle2 className="inline w-4 h-4 text-emerald-500" /> : <XCircle className="inline w-4 h-4 text-red-500" />}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Layout Preview */}
        <div className="col-span-12 lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-medium text-zinc-300">刀盘布局预览 (方案 #1)</h3>
          </div>
          <div className="p-8 flex flex-col flex-1">
            {/* Visual Layout */}
            <div className="relative h-48 bg-zinc-950 border border-zinc-800 rounded-lg mb-8 mt-12">
              {/* Ruler */}
              <div className="absolute -top-8 left-0 right-0 flex justify-between text-xs font-mono text-zinc-500">
                <span>0</span>
                <span>{coilWidth}</span>
              </div>
              
              {/* Left Trim */}
              <div className="absolute top-0 bottom-0 left-0 bg-zinc-800/80 border-r border-zinc-700 flex items-center justify-center" style={{ width: `${(parseFloat(leftTrim)/parseFloat(coilWidth))*100}%` }}>
                <span className="text-[10px] text-zinc-500 -rotate-90 whitespace-nowrap">边料</span>
              </div>
              
              {/* Right Trim */}
              <div className="absolute top-0 bottom-0 right-0 bg-zinc-800/80 border-l border-zinc-700 flex items-center justify-center" style={{ width: `${(parseFloat(rightTrim)/parseFloat(coilWidth))*100}%` }}>
                <span className="text-[10px] text-zinc-500 -rotate-90 whitespace-nowrap">边料</span>
              </div>

              {/* Strips */}
              <div className="absolute top-0 bottom-0 flex" style={{ left: `${(parseFloat(leftTrim)/parseFloat(coilWidth))*100}%`, right: `${(parseFloat(rightTrim)/parseFloat(coilWidth))*100}%` }}>
                <div className="h-full border-r border-zinc-700 bg-emerald-900/30 flex flex-col items-center justify-center relative group" style={{ width: '20%' }}>
                  <span className="text-xs font-mono text-emerald-400">246mm</span>
                  <span className="text-[10px] text-zinc-500 mt-1">ORD-01</span>
                  {/* Knife Line */}
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-500 translate-x-1/2 z-10" />
                  <div className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] text-blue-400 font-mono">刀2</div>
                </div>
                <div className="h-full border-r border-zinc-700 bg-indigo-900/30 flex flex-col items-center justify-center relative group" style={{ width: '30%' }}>
                  <span className="text-xs font-mono text-indigo-400">369mm</span>
                  <span className="text-[10px] text-zinc-500 mt-1">ORD-02</span>
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-500 translate-x-1/2 z-10" />
                  <div className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] text-blue-400 font-mono">刀3</div>
                </div>
                <div className="h-full border-r border-zinc-700 bg-orange-900/30 flex flex-col items-center justify-center relative group" style={{ width: '15%' }}>
                  <span className="text-xs font-mono text-orange-400">184.5mm</span>
                  <span className="text-[10px] text-zinc-500 mt-1">ORD-03</span>
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-500 translate-x-1/2 z-10" />
                  <div className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] text-blue-400 font-mono">刀4</div>
                </div>
                <div className="h-full border-r border-zinc-700 bg-emerald-900/30 flex flex-col items-center justify-center relative group" style={{ width: '20%' }}>
                  <span className="text-xs font-mono text-emerald-400">246mm</span>
                  <span className="text-[10px] text-zinc-500 mt-1">ORD-01</span>
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-500 translate-x-1/2 z-10" />
                  <div className="absolute -bottom-6 right-0 translate-x-1/2 text-[10px] text-blue-400 font-mono">刀5</div>
                </div>
                <div className="h-full bg-red-900/20 flex flex-col items-center justify-center relative group" style={{ width: '15%' }}>
                  <span className="text-xs font-mono text-red-400">184.5mm</span>
                  <span className="text-[10px] text-zinc-500 mt-1">废料</span>
                </div>
              </div>
              
              {/* First Knife */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 -translate-x-1/2 z-10" style={{ left: `${(parseFloat(leftTrim)/parseFloat(coilWidth))*100}%` }} />
              <div className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-blue-400 font-mono" style={{ left: `${(parseFloat(leftTrim)/parseFloat(coilWidth))*100}%` }}>刀1</div>
            </div>

            {/* Details Table */}
            <div className="flex-1 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 font-mono border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">条带#</th>
                    <th className="px-4 py-3">订单号</th>
                    <th className="px-4 py-3">宽度(mm)</th>
                    <th className="px-4 py-3">刀盘区间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 font-mono">
                  <tr className="hover:bg-zinc-900/50">
                    <td className="px-4 py-3 text-zinc-400">1</td>
                    <td className="px-4 py-3 text-white">ORD-01</td>
                    <td className="px-4 py-3 text-emerald-400">246.0</td>
                    <td className="px-4 py-3 text-zinc-500">刀1 - 刀2</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="px-4 py-3 text-zinc-400">2</td>
                    <td className="px-4 py-3 text-white">ORD-02</td>
                    <td className="px-4 py-3 text-indigo-400">369.0</td>
                    <td className="px-4 py-3 text-zinc-500">刀2 - 刀3</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="px-4 py-3 text-zinc-400">3</td>
                    <td className="px-4 py-3 text-white">ORD-03</td>
                    <td className="px-4 py-3 text-orange-400">184.5</td>
                    <td className="px-4 py-3 text-zinc-500">刀3 - 刀4</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/50">
                    <td className="px-4 py-3 text-zinc-400">4</td>
                    <td className="px-4 py-3 text-white">ORD-01</td>
                    <td className="px-4 py-3 text-emerald-400">246.0</td>
                    <td className="px-4 py-3 text-zinc-500">刀4 - 刀5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">下发状态:</span>
                <span className="text-sm font-mono text-zinc-500">未下发</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-400">校验结果:</span>
                <span className="text-sm font-mono text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> 验证通过</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
