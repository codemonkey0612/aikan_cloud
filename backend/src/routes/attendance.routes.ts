import { Router } from "express";
import * as AttendanceController from "../controllers/attendance.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/rbac.middleware";
import { validate } from "../middlewares/validation.middleware";
import { z } from "zod";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

const shiftIdParamSchema = z.object({
  shift_id: z.string().regex(/^\d+$/).transform(Number),
});

// 出退勤記録の取得
router.get(
  "/my",
  requirePermission("shifts:read"),
  AttendanceController.getMyAttendance
);
router.get(
  "/shift/:shift_id",
  requirePermission("shifts:read"),
  validate(shiftIdParamSchema, "params"),
  AttendanceController.getAttendanceByShift
);
router.get(
  "/:id",
  requirePermission("shifts:read"),
  validate(idParamSchema, "params"),
  AttendanceController.getAttendanceById
);

// チェックイン/アウト（NURSE、FACILITY_MANAGER、ADMINのみ）
router.post(
  "/check-in",
  requirePermission("shifts:write"),
  AttendanceController.checkIn
);
router.post(
  "/check-out",
  requirePermission("shifts:write"),
  AttendanceController.checkOut
);

// ステータス更新（ADMIN、FACILITY_MANAGERのみ）
router.put(
  "/status",
  requirePermission("shifts:write"),
  AttendanceController.updateStatus
);

// PIN生成（NURSE、FACILITY_MANAGER、ADMINのみ）
router.post(
  "/generate-pin",
  requirePermission("shifts:write"),
  AttendanceController.generatePin
);

export default router;

