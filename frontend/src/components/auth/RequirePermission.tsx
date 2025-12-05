import { useAuth } from "../../hooks/useAuth";
import { hasAnyPermission } from "../../utils/rbac";

interface RequirePermissionProps {
  children: React.ReactNode;
  permissions: string[];
  fallback?: React.ReactNode;
}

/**
 * 権限ベースのUI表示制御コンポーネント
 * 指定された権限のいずれかを持っている場合のみ子要素を表示
 */
export function RequirePermission({ children, permissions, fallback }: RequirePermissionProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback ? <>{fallback}</> : null;
  }

  if (!hasAnyPermission(user.role, permissions)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

