import { Signal, WritableSignal } from "@angular/core";
import { Checklist } from "../interfaces/checklist";

interface ChecklistsState {
  checklists: Checklist[];
  loaded: boolean;
}

export const initialState: ChecklistsState = {
  checklists: [],
  loaded: false,
};

export const checklistReducer = {
  loadChecklists: (state, checklists: Checklist[]) => ({
    ...state,
    checklists,
    loaded: true,
  }),
  add: (state: WritableSignal<ChecklistsState>, checklist: Checklist) => state.set({
    ...state(),
    checklists: [...state().checklists, checklist]
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
}

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
