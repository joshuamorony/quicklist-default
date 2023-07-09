import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Checklist } from "../../shared/interfaces/checklist";

@Component({
  standalone: true,
  selector: "app-checklist-item-header",
  template: `
    <header>
      <h1>
        {{ checklist.title }}
      </h1>
      <button (click)="addItem.emit()">Add item</button>
    </header>
  `,
})
export class ChecklistItemHeaderComponent {
  @Input() checklist!: Checklist;
  @Output() addItem = new EventEmitter<void>();
}
