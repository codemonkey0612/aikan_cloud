import { NavLink } from "react-router-dom";
import {
  BuildingOffice2Icon,
  ChartBarIcon,
  ClockIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  UserGroupIcon,
  UsersIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navItems = [
  { label: "ダッシュボード", to: "/", icon: ChartBarIcon },
  { label: "ユーザー", to: "/users", icon: UsersIcon },
  { label: "施設", to: "/facilities", icon: BuildingOffice2Icon },
  { label: "入居者", to: "/residents", icon: UserGroupIcon },
  { label: "バイタル", to: "/vitals", icon: HeartIcon },
  { label: "シフト", to: "/shifts", icon: ClockIcon },
  { label: "訪問", to: "/visits", icon: ClipboardDocumentIcon },
  { label: "給与", to: "/salaries", icon: CurrencyDollarIcon },
  { label: "お知らせ", to: "/notifications", icon: MegaphoneIcon },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-slate-200 bg-white pt-16">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50",
                  isActive && "bg-slate-100 text-brand-600"
                )
              }
              end={item.to === "/"}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

