import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';
import { ModelsService } from 'src/app/services/models-service/models.service';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css'],
})
export class DeleteModelComponent {
  models: any[] = [];
  selectedModel: any = {};
  constructor(private fb: FormBuilder, private modelsService: ModelsService) {}
  ngOnInit(): void {
    this.loadModels();
  }
  loadModels() {
    this.modelsService.getAllModels().subscribe(
      (response) => {
        console.log('Success:', response);
        this.models = response as any[];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  onSubmit() {
    const formDataObject = {
      model_name: this.selectedModel.modelName,
      protocol: this.selectedModel.protocol,
    };
    this.modelsService.deleteModel(formDataObject).subscribe(
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
