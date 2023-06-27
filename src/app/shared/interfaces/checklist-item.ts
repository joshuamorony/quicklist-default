import { RemoveChecklist } from "./checklist";

export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  checked: boolean;
}

export type AddChecklistItem = { item: Pick<ChecklistItem, 'title'>; checklistId: RemoveChecklist };
export type EditChecklistItem = { id: ChecklistItem["id"]; data: AddChecklistItem["item"] };
export type RemoveChecklistItem = ChecklistItem["id"];
