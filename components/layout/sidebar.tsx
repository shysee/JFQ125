import Link from 'next/link';
import { Home, ListOrdered, Settings, Activity, Scissors, AlignCenter, ArrowLeftRight } from 'lucide-react';

const navItems = [
  { name: 'P01 生产监控', href: '/', icon: Home },
  { name: 'P02 主辊控制', href: '/main-drive', icon: Activity },
  { name: 'P03 横切刀控制', href: '/cross-cut', icon: Scissors },
  { name: 'P05 辅助辊道与对中', href: '/auxiliary', icon: ArrowLeftRight },
  { name: 'P07 订单池', href: '/orders', icon: ListOrdered },
  { name: 'P08 拼单排样', href: '/nesting', icon: AlignCenter },
  { name: 'P12 系统参数', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full text-zinc-300">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-white tracking-wider">JFQ125 HMI</h1>
        <p className="text-xs text-zinc-500 mt-1 font-mono">钢卷自动分切机</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-800 hover:text-white transition-colors group"
                >
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500 font-mono">
        <p>User: 操作员</p>
        <p>Level: Operator+</p>
      </div>
    </div>
  );
}
