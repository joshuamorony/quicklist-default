import { Component, effect, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChecklistService } from "../shared/data-access/checklist.service";
import { Checklist } from "../shared/interfaces/checklist";
import { FormModalComponent } from "../shared/ui/form-modal.component";
import { ModalComponent } from "../shared/ui/modal.component";
import { ChecklistListComponent } from "./ui/checklist-list.component";

@Component({
  standalone: true,
  selector: "app-home",
  template: `
    <h1>Quicklists</h1>
    <button (click)="checklistBeingEdited.set({})">Add</button>

    <h2>Your checklists</h2>
    <app-checklist-list
      [checklists]="checklists()"
      (delete)="cs.remove$.next($event)"
      (edit)="checklistBeingEdited.set($event)"
    />

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-form-modal
          title="test"
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
          (save)="
            checklistBeingEdited()?.id
              ? cs.edit$.next({
                  id: checklistBeingEdited()!.id!,
                  data: checklistForm.getRawValue()
                })
              : cs.add$.next(checklistForm.getRawValue())
          "
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
  imports: [
    ModalComponent,
    FormModalComponent,
    ReactiveFormsModule,
    ChecklistListComponent,
  ],
})
export default class HomeComponent {
  cs = inject(ChecklistService);
  fb = inject(FormBuilder);

  checklists = this.cs.checklists;
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
  });

  constructor() {
    // TODO: Use [patchValue] directive to react to signal in template
    effect(() => {
      const checklist = this.checklistBeingEdited();

      if (checklist) {
        this.checklistForm.patchValue({
          title: checklist.title,
        });
      }
    });
  }
}
