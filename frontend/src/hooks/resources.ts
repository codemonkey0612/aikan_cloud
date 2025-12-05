import {
  FacilitiesAPI,
  NotificationsAPI,
  ResidentsAPI,
  SalariesAPI,
  ShiftsAPI,
  UsersAPI,
  VitalsAPI,
  VisitsAPI,
} from "../api/endpoints";
import { useCrudResource } from "./useCrudResource";
import type {
  Facility,
  Notification,
  Resident,
  Salary,
  Shift,
  User,
  VitalRecord,
  Visit,
} from "../api/types";

export const useUsers = () => useCrudResource<User>(UsersAPI);
export const useFacilities = () => useCrudResource<Facility>(FacilitiesAPI);
export const useResidents = () => useCrudResource<Resident>(ResidentsAPI);
export const useVitals = () => useCrudResource<VitalRecord>(VitalsAPI);
export const useShifts = () => useCrudResource<Shift>(ShiftsAPI);
export const useVisits = () => useCrudResource<Visit>(VisitsAPI);
export const useSalaries = () => useCrudResource<Salary>(SalariesAPI);
export const useNotifications = () =>
  useCrudResource<Notification>(NotificationsAPI);

