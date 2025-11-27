import { useResidents } from "../hooks/useResidents";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function ResidentsPage() {
  const { data, isLoading } = useResidents();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Care
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Residents</h1>
      </header>

      <Card title="Resident roster">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Facility</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading residents...
                </TableCell>
              </TableRow>
            )}
            {data?.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell>
                  {resident.first_name} {resident.last_name}
                </TableCell>
                <TableCell>#{resident.facility_id}</TableCell>
                <TableCell>{resident.status ?? "N/A"}</TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  No residents available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

