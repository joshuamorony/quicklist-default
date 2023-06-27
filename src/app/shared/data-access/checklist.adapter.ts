import { createAdapter } from "@state-adapt/core";
import { Checklist, EditChecklist, RemoveChecklist } from "../interfaces/checklist";

interface ChecklistsState {
  checklists: Checklist[];
  loaded: boolean;
}

export const initialState: ChecklistsState = {
  checklists: [],
  loaded: false,
};

export const checklistsAdapter = createAdapter<ChecklistsState>()({
  loadChecklists: (state, checklists: Checklist[]) => ({
    ...state,
    checklists,
    loaded: true,
  }),
  add: (state, checklist: Checklist) => ({
    ...state,
    checklists: [...state.checklists, checklist]
  }),
  remove: (state, id: RemoveChecklist) => ({
    ...state,
    checklists: state.checklists.filter((checklist) => checklist.id !== id)
  }),
  edit: (state, update: EditChecklist) => ({
    ...state,
    checklists: 
    state.checklists.map((checklist) =>
      checklist.id === update.id
        ? { ...checklist, title: update.data.title }
        : checklist
    ),
  }),
  selectors: {
    checklists: (s) => s.checklists,
    loaded: (s) => s.loaded,
  },
});
