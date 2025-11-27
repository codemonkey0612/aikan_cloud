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
          Comms
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Notifications
        </h1>
      </header>

      <Card title="Bulletins">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Target</TableHeaderCell>
              <TableHeaderCell>Window</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading notifications...
                </TableCell>
              </TableRow>
            )}
            {data?.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.title ?? "Untitled"}</TableCell>
                <TableCell>{notification.target_role ?? "All"}</TableCell>
                <TableCell>
                  {notification.publish_from ?? "--"} →{" "}
                  {notification.publish_to ?? "--"}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  No notifications yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

