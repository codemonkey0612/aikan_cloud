import { Bars3Icon } from "@heroicons/react/24/outline";

export function Topbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <Bars3Icon className="h-6 w-6 text-slate-500 lg:hidden" />
        <span className="text-lg font-semibold text-brand-600">
          ナーシング管理
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <div className="text-right">
          <p className="font-semibold text-slate-700">管理者ユーザー</p>
          <p className="text-xs text-slate-400">admin@nursing.com</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-semibold">
          AU
        </div>
      </div>
    </header>
  );
}

