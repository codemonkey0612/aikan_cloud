import { Request, Response } from "express";
import * as AttendanceService from "../services/attendance.service";
import { validate } from "../middlewares/validation.middleware";
import { z } from "zod";

const checkInSchema = z.object({
  shift_id: z.number().int().positive("シフトIDは正の整数である必要があります"),
  lat: z.number().min(-90).max(90, "緯度は-90から90の範囲である必要があります"),
  lng: z.number().min(-180).max(180, "経度は-180から180の範囲である必要があります"),
  pin: z.string().regex(/^\d{6}$/, "PINコードは6桁の数字である必要があります").optional(),
});

const checkOutSchema = z.object({
  attendance_id: z.number().int().positive("出退勤IDは正の整数である必要があります"),
  lat: z.number().min(-90).max(90, "緯度は-90から90の範囲である必要があります"),
  lng: z.number().min(-180).max(180, "経度は-180から180の範囲である必要があります"),
  pin: z.string().regex(/^\d{6}$/, "PINコードは6桁の数字である必要があります").optional(),
});

const updateStatusSchema = z.object({
  attendance_id: z.number().int().positive("出退勤IDは正の整数である必要があります"),
  status: z.enum(["PENDING", "CONFIRMED", "REJECTED"], {
    message: "有効なステータスを選択してください",
  }),
  type: z.enum(["check_in", "check_out"], {
    message: "有効なタイプを選択してください",
  }),
  pin: z.string().regex(/^\d{6}$/, "PINコードは6桁の数字である必要があります").optional(),
});

const generatePinSchema = z.object({
  purpose: z.enum(["CHECK_IN", "CHECK_OUT", "STATUS_UPDATE"], {
    message: "有効な目的を選択してください",
  }),
  attendance_id: z.number().int().positive().optional(),
});

const httpError = (message: string, status: number) => {
  const error = new Error(message);
  (error as any).status = status;
  return error;
};

export const checkIn = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub ? Number(req.user.sub) : undefined;
    if (!userId) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    const { shift_id, lat, lng, pin } = checkInSchema.parse(req.body);
    const attendance = await AttendanceService.checkIn(
      shift_id,
      userId,
      lat,
      lng,
      pin
    );
    res.status(201).json(attendance);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "バリデーションエラー",
        errors: error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "チェックインに失敗しました",
    });
  }
};

export const checkOut = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub ? Number(req.user.sub) : undefined;
    if (!userId) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    const { attendance_id, lat, lng, pin } = checkOutSchema.parse(req.body);
    const result = await AttendanceService.checkOut(
      attendance_id,
      userId,
      lat,
      lng,
      pin
    );
    res.json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "チェックアウトに失敗しました",
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { attendance_id, status, type, pin } = updateStatusSchema.parse(
      req.body
    );
    const attendance = await AttendanceService.updateAttendanceStatus(
      attendance_id,
      status as "PENDING" | "CONFIRMED" | "REJECTED",
      type as "check_in" | "check_out",
      pin
    );
    res.json(attendance);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "ステータス更新に失敗しました",
    });
  }
};

export const generatePin = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub ? Number(req.user.sub) : undefined;
    if (!userId) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    const { purpose, attendance_id } = generatePinSchema.parse(req.body);
    const pin = await AttendanceService.generatePin(
      userId,
      purpose as "CHECK_IN" | "CHECK_OUT" | "STATUS_UPDATE",
      attendance_id
    );
    res.json({ pin, expires_in: 600 }); // 10分
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "PIN生成に失敗しました",
    });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await AttendanceService.getAttendanceById(
      Number(req.params.id)
    );
    if (!attendance) {
      return res.status(404).json({ message: "出退勤記録が見つかりません" });
    }
    res.json(attendance);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "出退勤記録の取得に失敗しました",
    });
  }
};

export const getAttendanceByShift = async (req: Request, res: Response) => {
  try {
    const attendance = await AttendanceService.getAttendanceByShiftId(
      Number(req.params.shift_id)
    );
    res.json(attendance);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "出退勤記録の取得に失敗しました",
    });
  }
};

export const getMyAttendance = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub ? Number(req.user.sub) : undefined;
    if (!userId) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    const limit = Number(req.query.limit) || 50;
    const attendance = await AttendanceService.getAttendanceByUserId(
      userId,
      limit
    );
    res.json(attendance);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "出退勤記録の取得に失敗しました",
    });
  }
};

