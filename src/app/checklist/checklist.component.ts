import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ChecklistService } from "../shared/data-access/checklist.service";
import { ChecklistItem } from "../shared/interfaces/checklist-item";
import { FormModalComponent } from "../shared/ui/form-modal.component";
import { ModalComponent } from "../shared/ui/modal.component";
import { ChecklistItemService } from "./data-access/checklist-item.service";
import { ChecklistItemHeaderComponent } from "./ui/checklist-item-header.component";
import { ChecklistItemListComponent } from "./ui/checklist-item-list.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ChecklistItemHeaderComponent,
    ChecklistItemListComponent,
    ModalComponent,
    FormModalComponent,
  ],
  selector: "app-checklist",
  template: `
    <app-checklist-item-header
      *ngIf="checklist() as checklist"
      [checklist]="checklist"
      (addItem)="checklistItemBeingEdited.set({})"
      (resetChecklist)="cis.reset$.next($event)"
    />

    <app-checklist-item-list
      [checklistItems]="items()"
      (toggle)="cis.toggle$.next($event)"
      (delete)="cis.remove$.next($event)"
      (edit)="checklistItemBeingEdited.set($event)"
    />

    <app-modal [isOpen]="!!checklistItemBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="checklistItemBeingEdited()?.id ? 'Edit Item' : 'Create item'"
          [formGroup]="checklistItemForm"
          (close)="checklistItemBeingEdited.set(null)"
          (save)="
            checklistItemBeingEdited()?.id
              ? cis.edit$.next({
                id: checklistItemBeingEdited()!.id!,
                data: checklistItemForm.getRawValue(),
              })
              : cis.add$.next({
                item: checklistItemForm.getRawValue(),
                checklistId: checklist()?.id!,
              })
          "
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
})
export default class ChecklistComponent {
  cs = inject(ChecklistService);
  cis = inject(ChecklistItemService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  params = toSignal(this.route.paramMap);

  items = computed(() =>
    this.cis
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get("id"))
  );

  checklist = computed(() =>
    this.cs
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get("id"))
  );

  checklistItemForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
  });

  constructor() {
    // TODO: Use [patchValue] directive to react to signal in template
    effect(() => {
      const item = this.checklistItemBeingEdited();
      if (item) {
        this.checklistItemForm.patchValue({
          title: item.title,
        });
      }
    });
  }
}
