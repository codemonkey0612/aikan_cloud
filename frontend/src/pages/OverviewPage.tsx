import { SummaryCard } from "../components/dashboard/SummaryCard";
import {
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { useFacilities } from "../hooks/useFacilities";
import { useResidents } from "../hooks/useResidents";
import { useShifts } from "../hooks/useShifts";
import { useVitals } from "../hooks/useVitals";
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from "../components/ui/Table";

export function OverviewPage() {
  const { data: facilities } = useFacilities();
  const { data: residents } = useResidents();
  const { data: shifts } = useShifts({ limit: 5 });
  const { data: vitals } = useVitals({ limit: 5 });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-slate-500">Dashboard</p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Welcome back 👋
        </h1>
        <p className="text-slate-500">
          Here is a quick snapshot of your facilities and care activities.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Facilities"
          value={facilities?.length ?? 0}
          change="+3 this month"
          icon={<BuildingOffice2Icon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Active Residents"
          value={residents?.length ?? 0}
          change="+12 this week"
          icon={<UserGroupIcon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Shift Coverage"
          value={`${shifts?.length ?? 0}/42`}
          change="96% scheduled"
          icon={<ClockIcon className="h-6 w-6" />}
        />
        <SummaryCard
          title="Vitals Logged"
          value={vitals?.length ?? 0}
          change="+8 today"
          icon={<HeartIcon className="h-6 w-6" />}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Recent Shifts
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Nurse</TableHeaderCell>
                <TableHeaderCell>Facility</TableHeaderCell>
                <TableHeaderCell className="text-right">Date</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts?.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>#{shift.user_id}</TableCell>
                  <TableCell>#{shift.facility_id}</TableCell>
                  <TableCell className="text-right">
                    {shift.date}
                  </TableCell>
                </TableRow>
              ))}
              {!shifts?.length && (
                <TableRow>
                  <TableCell className="text-center text-slate-400" colSpan={3}>
                    No shifts scheduled yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Latest Vital Checks
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Resident</TableHeaderCell>
                <TableHeaderCell>BP</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Temperature
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vitals?.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>#{record.resident_id}</TableCell>
                  <TableCell>
                    {record.systolic_bp ?? "--"}/{record.diastolic_bp ?? "--"}
                  </TableCell>
                  <TableCell className="text-right">
                    {record.temperature ?? "--"}°C
                  </TableCell>
                </TableRow>
              ))}
              {!vitals?.length && (
                <TableRow>
                  <TableCell className="text-center text-slate-400" colSpan={3}>
                    No vitals recorded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

