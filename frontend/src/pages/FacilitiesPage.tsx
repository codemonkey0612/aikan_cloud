import { useFacilities } from "../hooks/useFacilities";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function FacilitiesPage() {
  const { data, isLoading } = useFacilities();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Network
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Facilities</h1>
      </header>

      <Card title="All facilities">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Address</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading facilities...
                </TableCell>
              </TableRow>
            )}
            {data?.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>{facility.name}</TableCell>
                <TableCell>{facility.address ?? "N/A"}</TableCell>
                <TableCell>{facility.code ?? "-"}</TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  No facilities yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

