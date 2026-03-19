'use client';

import { Plus, Search, Filter, PlayCircle, PauseCircle, Trash2, Edit } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-202601', customer: '客户A', material: 'Q235', thickness: 2.0, width: 200.0, length: 1500.0, total: 100, remain: 45, priority: 1, status: '生产中', allowMix: true },
  { id: 'ORD-202602', customer: '客户B', material: 'Q235', thickness: 2.0, width: 350.0, length: 2000.0, total: 50, remain: 50, priority: 2, status: '待排产', allowMix: true },
  { id: 'ORD-202603', customer: '客户C', material: 'SPCC', thickness: 1.5, width: 150.0, length: 1000.0, total: 200, remain: 200, priority: 3, status: '待排产', allowMix: false },
  { id: 'ORD-202604', customer: '客户A', material: 'Q235', thickness: 2.0, width: 400.0, length: 1500.0, total: 80, remain: 0, priority: 2, status: '完成', allowMix: true },
  { id: 'ORD-202605', customer: '客户D', material: 'DX51D', thickness: 1.0, width: 120.0, length: 800.0, total: 300, remain: 300, priority: 1, status: '挂起', allowMix: true },
];

export default function OrdersPage() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">P07 订单池</h2>
        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            新建订单
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
            <PlayCircle className="w-4 h-4" />
            发起排样
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="搜索订单号、客户..." 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md py-2 pl-9 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all font-mono"
            />
          </div>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors border border-zinc-700">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>

        {/* Data Grid */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950/80 sticky top-0 z-10 font-mono shadow-sm">
              <tr>
                <th className="px-6 py-4 font-medium">订单号</th>
                <th className="px-6 py-4 font-medium">客户</th>
                <th className="px-6 py-4 font-medium">材质/厚度</th>
                <th className="px-6 py-4 font-medium">条宽(mm)</th>
                <th className="px-6 py-4 font-medium">定尺(mm)</th>
                <th className="px-6 py-4 font-medium">总量/剩余</th>
                <th className="px-6 py-4 font-medium">优先级</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 font-mono">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 text-white font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-zinc-400">{order.customer}</td>
                  <td className="px-6 py-4 text-zinc-400">{order.material} / {order.thickness}</td>
                  <td className="px-6 py-4 text-emerald-400">{order.width.toFixed(1)}</td>
                  <td className="px-6 py-4 text-blue-400">{order.length.toFixed(1)}</td>
                  <td className="px-6 py-4 text-zinc-300">{order.total} / <span className={order.remain > 0 ? 'text-orange-400' : 'text-zinc-500'}>{order.remain}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      order.priority === 1 ? 'bg-red-500/20 text-red-400' : 
                      order.priority === 2 ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                      order.status === '生产中' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      order.status === '待排产' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      order.status === '完成' ? 'bg-zinc-800 text-zinc-500 border border-zinc-700' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-orange-400 hover:bg-zinc-700 rounded transition-colors" title="挂起/恢复">
                        <PauseCircle className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 rounded transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center text-xs text-zinc-500 font-mono">
          <span>共 5 条记录</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors disabled:opacity-50">上一页</button>
            <button className="px-2 py-1 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors disabled:opacity-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
