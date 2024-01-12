import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModelsService } from 'src/app/services/models-service/models.service';
import { RuleDetailsModalComponent } from '../../../rule-details-modal/rule-details-modal.component';
import { RulesService } from 'src/app/services/rules-service/rules.service';
import { RuleTableService } from 'src/app/services/ruleTable-service/rule-table.service';
import { catchError, tap } from 'rxjs';
import { RuleTable } from 'src/app/models/RuleTable';
import { AlertComponent } from 'src/app/components/alert-component/alert.component';

@Component({
  selector: 'app-update-rule-table',
  templateUrl: './update-rule-table.component.html',
  styleUrls: ['./update-rule-table.component.css'],
})
export class UpdateRuleTableComponent {
  ruleTableForm!: FormGroup;
  activeTab: string = 'general-tab';
  executionType: string = 'NONE';
  purgeModels: any[] = [];
  generalModels: any[] = [];
  toXMSModels: any[] = [];
  rules: any[] = [];
  rd_rules: any[] = [];
  ruleTables: string[] = [];
  selectedTable!: RuleTable;
  bsModalRef!: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private modelsService: ModelsService,
    private modalService: BsModalService,
    private ruleService: RulesService,
    private ruleTableService: RuleTableService
  ) {
    this.rd_rules.forEach((rule) => (rule.selected = false));
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadModels();
    this.loadRules();
    this.loadRuleTables();
  }

  initializeForm(): void {
    this.ruleTableForm = this.fb.group({
      name: ['', [Validators.required]],
      comments: [''],
      status: [''],
      env: ['UAT'],
      execution_type: ['NONE'],
      model: [''],
      scriptName: ['', [this.customScriptNameValidator()]],
      scriptPath: ['', [this.customScriptPathValidator()]],
      purgeModel: [''],
      XMSModel: [''],
      log_level: ['0'],
      restrict_processing: [false],
      restrict_processing_on_state: [''],
      restrict_processing_on_direction: [''],
      restrict_processing_on_mode: [''],
      restrict_processing_on_type: [''],
      restrict_processing_on_protocol: [''],
      selectedRule: [null],
    });
  }
  private customScriptNameValidator() {
    return (control: { value: string }) => {
      const value = control.value.trim();
      if (!value) {
        return null; // Input is empty, no validation
      }
      const pattern = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;
      return pattern.test(control.value) ? null : { invalidScriptName: true };
    };
  }
  private customScriptPathValidator() {
    return (control: { value: string }) => {
      const value = control.value.trim();
      if (!value) {
        return null; // Input is empty, no validation
      }
      const pattern =
        /^(\/[a-zA-Z0-9_-]+)+(\/[a-zA-Z0-9_-]+)*$|^[A-Za-z]:\\(?:[a-zA-Z0-9_-]+\\)*[a-zA-Z0-9_-]+$/;
      return pattern.test(control.value) ? null : { invalidScriptPath: true };
    };
  }
  onExecutionTypeChange() {
    const selectedExecutionType =
      this.ruleTableForm.get('execution_type')?.value;

    this.executionType =
      selectedExecutionType === 'XIB' || selectedExecutionType === 'NONE'
        ? 'NONE'
        : selectedExecutionType;
  }
  loadModels() {
    this.modelsService.getModelsByProtocol('GENERAL').subscribe(
      (response) => {
        this.generalModels = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    //get to_XMS models
    this.modelsService.getModelsByProtocol('TO_GTW').subscribe(
      (response) => {
        this.toXMSModels = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    //get purge models
    this.modelsService.getPurgeModels().subscribe(
      (response) => {
        this.purgeModels = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  loadRules() {
    this.ruleService.getRulesDetails().subscribe(
      (response) => {
        this.rules = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  loadRuleTables() {
    this.ruleTableService.getAllRuleTables().subscribe(
      (response) => {
        this.ruleTables = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  toggleActive(tabId: string): void {
    this.activeTab = tabId;
  }
  openDetailsModal(ruleName: string): void {
    const initialState = {
      rule: this.rules.find((rule) => rule.rd_name === ruleName),
    };

    this.modalService.show(RuleDetailsModalComponent, { initialState });
  }
  onCheckboxChange(selectedRule: any): void {
    this.ruleTableForm.get('selectedRule')?.setValue(selectedRule.rd_name);
  }

  addSelectedRuleToDiv(rule: any): void {
    if (
      !this.rd_rules.some(
        (existingRule) => existingRule.rd_name === rule.rd_name
      )
    ) {
      this.rd_rules.push(rule);
    }
  }

  removeSelectedRuleFromDiv(ruleName: string): void {
    const index = this.rd_rules.findIndex((rule) => rule.rd_name === ruleName);
    if (index !== -1) {
      this.rd_rules.splice(index, 1);
    }
  }
  moveRule(direction: 'up' | 'down'): void {
    const selectedRule = this.ruleTableForm.get('selectedRule')?.value;
    const currentIndex = this.rd_rules.findIndex(
      (r) => r.rd_name === selectedRule
    );

    if (
      currentIndex === -1 ||
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === this.rd_rules.length - 1)
    ) {
      return; // Rule not found, or trying to move beyond boundaries
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // Swap the rules in the array
    [this.rd_rules[currentIndex], this.rd_rules[newIndex]] = [
      this.rd_rules[newIndex],
      this.rd_rules[currentIndex],
    ];

    // Update the selectedRule FormControl value
    this.ruleTableForm
      .get('selectedRule')
      ?.setValue(this.rd_rules[newIndex].rd_name);
  }

  onSelectChange() {
    const tableName = this.ruleTableForm.get('name')?.value;
    this.ruleTableService.getTableByName(tableName).subscribe(
      (tableObject: any) => {
        // Update form controls with values from the rule object
        this.selectedTable = tableObject;

        // Filter rules based on tableObject keys
        this.rd_rules = this.rules.filter((rule) => {
          return Object.keys(tableObject).some(
            (key) =>
              key.startsWith('rt_decisionrule') &&
              rule.rd_name === tableObject[key]
          );
        });
      },
      (error) => {
        console.error('Error fetching rule:', error);
        // Handle error if needed
      }
    );
  }

  onSubmit() {
    let selectedRulesString = '';
    this.rd_rules.forEach((n) => (selectedRulesString += `${n.rd_name}, `));
    const formData = {
      name: this.ruleTableForm.value.name,
      comments: this.ruleTableForm.value.comments,
      status: this.ruleTableForm.value.status,
      default_execution_type: this.ruleTableForm.value.execution_type,
      log_level: this.ruleTableForm.value.log_level,
      delete_all_decisionrules: 'Y',
      add_decisionrule: selectedRulesString,
      restrict_processing: this.ruleTableForm.value.restrict_processing,
      restrict_processing_on_state:
        this.ruleTableForm.value.restrict_processing_on_state,
      restrict_processing_on_direction:
        this.ruleTableForm.value.restrict_processing_on_direction,
      restrict_processing_on_type:
        this.ruleTableForm.value.restrict_processing_on_type,
      restrict_processing_on_mode:
        this.ruleTableForm.value.restrict_processing_on_mode,
      restrict_processing_on_protocol:
        this.ruleTableForm.value.restrict_processing_on_protocol,
    };

    switch (this.executionType) {
      case 'MODEL': {
        if (!this.ruleTableForm.value.model) {
          window.alert('please provide a model');
          return;
        }
        const formDataObject = {
          ...formData,
          default_model: this.ruleTableForm.value.model,
        };

        this.submitFormData(formDataObject);
        break;
      }
      case 'PERL': {
        if (
          !this.ruleTableForm.value.scriptName ||
          !this.ruleTableForm.value.scriptPath
        ) {
          window.alert('please provide the script name and path');
          return;
        }
        const scriptPath = this.ruleTableForm.value.scriptPath;
        const hasForwardSlash = scriptPath.includes('/');
        const pathSeparator = hasForwardSlash ? '/' : '\\';

        const formDataObject = {
          ...formData,
          default_perl_script: `${scriptPath}${pathSeparator}${this.ruleTableForm.value.scriptName}`,
        };

        this.submitFormData(formDataObject);
        break;
      }
      case 'COMMAND': {
        if (
          !this.ruleTableForm.value.scriptName ||
          !this.ruleTableForm.value.scriptPath
        ) {
          window.alert(
            'please provide the script name and path in the given format'
          );
          return;
        }
        const scriptPath = this.ruleTableForm.value.scriptPath;
        const hasForwardSlash = scriptPath.includes('/');
        const pathSeparator = hasForwardSlash ? '/' : '\\';

        const formDataObject = {
          ...formData,
          default_command_line: `${scriptPath}${pathSeparator}${this.ruleTableForm.value.scriptName}`,
        };
        this.submitFormData(formDataObject);

        break;
      }
      case 'MAILBOX_CLEANING': {
        if (!this.ruleTableForm.value.purgeModel) {
          window.alert('please provide a purge model');
          return;
        }
        const formDataObject = {
          ...formData,
          default_purge_model: this.ruleTableForm.value.purgeModel,
        };
        this.submitFormData(formDataObject);
        break;
      }
      case 'To_XMS': {
        if (!this.ruleTableForm.value.XMSModel) {
          window.alert('please provide an XMS model');
          return;
        }
        const formDataObject = {
          ...formData,
          default_model: this.ruleTableForm.value.XMSModel,
        };

        this.submitFormData(formDataObject);
        break;
      }

      case 'NONE': {
        this.submitFormData(formData);
        break;
      }
    }
  }
  deleteTable() {
    this.bsModalRef = this.modalService.show(AlertComponent, {
      initialState: {
        message: 'Do you want to proceed?',
      },
    });

    this.bsModalRef.content.confirm = () => {
      const formDataObject = { name: this.selectedTable.rt_name };
      this.ruleTableService
        .deleteRuleTable(formDataObject)
        .pipe(
          tap((response) => {
            console.log('Response:', response.commandString);
          }),
          catchError((error) => {
            console.error('Error:', error);

            // Rethrow the error after logging
            throw error;
          })
        )
        .subscribe();
      this.bsModalRef.hide();
    };
  }
  submitFormData(formDataObject: any) {
    this.bsModalRef = this.modalService.show(AlertComponent, {
      initialState: {
        message: 'Do you want to proceed?',
      },
    });
    console.log(this.bsModalRef);
    this.bsModalRef.content.confirm = () => {
      this.ruleTableService
        .updateRuleTable(formDataObject)
        .pipe(
          tap((response) => {
            console.log('Response:', response.commandString);
          }),
          catchError((error) => {
            console.error('Error:', error);

            // Rethrow the error after logging
            throw error;
          })
        )
        .subscribe();
      this.bsModalRef.hide();
    };
  }
}
