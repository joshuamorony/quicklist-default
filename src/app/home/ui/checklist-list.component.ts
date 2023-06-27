import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Checklist } from "src/app/shared/interfaces/checklist";

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  selector: "app-checklist-list",
  template: `
    <ul>
      <li *ngFor="let checklist of checklists; trackBy: trackByFn">
        <a routerLink="/checklist/{{ checklist.id }}">{{ checklist.title }}</a>
        <button (click)="edit.emit(checklist)">Edit</button>
        <button (click)="delete.emit(checklist.id)">Delete</button>
      </li>
    </ul>

    <div *ngIf="checklists.length === 0">
      <p>Click the add button to create your first quicklist!</p>
    </div>
  `,
})
export class ChecklistListComponent {
  @Input() checklists!: Checklist[];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Checklist>();

  constructor() {}

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }
}
