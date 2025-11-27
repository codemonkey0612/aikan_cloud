import { Router } from "express";
import * as SalaryController from "../controllers/salary.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin, requirePermission } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// 給与一覧・詳細: ADMINのみ
router.get("/", requireAdmin, SalaryController.getAllSalaries);
router.get("/:id", requireAdmin, SalaryController.getSalaryById);

// 給与作成・更新・削除: ADMINのみ
router.post("/", requireAdmin, SalaryController.createSalary);
router.put("/:id", requireAdmin, SalaryController.updateSalary);
router.delete("/:id", requireAdmin, SalaryController.deleteSalary);

export default router;

