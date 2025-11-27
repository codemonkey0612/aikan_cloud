import { Request, Response } from "express";
import * as VisitService from "../services/visit.service";

export const getAllVisits = async (req: Request, res: Response) => {
  const visits = await VisitService.getAllVisits();
  res.json(visits);
};

export const getVisitById = async (req: Request, res: Response) => {
  const visit = await VisitService.getVisitById(Number(req.params.id));
  res.json(visit);
};

export const createVisit = async (req: Request, res: Response) => {
  const created = await VisitService.createVisit(req.body);
  res.status(201).json(created);
};

export const updateVisit = async (req: Request, res: Response) => {
  const updated = await VisitService.updateVisit(
    Number(req.params.id),
    req.body
  );
  res.json(updated);
};

export const deleteVisit = async (req: Request, res: Response) => {
  await VisitService.deleteVisit(Number(req.params.id));
  res.json({ message: "Deleted" });
};

