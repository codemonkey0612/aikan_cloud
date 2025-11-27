import { useVitals } from "../hooks/useVitals";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function VitalsPage() {
  const { data, isLoading } = useVitals();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Health
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Vital Records</h1>
      </header>

      <Card title="Latest vitals">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Resident</TableHeaderCell>
              <TableHeaderCell>Blood Pressure</TableHeaderCell>
              <TableHeaderCell>Pulse</TableHeaderCell>
              <TableHeaderCell className="text-right">Recorded</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-400">
                  Loading vitals...
                </TableCell>
              </TableRow>
            )}
            {data?.map((record) => (
              <TableRow key={record.id}>
                <TableCell>#{record.resident_id}</TableCell>
                <TableCell>
                  {record.systolic_bp ?? "--"}/{record.diastolic_bp ?? "--"}
                </TableCell>
                <TableCell>{record.pulse ?? "--"} bpm</TableCell>
                <TableCell className="text-right">
                  {record.measured_at ?? "--"}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-400">
                  No vitals recorded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

