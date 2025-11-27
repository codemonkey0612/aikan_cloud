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
          ネットワーク
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">施設</h1>
      </header>

      <Card title="全施設">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell>住所</TableHeaderCell>
              <TableHeaderCell>コード</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400">
                  施設を読み込み中...
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
                  施設がまだ登録されていません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

