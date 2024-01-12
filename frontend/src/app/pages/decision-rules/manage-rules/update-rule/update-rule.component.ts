import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { ModelsService } from 'src/app/services/models-service/models.service';
import { RulesService } from 'src/app/services/rules-service/rules.service';
import { DecisionRule } from 'src/app/models/DecisionRule';

@Component({
  selector: 'app-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.css'],
})
export class UpdateRuleComponent {
  ruleForm!: FormGroup;
  argumentNames: string[] = [];
  operators: string[] | undefined;
  outputValue: string = '';
  conditions: string[] = [];
  executionType: string = 'NONE';
  purgeModels: any[] = [];
  generalModels: any[] = [];
  toXMSModels: any[] = [];
  decisionRules: any[] = [];
  currentAction: string = 'add';
  selectedRule!: DecisionRule;
  rd_Conditions: string[] = [];
  toDeleteConditions: string[] = [];
  selectedCondition: string = '';
  readOnlyState: boolean = true;
  commandString: string = '';

  constructor(
    private fb: FormBuilder,
    private rulesService: RulesService,
    private modelsService: ModelsService
  ) {}

  ngOnInit() {
    this.argumentNames = this.rulesService.getArgumentNames();
    this.createForm();
    this.loadModels();
    this.loadRules();
    this.executionType = this.ruleForm.value.execution_type;
  }
  createForm() {
    const formControls: { [key: string]: any } = {};
    this.argumentNames.forEach((argumentName) => {
      formControls[argumentName] = [''];
    });
    formControls['rule'] = ['', Validators.required];
    formControls['comments'] = [''];
    formControls['arguments'] = [''];
    formControls['operators'] = [''];
    formControls['value'] = [''];
    formControls['selectCon'] = [''];
    formControls['addCondition'] = [''];
    formControls['modifyCondition'] = [{ value: '', disabled: true }];
    formControls['execution_type'] = ['NONE'];
    formControls['model'] = [''];
    formControls['scriptName'] = ['', [this.customScriptNameValidator()]];
    formControls['scriptPath'] = ['', [this.customScriptPathValidator()]];
    formControls['purgeModel'] = [''];
    formControls['XMSModel'] = [''];
    formControls['env'] = ['UAT'];

    this.ruleForm = this.fb.group(formControls);
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

  getOperators(): string[] | undefined {
    const selectedArgument = this.ruleForm.get('arguments')?.value;
    return this.rulesService.getOperatorsForArgument(selectedArgument);
  }
  onArgumentChange() {
    // Update operators when argument changes
    const selectedArgument = this.ruleForm.get('arguments')?.value;
    //reset is asynchronous
    setTimeout(() => {
      this.ruleForm.get('operators')?.reset();
      this.ruleForm.get('value')?.reset();
    });
    this.operators =
      this.rulesService.getOperatorsForArgument(selectedArgument);
  }
  onSubmit() {
    this.ruleForm.get('modifyCondition')?.enable();
    const formData = {
      name: this.ruleForm.value.rule,
      comments: this.ruleForm.value.comments,
      add_cond: this.ruleForm.value.addCondition,
      update_cond: this.rd_Conditions.join(' '),
      delete_cond: this.toDeleteConditions.join(' '),
      execution_type: this.ruleForm.value.execution_type,
      env: this.ruleForm.value.env,
    };
    this.ruleForm.get('modifyCondition')?.disable();
    switch (this.executionType) {
      case 'MODEL': {
        if (!this.ruleForm.value.model) {
          window.alert('please provide a model');
          return;
        }
        const formDataObject = {
          model: this.ruleForm.value.model,
          ...formData,
        };

        this.submitFormData(formDataObject);
        break;
      }
      case 'PERL': {
        if (
          !this.ruleForm.value.scriptName ||
          !this.ruleForm.value.scriptPath
        ) {
          window.alert('please provide the script name and path');
          return;
        }
        const scriptPath = this.ruleForm.value.scriptPath;
        const hasForwardSlash = scriptPath.includes('/');
        const pathSeparator = hasForwardSlash ? '/' : '\\';

        const formDataObject = {
          perl_script: `${scriptPath}${pathSeparator}${this.ruleForm.value.scriptName}`,
          ...formData,
        };

        this.submitFormData(formDataObject);
        break;
      }
      case 'COMMAND': {
        if (
          !this.ruleForm.value.scriptName ||
          !this.ruleForm.value.scriptPath
        ) {
          window.alert(
            'please provide the script name and path in the given format'
          );
          return;
        }
        const scriptPath = this.ruleForm.value.scriptPath;
        const hasForwardSlash = scriptPath.includes('/');
        const pathSeparator = hasForwardSlash ? '/' : '\\';

        const formDataObject = {
          command_line: `${scriptPath}${pathSeparator}${this.ruleForm.value.scriptName}`,
          ...formData,
        };
        this.submitFormData(formDataObject);

        break;
      }
      case 'MAILBOX_CLEANING': {
        if (!this.ruleForm.value.purgeModel) {
          window.alert('please provide a purge model');
          return;
        }
        const formDataObject = {
          purge_model: this.ruleForm.value.purgeModel,
          ...formData,
        };
        this.submitFormData(formDataObject);
        break;
      }
      case 'To_XMS': {
        if (!this.ruleForm.value.XMSModel) {
          window.alert('please provide an XMS model');
          return;
        }
        const formDataObject = {
          model: this.ruleForm.value.XMSModel,
          ...formData,
        };

        this.submitFormData(formDataObject);
        break;
      }

      case 'NONE': {
        console.log(formData);
        this.submitFormData(formData);
        break;
      }
    }
  }
  addCondition() {
    const selectedArgument = this.ruleForm.get('arguments')?.value;
    const selectedOperator = this.ruleForm.get('operators')?.value;
    const selectedValue = this.ruleForm.get('value')?.value;
    const condition = `${selectedArgument} ${selectedOperator} ${selectedValue};`;

    this.conditions.push(condition);

    this.ruleForm.get('addCondition')?.setValue(this.conditions.join(' '));
    this.ruleForm.get('operators')?.reset();
    this.ruleForm.get('value')?.reset();
    this.ruleForm.get('arguments')?.reset();
  }
  clearConditions() {
    this.conditions = [];
    this.ruleForm.get('addCondition')?.reset();
    this.ruleForm.get('addCondition')?.setValue('');
    this.ruleForm.get('operators')?.reset();
    this.ruleForm.get('value')?.reset();
    this.ruleForm.get('arguments')?.reset();
  }

  onExecutionTypeChange() {
    const selectedExecutionType = this.ruleForm.get('execution_type')?.value;

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
    this.rulesService
      .getRules()
      .pipe(
        tap((response) => {
          console.log('Response:', response);
          this.decisionRules = response;
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
  }
  submitFormData(formDataObject: any) {
    this.rulesService
      .updateRule(formDataObject)
      .pipe(
        tap((response) => {
          console.log('Response:', response);
        }),
        catchError((error) => {
          console.error('Error:', error);

          // Rethrow the error after logging
          throw error;
        })
      )
      .subscribe();
  }
  onRuleChange() {
    const ruleName = this.ruleForm.get('rule')?.value;

    // Call your service to get the rule object
    this.rulesService.getRuleByName(ruleName).subscribe(
      (ruleObject: any) => {
        // Update form controls with values from the rule object
        this.selectedRule = ruleObject;
        const conditions: string[] = [];
        for (const key in this.selectedRule) {
          if (key.startsWith('rd_cond_')) {
            conditions.push(this.selectedRule[key] as string); // Use type assertion here
          }
        }
        this.rd_Conditions = conditions;
      },
      (error) => {
        console.error('Error fetching rule:', error);
        // Handle error if needed
      }
    );
  }
  setAction(action: string) {
    this.currentAction = action;
  }
  onConditionChange() {
    this.ruleForm.get('modifyCondition')?.setValue(this.selectedCondition);
  }
  toggleReadonlyState() {
    const modifyConditionControl = this.ruleForm.get('modifyCondition');
    if (modifyConditionControl?.disabled) {
      modifyConditionControl?.enable();
      this.readOnlyState = false;
    } else {
      modifyConditionControl?.disable();
      this.readOnlyState = true;

      const index = this.rd_Conditions.indexOf(this.selectedCondition);
      if (index !== -1) {
        this.rd_Conditions[index] = modifyConditionControl?.value;
        this.selectedCondition = this.ruleForm.get('modifyCondition')?.value;
      }
    }
  }
  deleteRule() {
    const formdataObject = {
      name: this.selectedRule.rd_name,
    };
    console.log(formdataObject);
    this.rulesService
      .deleteRule(formdataObject)
      .pipe(
        tap((response) => {
          console.log('Response:', response);
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      )
      .subscribe();
  }
  deleteCondition() {
    this.ruleForm.get('modifyCondition')?.reset();
    this.toDeleteConditions.push(this.selectedCondition);
    const index = this.rd_Conditions.findIndex(
      (item) => item === this.selectedCondition
    );
    this.rd_Conditions.splice(index, 1);
    this.ruleForm.get('selectCon')?.reset();
    this.ruleForm.get('selectCon')?.setValue('');
    this.selectedCondition = '';
  }
}
