import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTPService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-move-vfd',
  templateUrl: './move-vfd.component.html',
  styleUrls: ['./move-vfd.component.css'],
})
export class MoveVfdComponent {
  moveDirectoryForm!: FormGroup;
  directories: any[] = [];
  selectedDirectory!: string;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HTTPService
  ) {}
  ngOnInit(): void {
    this.moveDirectoryForm = this.formBuilder.group({
      dir_path: [''],
      new_dir_path: [''],
      env: ['UAT'],
    });
    this.loadDirectories();
  }
  loadDirectories() {
    this.httpService.get('vfd/get-directories').subscribe(
      (response) => {
        // Handle the successful response here
        console.log('Success:', response);
        this.directories = response as any[];
      },
      (error) => {
        // Handle the error here
        console.error('Error:', error);
      }
    );
  }
  onSubmit() {
    this.moveDirectoryForm.get('dir_path')?.setValue(this.selectedDirectory);
    // Handle form submission here

    const formData = {
      dir_path: this.selectedDirectory,
      ...this.moveDirectoryForm.value,
    };

    this.httpService.post(formData, 'vfd/move-directory').subscribe(
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
