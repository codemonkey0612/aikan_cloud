import { useUsers } from "../hooks/useUsers";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../components/ui/Table";
import { Card } from "../components/ui/Card";

export function UsersPage() {
  const { data, isLoading } = useUsers();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">チーム</p>
        <h1 className="text-3xl font-semibold text-slate-900">ユーザー</h1>
      </header>

      <Card title="全ユーザー">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>氏名</TableHeaderCell>
              <TableHeaderCell>メールアドレス</TableHeaderCell>
              <TableHeaderCell>権限</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  ユーザーを読み込み中...
                </TableCell>
              </TableRow>
            )}
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email ?? "N/A"}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  ユーザーがまだ登録されていません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

