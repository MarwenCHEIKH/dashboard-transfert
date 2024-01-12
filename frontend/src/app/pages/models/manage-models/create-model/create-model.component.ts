import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ModelsService } from 'src/app/services/models-service/models.service';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css'],
})
export class CreateModelComponent {
  modelForm: any;
  selectedModel!: string;
  selectedProtocol!: string;
  showGeneralModel = true;
  showProtocolModel = false;
  FTPOptions: any;
  HTTPOptions: any;
  SFTPOptions: any;
  PHSEOptions: any;
  generalModels: any[] = [];

  constructor(private fb: FormBuilder, private modelsService: ModelsService) {
    this.FTPOptions = this.fb.group({
      dirName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(127)],
      ],
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(32)],
      ],
      localSite: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
    });
    this.HTTPOptions = this.fb.group({
      dirName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(127)],
      ],
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(32)],
      ],
    });
    this.SFTPOptions = this.fb.group({
      ftpCommand: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(32)],
      ],
    });
    this.PHSEOptions = this.fb.group({
      rcvAppli: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(8)],
      ],
      rcvText: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(8)],
      ],
      rcvUser: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(8)],
      ],
    });
  }
  ngOnInit(): void {
    this.modelForm = this.fb.group({
      model_name: [
        '',
        [
          Validators.pattern('[a-zA-Z0-9-/_]+'),
          Validators.maxLength(25),
          Validators.required,
        ],
      ],
      comments: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(80)],
      ],
      destAlias: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      orgAlias: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      remoteAgent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      localAgent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      direction: [''],
      type: [''],
      appli: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      fileComponent: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_.]+'), Validators.maxLength(127)],
      ],
      sendMessage: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(25)],
      ],
      compression: [''],
      mode: [''],
      priority: ['2'],
      fileOrganization: [''],
      retryCountMax: [
        '',
        [Validators.pattern('^[0-9]{1,3}$'), Validators.maxLength(3)],
      ],
      blockSize: ['', [Validators.pattern('[0-9]+')]],
      fileName: [
        '',
        [Validators.pattern('[a-zA-Z0-9-/_]+'), Validators.maxLength(127)],
      ],
      purgeOption: [''],

      env: ['UAT'],
    });
    this.loadModels();
  }
  showGeneralForm() {
    this.showGeneralModel = true;
    this.showProtocolModel = false;
  }

  showProtocolForm() {
    this.showGeneralModel = false;
    this.showProtocolModel = true;
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
  }

  onSubmit() {
    const formData = this.modelsService.convertNumericValues(
      this.modelForm.value
    );
    const formDataObject = {
      model_name: this.selectedModel,
      protocol: 'GENERAL',
      ...formData,
    };

    this.modelsService.createModel(formDataObject).subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
        this.loadModels();
      },
      (error) => {
        // Handle the error here
        console.log('Error:', error);

        if (
          error.status === 400 &&
          error.error &&
          error.error.error === 'Model name already used'
        ) {
          const errorMessage = 'Model name already used';
          window.alert(errorMessage);
        } else {
          const errorMessage = 'An error occurred during model creation';
          window.alert(errorMessage);
        }
      }
    );
  }
  createProtocolModel() {
    let formData = {};

    switch (this.selectedProtocol) {
      case 'HTTP':
        formData = {
          model_name: this.selectedModel,
          protocol: 'HTTP',
          ...this.HTTPOptions.value,
        };
        break;

      case 'FTP':
        formData = {
          model_name: this.selectedModel,
          protocol: 'FTP',
          ...this.FTPOptions.value,
        };
        break;

      case 'SFTP':
        formData = {
          model_name: this.selectedModel,
          protocol: 'SFTP',
          ...this.SFTPOptions.value,
        };
        break;
      case 'PHSE':
        formData = {
          model_name: this.selectedModel,
          protocol: 'PHSE',
          ...this.PHSEOptions.value,
        };
        break;
    }

    this.modelsService.createModel(formData).subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
      },
      (error) => {
        // Handle the error here
        console.error('Error:', error);
      }
    );
  }
}
