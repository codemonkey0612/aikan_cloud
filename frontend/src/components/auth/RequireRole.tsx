import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { hasRole } from "../../utils/rbac";
import type { UserRole } from "../../api/types";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * ロールベースのルート保護コンポーネント
 * 指定されたロールのみアクセスを許可
 */
export function RequireRole({ children, allowedRoles, fallback }: RequireRoleProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">認証状態を確認しています...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(user.role, allowedRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">アクセス権限がありません</h1>
          <p className="text-slate-600">このページにアクセスする権限がありません。</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

