import { createAdapter } from "@state-adapt/core";
import { RemoveChecklist } from "src/app/shared/interfaces/checklist";
import {
  AddChecklistItem,
  ChecklistItem,
  EditChecklistItem,
  RemoveChecklistItem,
} from "../../shared/interfaces/checklist-item";

interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
  loaded: boolean;
}

export const initialState: ChecklistItemsState = {
  checklistItems: [],
  loaded: false,
};

export const checklistItemsAdapter = createAdapter<ChecklistItemsState>()({
  loadChecklistItems: (state, checklistItems: ChecklistItem[]) => ({
    ...state,
    checklistItems,
    loaded: true,
  }),
  reset: (state, checklistId: RemoveChecklist) => ({
    ...state,
    checklistItems: state.checklistItems.map((item) =>
      item.checklistId === checklistId ? { ...item, checked: false } : item
    ),
  }),
  toggle: (state, checklistItemId: RemoveChecklistItem) => ({
    ...state,
    checklistItems: state.checklistItems.map((item) =>
      item.id === checklistItemId ? { ...item, checked: !item.checked } : item
    ),
  }),
  add: (state, checklistItem: AddChecklistItem) => ({
    ...state,
    checklistItems: [
      ...state.checklistItems,
      {
        id: Date.now().toString(),
        checklistId: checklistItem.checklistId,
        checked: false,
        ...checklistItem.item,
      },
    ],
  }),
  edit: (state, update: EditChecklistItem) => ({
    ...state,
    checklistItems: state.checklistItems.map((item) =>
      item.id === update.id ? { ...item, title: update.data.title } : item
    ),
  }),
  remove: (state, id: RemoveChecklistItem) => ({
    ...state,
    checklistItems: state.checklistItems.filter((item) => item.id !== id),
  }),
  clearChecklistItems: (state, checklistId: RemoveChecklist) => ({
    ...state,
    checklistItems: state.checklistItems.filter(
      (item) => item.checklistId !== checklistId
    ),
  }),
  selectors: {
    checklistItems: (s) => s.checklistItems,
    loaded: (s) => s.loaded,
  },
});
