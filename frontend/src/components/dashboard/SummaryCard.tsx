import { type PropsWithChildren } from "react";
import clsx from "clsx";

interface SummaryCardProps extends PropsWithChildren {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  change,
  icon,
  className,
  children,
}: SummaryCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-semibold text-slate-900">{value}</p>
          {change && <p className="text-xs text-emerald-600">{change}</p>}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            {icon}
          </div>
        )}
      </div>
      {children && <div className="mt-3 text-sm text-slate-500">{children}</div>}
    </div>
  );
}

