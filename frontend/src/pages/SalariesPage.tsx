import { useSalaries } from "../hooks/useSalaries";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";

export function SalariesPage() {
  const { data, isLoading } = useSalaries();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Finance
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Salaries</h1>
      </header>

      <Card title="Payment history">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nurse</TableHeaderCell>
              <TableHeaderCell>Month</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Amount
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  Loading salaries...
                </TableCell>
              </TableRow>
            )}
            {data?.map((salary) => (
              <TableRow key={salary.id}>
                <TableCell>#{salary.user_id}</TableCell>
                <TableCell>{salary.year_month}</TableCell>
                <TableCell className="text-right">
                  ¥{salary.amount ?? 0}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && !data?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  No salary data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

