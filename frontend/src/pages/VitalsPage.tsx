import { Link } from "react-router-dom";
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
          健康管理
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">バイタル記録</h1>
      </header>

      <Card
        title="最新のバイタル"
        actions={
          <Link
            to="/vitals/new"
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            バイタルを登録
          </Link>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>入居者</TableHeaderCell>
              <TableHeaderCell>血圧</TableHeaderCell>
              <TableHeaderCell>脈拍</TableHeaderCell>
              <TableHeaderCell className="text-right">記録日時</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-400">
                  バイタルを読み込み中...
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
                  バイタルがまだ登録されていません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

