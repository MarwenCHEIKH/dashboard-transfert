import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';
import { ModelsService } from 'src/app/services/models-service/models.service';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.component.html',
  styleUrls: ['./update-model.component.css'],
})
export class UpdateModelComponent {
  models: any[] = [];

  selectedModel: any = {};

  genralModelForm!: FormGroup;
  FTPOptionsForm: FormGroup;
  HTTPOptionsForm: FormGroup;
  SFTPOptionsForm: FormGroup;
  PHSEOptionsForm: FormGroup;
  selectedParams: any;

  constructor(private fb: FormBuilder, private modelsService: ModelsService) {
    this.FTPOptionsForm = this.fb.group({
      dirName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(127)],
      ],
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(32)],
      ],
      localSite: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
    });
    this.HTTPOptionsForm = this.fb.group({
      dirName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(127)],
      ],
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(32)],
      ],
    });
    this.SFTPOptionsForm = this.fb.group({
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(32)],
      ],
    });
    this.PHSEOptionsForm = this.fb.group({
      rcvAppli: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(8)],
      ],
      rcvText: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(8)],
      ],
      rcvUser: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(8)],
      ],
    });
  }
  ngOnInit(): void {
    this.genralModelForm = this.fb.group({
      comments: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(80)],
      ],
      destAlias: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      orgAlias: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      remoteAgent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      localAgent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      direction: [''],
      type: [''],
      appli: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      fileComponent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(127)],
      ],
      sendMessage: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(25)],
      ],
      compression: [''],
      mode: [''],
      priority: [''],
      fileOrganization: [''],
      retryCountMax: [
        '',
        [Validators.pattern('^[0-9]{1,3}$'), Validators.maxLength(3)],
      ],
      blockSize: ['', [Validators.pattern('[0-9]+')]],
      fileName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(127)],
      ],
      purgeOption: [''],

      env: ['UAT'],
    });
    this.loadModels();
  }

  loadModels() {
    this.modelsService.getAllModels().subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
        this.models = response as any[];
      },
      (error) => {
        // Handle the error here
        console.error('Error:', error);
      }
    );
  }
  onSubmit() {
    const selectedForm = this.getFormForProtocol(this.selectedModel.protocol);

    if (selectedForm) {
      this.submitForm(selectedForm, this.selectedModel);
    }
  }
  submitForm(formData: any, selectedModel: any) {
    const convertedFormData = this.modelsService.convertNumericValues(formData);

    const formDataObject = {
      protocol: selectedModel.protocol,
      model_name: this.selectedModel.modelName,
      ...convertedFormData,
    };
    this.modelsService.updateModel(formDataObject).subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
        this.loadModels();
      },
      (error) => {
        // Handle the error here
        console.log('Error:', error);
      }
    );
  }

  getFormForProtocol(protocol: string): any {
    switch (protocol) {
      case 'FTP':
        return this.FTPOptionsForm.value;
      case 'HTTP':
        return this.HTTPOptionsForm.value;
      case 'SFTP':
        return this.SFTPOptionsForm.value;
      case 'PHSE':
        return this.PHSEOptionsForm.value;
      case 'GENERAL':
        return this.genralModelForm.value;
    }
  }
}
