import { useUsers } from "../hooks/useUsers";
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../components/ui/Table";
import { Card } from "../components/ui/Card";

export function UsersPage() {
  const { data, isLoading } = useUsers();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">Team</p>
        <h1 className="text-3xl font-semibold text-slate-900">Users</h1>
      </header>

      <Card title="All users">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading users...
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
                  No users yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

