import * as MedicationNoteModel from "../models/medicationNote.model";

export const getAllMedicationNotes = MedicationNoteModel.getAllMedicationNotes;
export const getMedicationNoteById = MedicationNoteModel.getMedicationNoteById;
export const getMedicationNotesByResident =
  MedicationNoteModel.getMedicationNotesByResident;
export const getActiveMedicationNotesByResident =
  MedicationNoteModel.getActiveMedicationNotesByResident;
export const createMedicationNote = MedicationNoteModel.createMedicationNote;
export const updateMedicationNote = MedicationNoteModel.updateMedicationNote;
export const deleteMedicationNote = MedicationNoteModel.deleteMedicationNote;

