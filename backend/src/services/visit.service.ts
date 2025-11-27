import * as VisitModel from "../models/visit.model";

export const getAllVisits = () => VisitModel.getAllVisits();
export const getVisitById = (id: number) => VisitModel.getVisitById(id);
export const createVisit = (data: VisitModel.VisitInput) =>
  VisitModel.createVisit(data);
export const updateVisit = (
  id: number,
  data: Partial<VisitModel.VisitInput>
) => VisitModel.updateVisit(id, data);
export const deleteVisit = (id: number) => VisitModel.deleteVisit(id);

