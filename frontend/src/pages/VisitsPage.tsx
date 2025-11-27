import { useVisits } from "../hooks/useVisits";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function VisitsPage() {
  const { data, isLoading } = useVisits();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Field activity
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Visits</h1>
      </header>

      <Card title="Recent visits">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Shift</TableHeaderCell>
              <TableHeaderCell>Resident</TableHeaderCell>
              <TableHeaderCell>Visited at</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading visits...
                </TableCell>
              </TableRow>
            )}
            {data?.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell>#{visit.shift_id}</TableCell>
                <TableCell>
                  {visit.resident_id ? `#${visit.resident_id}` : "N/A"}
                </TableCell>
                <TableCell>{visit.visited_at}</TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  No visits logged.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

