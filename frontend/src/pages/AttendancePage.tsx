import { useState } from "react";
import { useMyAttendance, useAttendanceByShift } from "../hooks/useAttendance";
import { useShifts } from "../hooks/useShifts";
import { CheckInOutForm } from "../components/attendance/CheckInOutForm";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../components/ui/Table";
import { MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { Attendance } from "../api/types";

export function AttendancePage() {
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
  const { data: attendanceList, isLoading } = useMyAttendance(50);
  const { data: shifts } = useShifts({ limit: 100 });
  const { data: selectedAttendance } = useAttendanceByShift(selectedShiftId || 0);

  const currentAttendance = selectedAttendance?.[0] || null;

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: Attendance["check_in_status"]) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            <CheckCircleIcon className="h-4 w-4" />
            確認済み
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">
            <XCircleIcon className="h-4 w-4" />
            却下
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
            <ClockIcon className="h-4 w-4" />
            確認待ち
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">
          出退勤管理
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">出退勤記録</h1>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* チェックイン/アウトフォーム */}
        <Card title="出退勤操作">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              シフトを選択
            </label>
            <select
              value={selectedShiftId || ""}
              onChange={(e) => setSelectedShiftId(Number(e.target.value) || null)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
            >
              <option value="">シフトを選択してください</option>
              {shifts?.data.map((shift) => (
                <option key={shift.id} value={shift.id}>
                  {shift.date} - {shift.shift_type || "未設定"}
                </option>
              ))}
            </select>

            {selectedShiftId && (
              <CheckInOutForm
                shiftId={selectedShiftId}
                attendance={currentAttendance}
                onSuccess={() => {
                  // データを再取得
                }}
              />
            )}
          </div>
        </Card>

        {/* 出退勤記録一覧 */}
        <Card title="最近の出退勤記録">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>日付</TableHeaderCell>
                <TableHeaderCell>チェックイン</TableHeaderCell>
                <TableHeaderCell>チェックアウト</TableHeaderCell>
                <TableHeaderCell>ステータス</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-400">
                    読み込み中...
                  </TableCell>
                </TableRow>
              )}
              {attendanceList?.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>
                    {attendance.check_in_at
                      ? new Date(attendance.check_in_at).toLocaleDateString("ja-JP")
                      : "--"}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{formatDateTime(attendance.check_in_at)}</p>
                      {attendance.check_in_lat && attendance.check_in_lng && (
                        <p className="text-xs text-slate-500">
                          <MapPinIcon className="inline h-3 w-3" />
                          {attendance.check_in_lat.toFixed(4)}, {attendance.check_in_lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{formatDateTime(attendance.check_out_at)}</p>
                      {attendance.check_out_lat && attendance.check_out_lng && (
                        <p className="text-xs text-slate-500">
                          <MapPinIcon className="inline h-3 w-3" />
                          {attendance.check_out_lat.toFixed(4)}, {attendance.check_out_lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(attendance.check_in_status)}
                      {attendance.check_out_at && (
                        <div className="mt-1">
                          {getStatusBadge(attendance.check_out_status)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && !attendanceList?.length && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-400">
                    出退勤記録がありません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

