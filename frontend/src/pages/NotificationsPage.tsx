import { useNotifications } from "../hooks/useNotifications";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function NotificationsPage() {
  const { data, isLoading } = useNotifications();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          通知
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          お知らせ
        </h1>
      </header>

      <Card title="掲示一覧">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>タイトル</TableHeaderCell>
              <TableHeaderCell>対象</TableHeaderCell>
              <TableHeaderCell>掲載期間</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  お知らせを読み込み中...
                </TableCell>
              </TableRow>
            )}
            {data?.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.title ?? "タイトル未設定"}</TableCell>
                <TableCell>{notification.target_role ?? "全員"}</TableCell>
                <TableCell>
                  {notification.publish_from ?? "--"} →{" "}
                  {notification.publish_to ?? "--"}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  お知らせがまだ登録されていません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

