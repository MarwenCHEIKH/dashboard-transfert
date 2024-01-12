import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';
import { ModelsService } from 'src/app/services/models-service/models.service';

@Component({
  selector: 'app-delete-params',
  templateUrl: './delete-params.component.html',
  styleUrls: ['./delete-params.component.css'],
})
export class DeleteParamsComponent {
  models: any[] = [];
  modelObject: any = {};
  modelParams: FormGroup;
  modelKeys: string[] = [];
  selectedModel: any = {};

  constructor(private fb: FormBuilder, private modelsService: ModelsService) {
    this.modelParams = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadModels();
  }

  loadModels() {
    this.modelsService.getAllModels().subscribe(
      (response) => {
        console.log('Success:', response);
        this.models = response as any[];
        if (!this.selectedModel.modelName && this.models.length > 0) {
          // Set the default selected model
          this.selectedModel = {};
          this.updateForm();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onModelChange() {
    this.updateForm();
  }
  updateForm() {
    this.modelObject = this.models.find(
      (item) =>
        item.model_name === this.selectedModel.modelName &&
        item.protocol === this.selectedModel.protocol
    );

    if (this.modelObject) {
      // Clear existing controls
      Object.keys(this.modelParams.controls).forEach((key) => {
        this.modelParams.removeControl(key);
      });

      // Add new controls
      for (const key of Object.keys(this.modelObject)) {
        // Exclude model_name from checkboxes
        if (key !== 'model_name' && key !== 'protocol') {
          this.modelParams.addControl(key, this.fb.control(false));
        }
      }

      // Update modelKeys
      this.modelKeys = Object.keys(this.modelParams.controls);
    }
  }

  onSubmit() {
    const formDataObject = {
      model_name: this.selectedModel.modelName,
      protocol: this.selectedModel.protocol,
      ...this.modelParams.value,
    };

    this.modelsService.deleteModelAttributes(formDataObject).subscribe(
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
}
