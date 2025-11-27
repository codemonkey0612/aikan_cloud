import { useShifts } from "../hooks/useShifts";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function ShiftsPage() {
  const { data, isLoading } = useShifts();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Staffing
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Shifts</h1>
      </header>

      <Card title="Shift schedule">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nurse</TableHeaderCell>
              <TableHeaderCell>Facility</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-400">
                  Loading shifts...
                </TableCell>
              </TableRow>
            )}
            {data?.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>#{shift.user_id}</TableCell>
                <TableCell>#{shift.facility_id}</TableCell>
                <TableCell>{shift.date}</TableCell>
                <TableCell>{shift.shift_type ?? "N/A"}</TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-400">
                  No shifts yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

