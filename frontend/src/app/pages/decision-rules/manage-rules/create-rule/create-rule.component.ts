import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { ModelsService } from 'src/app/services/models-service/models.service';
import { RulesService } from 'src/app/services/rules-service/rules.service';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.css'],
})
export class CreateRuleComponent {
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

  constructor(
    private fb: FormBuilder,
    private rulesService: RulesService,
    private modelsService: ModelsService
  ) {}

  ngOnInit() {
    this.argumentNames = this.rulesService.getArgumentNames();
    this.createForm();
    this.loadModels();
    this.executionType = this.ruleForm.value.execution_type;
  }
  createForm() {
    const formControls: { [key: string]: any } = {};
    this.argumentNames.forEach((argumentName) => {
      formControls[argumentName] = [''];
    });
    formControls['name'] = ['', Validators.required];
    formControls['comments'] = [''];
    formControls['arguments'] = [''];
    formControls['operators'] = [''];
    formControls['value'] = [''];
    formControls['condition'] = [''];
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
    setTimeout(() => {
      this.ruleForm.get('operators')?.reset();
      this.ruleForm.get('value')?.reset();
    });
    this.operators =
      this.rulesService.getOperatorsForArgument(selectedArgument);
  }
  onSubmit() {
    const formData = {
      name: this.ruleForm.value.name,
      comments: this.ruleForm.value.comments,
      cond_arg: this.ruleForm.value.condition,
      execution_type: this.ruleForm.value.execution_type,
      env: this.ruleForm.value.env,
    };

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

    this.ruleForm.get('condition')?.setValue(this.conditions.join(' '));
    this.ruleForm.get('operators')?.reset();
    this.ruleForm.get('value')?.reset();
    this.ruleForm.get('arguments')?.reset();
  }
  clearConditions() {
    this.conditions = [];
    this.ruleForm.get('condition')?.reset();
    this.ruleForm.get('condition')?.setValue('');
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
    this.rulesService.getRules().pipe;
  }
  submitFormData(formDataObject: any) {
    this.rulesService
      .createRule(formDataObject)
      .pipe(
        tap((response) => {
          console.log('Response:', response);
        }),
        catchError((error) => {
          console.error('Error:', error);

          if (
            error.status === 400 &&
            error.error &&
            error.error.error === 'decision rule name already used'
          ) {
            const errorMessage =
              'decision rule name already used please provide a different name';
            window.alert(errorMessage);
          } else {
            const errorMessage = 'An error occurred during model creation';
            window.alert(errorMessage);
          }

          // Rethrow the error after logging
          throw error;
        })
      )
      .subscribe();
  }
}
