import { inject, Injectable, InjectionToken, PLATFORM_ID } from "@angular/core";
import { of } from "rxjs";
import { Checklist } from "../interfaces/checklist";
import { ChecklistItem } from "../interfaces/checklist-item";

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  "window local storage object",
  {
    providedIn: "root",
    factory: () => {
      return inject(PLATFORM_ID) === "browser"
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

@Injectable({
  providedIn: "root",
})
export class StorageService {

  storage = inject(LOCAL_STORAGE);

  loadChecklists() {
    const checklists = this.storage.getItem("checklists");
    return of(checklists ? JSON.parse(checklists) as Checklist[] : []);
  }

  loadChecklistItems() {
    const checklists = this.storage.getItem("checklistItems");
    return of(checklists ? JSON.parse(checklists) : []);
  }

  saveChecklists(checklists: Checklist[]) {
      this.storage.setItem("checklists", JSON.stringify(checklists));
  }

  saveChecklistItems(checklistItems: ChecklistItem[]) {
      this.storage.setItem("checklistItems", JSON.stringify(checklistItems));
  }
}
