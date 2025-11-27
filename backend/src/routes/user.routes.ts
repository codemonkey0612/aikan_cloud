import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin, requirePermission } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// ユーザー一覧・詳細: ADMINのみ
router.get("/", requireAdmin, UserController.getAllUsers);
router.get("/:id", requireAdmin, UserController.getUserById);

// ユーザー作成・更新・削除: ADMINのみ
router.post("/", requireAdmin, UserController.createUser);
router.put("/:id", requireAdmin, UserController.updateUser);
router.delete("/:id", requireAdmin, UserController.deleteUser);

export default router;
