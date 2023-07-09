import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { ChecklistItem } from "../../shared/interfaces/checklist-item";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-checklist-item-list",
  template: `
  <button *ngIf="hasCheckedItems()" (click)="reset()">Reset Checklist Items</button>
    <ul>
      <li *ngFor="let item of checklistItems; trackBy: trackByFn">
        <span *ngIf="item.checked">[DONE]</span>
        {{ item.title }}
        <button (click)="toggleItem(item.id)">Toggle</button>
        <button (click)="edit.emit(item)">Edit</button>
        <button (click)="delete.emit(item.id)">Delete</button>
      </li>
    </ul>

    <div *ngIf="checklistItems.length === 0">
      <h2>Add an item</h2>
      <p>Click the add button to add your first item to this quicklist</p>
    </div>
  `,
})
export class ChecklistItemListComponent {
  @Input() checklistItems!: ChecklistItem[];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<ChecklistItem>();
  @Output() resetChecklist = new EventEmitter<string>();

  toggleItem(itemId: string) {
    this.toggle.emit(itemId);
  }

  trackByFn(index: number, item: ChecklistItem) {
    return item.id;
  }
  hasCheckedItems() {
    return this.checklistItems.some(item => item.checked);
  }

  getFirstCheckedItem(): ChecklistItem | undefined {
    return this.checklistItems.find(item => item.checked);
  }
  reset() {
    const cli = this.getFirstCheckedItem();
    if(cli) this.resetChecklist.emit(cli.checklistId);
  }
}
