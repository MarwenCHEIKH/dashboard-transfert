import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-rule-details-modal',
  templateUrl: './rule-details-modal.component.html',
  styleUrls: ['./rule-details-modal.component.css'],
})
export class RuleDetailsModalComponent {
  @Input() rule: any;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
  getConditions(rule: any): { index: number; value: string }[] {
    const conditions = [];
    for (let i = 1; i <= 5; i++) {
      const conditionKey = `rd_cond_${i}`;
      const conditionValue = this.rule[conditionKey];

      if (conditionValue) {
        conditions.push({ index: i, value: conditionValue });
      }
    }
    return conditions;
  }
}
