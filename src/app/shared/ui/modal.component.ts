import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: "app-modal",
  template: ` <div></div> `,
})
export class ModalComponent {
  @Input() set isOpen(value: boolean) {
    if (value) {
      this.dialog.open(this.template);
    } else {
      this.dialog.closeAll();
    }
  }

  @ContentChild(TemplateRef, { static: false }) template!: TemplateRef<any>;

  constructor(public dialog: Dialog) {}
}
