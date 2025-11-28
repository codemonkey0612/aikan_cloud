import * as VitalAlertModel from "../models/vitalAlert.model";
import * as VitalModel from "../models/vital.model";
import type { VitalRow } from "../models/vital.model";

/**
 * バイタル記録をチェックして、アラートをトリガーする
 */
export const checkVitalAlerts = async (vital_record_id: number) => {
  const vital = await VitalModel.getVitalById(vital_record_id);
  if (!vital || !vital.resident_id) {
    return [];
  }

  // 入居者のアクティブなアラート設定を取得
  const alerts = await VitalAlertModel.getVitalAlertsByResident(
    vital.resident_id
  );

  const triggeredAlerts: VitalAlertModel.VitalAlertTriggerRow[] = [];

  for (const alert of alerts) {
    let shouldTrigger = false;
    let measuredValue: number | null = null;

    switch (alert.alert_type) {
      case "SYSTOLIC_BP":
        measuredValue = vital.systolic_bp;
        if (measuredValue !== null) {
          shouldTrigger =
            (alert.min_value !== null && measuredValue < alert.min_value) ||
            (alert.max_value !== null && measuredValue > alert.max_value);
        }
        break;
      case "DIASTOLIC_BP":
        measuredValue = vital.diastolic_bp;
        if (measuredValue !== null) {
          shouldTrigger =
            (alert.min_value !== null && measuredValue < alert.min_value) ||
            (alert.max_value !== null && measuredValue > alert.max_value);
        }
        break;
      case "PULSE":
        measuredValue = vital.pulse;
        if (measuredValue !== null) {
          shouldTrigger =
            (alert.min_value !== null && measuredValue < alert.min_value) ||
            (alert.max_value !== null && measuredValue > alert.max_value);
        }
        break;
      case "TEMPERATURE":
        measuredValue = vital.temperature;
        if (measuredValue !== null) {
          shouldTrigger =
            (alert.min_value !== null && measuredValue < alert.min_value) ||
            (alert.max_value !== null && measuredValue > alert.max_value);
        }
        break;
      case "SPO2":
        measuredValue = vital.spo2;
        if (measuredValue !== null) {
          shouldTrigger =
            (alert.min_value !== null && measuredValue < alert.min_value) ||
            (alert.max_value !== null && measuredValue > alert.max_value);
        }
        break;
    }

    if (shouldTrigger && measuredValue !== null) {
      const trigger = await VitalAlertModel.createVitalAlertTrigger(
        vital_record_id,
        alert.id,
        measuredValue
      );
      if (trigger) {
        triggeredAlerts.push(trigger);
      }
    }
  }

  return triggeredAlerts;
};

export const getAllVitalAlerts = VitalAlertModel.getAllVitalAlerts;
export const getVitalAlertById = VitalAlertModel.getVitalAlertById;
export const getVitalAlertsByResident =
  VitalAlertModel.getVitalAlertsByResident;
export const createVitalAlert = VitalAlertModel.createVitalAlert;
export const updateVitalAlert = VitalAlertModel.updateVitalAlert;
export const deleteVitalAlert = VitalAlertModel.deleteVitalAlert;
export const getVitalAlertTriggers = VitalAlertModel.getVitalAlertTriggers;
export const acknowledgeVitalAlertTrigger =
  VitalAlertModel.acknowledgeVitalAlertTrigger;

