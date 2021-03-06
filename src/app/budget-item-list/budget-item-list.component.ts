import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.module';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(item: BudgetItem){
    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem){
    let dialogRef = this.dialog.open(EditItemModalComponent, {
      height: '180px',
      data: item
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.budgetItems[this.budgetItems.indexOf(item)] = result;
          this.update.emit({
            old: item,
            new: result
          });
        }
      })
  }
}

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}